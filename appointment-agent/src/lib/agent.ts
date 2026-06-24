import OpenAI from 'openai';
import { z } from 'zod';
import { Profile } from './types';
import { CalendarEvent, AgentDecision, AgentResponse, APPOINTMENT_LABELS } from './types';

const agentDecisionSchema = z.object({
  appointmentType: z.string(),
  title: z.string(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  duration: z.number(),
  reasoning: z.string(),
  renewalDecision: z.boolean(),
  renewalReasoning: z.string(),
  nextOccurrence: z.string().nullable(),
  confidenceScore: z.number(),
  alternativesConsidered: z.string(),
  factors: z.array(z.string()),
});

const agentResponseSchema = z.object({
  decisions: z.array(agentDecisionSchema),
  summary: z.string(),
});

function formatEventsForPrompt(events: CalendarEvent[]): string {
  if (events.length === 0) return 'No existing events.';

  // Group by month for readability
  const grouped: Record<string, CalendarEvent[]> = {};
  for (const event of events) {
    const monthKey = event.start.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!grouped[monthKey]) grouped[monthKey] = [];
    grouped[monthKey].push(event);
  }

  let result = '';
  for (const [month, monthEvents] of Object.entries(grouped)) {
    result += `\n── ${month} ──\n`;
    for (const event of monthEvents.slice(0, 30)) { // Limit per month to manage token usage
      const dateStr = event.start.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const timeStr = event.start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      const endTimeStr = event.end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      result += `  • ${dateStr} | ${timeStr}–${endTimeStr} | ${event.title} [${event.category}]${event.isRecurring ? ' (recurring)' : ''}\n`;
    }
    if (monthEvents.length > 30) {
      result += `  ... and ${monthEvents.length - 30} more events\n`;
    }
  }
  return result;
}

function formatPreferencesForPrompt(profile: Profile): string {
  const prefs = profile.schedulingPreferences;
  let result = `\nSCHEDULING CONSTRAINTS:\n`;
  result += `• Preferred time blocks: ${prefs.preferredTimeBlocks.map((b) => `${b.label} (${b.startHour}:${String(b.startMinute).padStart(2, '0')}–${b.endHour}:${String(b.endMinute).padStart(2, '0')})`).join('; ')}\n`;
  result += `• Days to avoid: ${prefs.avoidDays.length > 0 ? prefs.avoidDays.map((d) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]).join(', ') : 'None'}\n`;
  result += `• Times to avoid: ${prefs.avoidTimeRanges.map((b) => `${b.label} (${b.startHour}:${String(b.startMinute).padStart(2, '0')}–${b.endHour}:${String(b.endMinute).padStart(2, '0')})`).join('; ')}\n`;
  result += `• Max appointments per day: ${prefs.maxAppointmentsPerDay}\n`;
  result += `• Min gap between appointments: ${prefs.minGapBetweenAppointments} minutes\n`;
  result += `• Buffer before/after: ${prefs.bufferBeforeAppointment}/${prefs.bufferAfterAppointment} minutes\n`;
  result += `• Willingness to reschedule (0=never, 1=always): ${prefs.willingnessToReschedule}\n`;
  result += `• Priority order: ${prefs.priorityOrder.join(' > ')}\n`;

  result += `\nAPPOINTMENT PREFERENCES:\n`;
  for (const appt of profile.appointmentPreferences) {
    result += `• ${APPOINTMENT_LABELS[appt.type]}: every ${appt.frequencyValue} ${appt.frequency}, ${appt.preferredDuration}min, priority=${appt.priority}, flexibility=${appt.flexibility}`;
    if (appt.preferredDayOfWeek !== undefined) {
      result += `, prefers ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][appt.preferredDayOfWeek]}`;
    }
    if (appt.preferredTimeOfDay) {
      result += `, prefers ${appt.preferredTimeOfDay}`;
    }
    if (appt.notes) {
      result += `\n    Notes: ${appt.notes}`;
    }
    result += '\n';
  }

  return result;
}

export async function runAgent(
  profile: Profile,
  existingEvents: CalendarEvent[],
  targetMonth: number, // 0-indexed month
  targetYear: number,
): Promise<AgentResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  const openai = new OpenAI({ apiKey });

  const monthName = new Date(targetYear, targetMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Filter events for context — show surrounding months
  const contextStart = new Date(targetYear, targetMonth - 1, 1);
  const contextEnd = new Date(targetYear, targetMonth + 2, 0);
  const contextEvents = existingEvents.filter(
    (e) => e.start >= contextStart && e.start <= contextEnd
  );

  const systemPrompt = `You are an AI scheduling agent acting on behalf of ${profile.name}. You must make appointment scheduling decisions that reflect this person's personality, values, habits, and constraints AS FAITHFULLY AS POSSIBLE.

You are NOT making generic scheduling decisions. You are roleplaying as this specific person's ideal scheduling assistant who deeply understands them.

${profile.fullContext}

${formatPreferencesForPrompt(profile)}

CRITICAL RULES:
1. NEVER schedule during avoided time ranges or avoided days.
2. ALWAYS respect the max appointments per day limit.
3. ALWAYS maintain minimum gaps between appointments.
4. When conflicts arise, follow the priority order strictly.
5. For recurring appointments, decide if they should be renewed based on the person's values and behavior patterns.
6. Explain EVERY decision in detail — cite specific personality traits, habits, or constraints.
7. Consider the person's daily routine when picking times.
8. Be realistic — if this person would likely skip or postpone something, say so and explain why.
9. Factor in travel time and geographic preferences.
10. Your confidence score should reflect how certain you are this person would actually make this choice.`;

  const userPrompt = `TASK: Review and optimize the appointment schedule for ${monthName}.

CURRENT CALENDAR STATE (surrounding months for context):
${formatEventsForPrompt(contextEvents)}

For ${monthName}, review each appointment type that ${profile.name} has and:
1. Decide if each recurring appointment should be scheduled/renewed for this month
2. Pick the optimal date and time based on their preferences and existing schedule
3. Explain your reasoning for each decision in detail
4. Consider conflicts with other events and resolve them according to priority
5. Suggest any appointments that are overdue or should be added

For each decision, provide:
- The specific date and time you chose (within ${monthName})
- Why you chose that exact slot
- Whether to renew/continue this appointment
- What alternatives you considered
- Your confidence that this person would actually make this same choice (0-1)
- Key factors that influenced the decision

Respond with a JSON object matching this schema:
{
  "decisions": [
    {
      "appointmentType": "string (e.g., 'doctor_annual')",
      "title": "string (display name)",
      "scheduledDate": "string (YYYY-MM-DD)",
      "scheduledTime": "string (HH:mm)",
      "duration": number (minutes),
      "reasoning": "string (detailed explanation)",
      "renewalDecision": boolean,
      "renewalReasoning": "string",
      "nextOccurrence": "string (YYYY-MM-DD) or null",
      "confidenceScore": number (0-1),
      "alternativesConsidered": "string",
      "factors": ["string array of key factors"]
    }
  ],
  "summary": "string (overall summary of scheduling decisions for the month)"
}

Be thorough. Include decisions for ALL appointment types that are due this month. If an appointment type is NOT due this month, you can skip it. Include at least the recurring appointments that fall in this month.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-5.4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_completion_tokens: 16384,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const parsed = JSON.parse(content);
  const validated = agentResponseSchema.parse(parsed);

  const validDecisions = validated.decisions.filter(
    (d) => d.title && d.title.trim() !== '' && d.scheduledDate && d.scheduledDate.trim() !== ''
  );

  return {
    profileId: profile.id,
    decisions: validDecisions as AgentDecision[],
    summary: validated.summary,
  };
}

// eeeee