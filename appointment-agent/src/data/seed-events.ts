import { CalendarEvent, AppointmentType, AppointmentCategory, CATEGORY_COLORS, APPOINTMENT_LABELS } from '@/lib/types';
import { profiles } from '@/lib/profiles';
import { getAppointmentInfo, getRecurrenceDays } from '@/lib/appointments';
import { Profile, AppointmentPreference, TimeBlock } from '@/lib/types';

// Generate a full year of seed events for each profile based on their appointment preferences
// Year starts from January 2026

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getCategory(type: AppointmentType): AppointmentCategory {
  const info = getAppointmentInfo(type);
  return info?.category ?? 'personal';
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function setTime(date: Date, hour: number, minute: number): Date {
  const result = new Date(date);
  result.setHours(hour, minute, 0, 0);
  return result;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Get the Nth occurrence of a specific day of week in a month
function getNthDayOfWeek(year: number, month: number, dayOfWeek: number, n: number): Date {
  const firstDay = new Date(year, month, 1);
  let day = firstDay.getDay();
  let diff = dayOfWeek - day;
  if (diff < 0) diff += 7;
  const firstOccurrence = 1 + diff;
  const nthDay = firstOccurrence + (n - 1) * 7;
  return new Date(year, month, nthDay);
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

function nextWeekday(date: Date): Date {
  const result = new Date(date);
  while (!isWeekday(result)) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

export function generateSeedEvents(profileId: string): CalendarEvent[] {
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) return [];

  const events: CalendarEvent[] = [];
  const startDate = new Date(2026, 0, 1); // Jan 1, 2026
  const endDate = new Date(2026, 11, 31); // Dec 31, 2026

  for (const pref of profile.appointmentPreferences) {
    const info = getAppointmentInfo(pref.type);
    if (!info) continue;

    const recurrenceDays = getRecurrenceDays(pref.frequency);
    const recurrenceId = generateId();
    const category = info.category;

    // Determine preferred time
    let preferredHour = 10;
    let preferredMinute = 0;
    if (pref.preferredTimeOfDay === 'morning') {
      const prefs = profile.schedulingPreferences.preferredTimeBlocks.filter(
        (b) => b.startHour < 12
      );
      if (prefs.length > 0) {
        preferredHour = prefs[0].startHour;
        preferredMinute = prefs[0].startMinute;
      } else {
        preferredHour = 9;
      }
    } else if (pref.preferredTimeOfDay === 'afternoon') {
      const prefs = profile.schedulingPreferences.preferredTimeBlocks.filter(
        (b) => b.startHour >= 12
      );
      if (prefs.length > 0) {
        preferredHour = prefs[0].startHour;
        preferredMinute = prefs[0].startMinute;
      } else {
        preferredHour = 14;
      }
    } else if (pref.preferredTimeOfDay === 'evening') {
      preferredHour = 18;
      preferredMinute = 0;
    } else {
      // Use first preferred time block
      if (profile.schedulingPreferences.preferredTimeBlocks.length > 0) {
        preferredHour = profile.schedulingPreferences.preferredTimeBlocks[0].startHour;
        preferredMinute = profile.schedulingPreferences.preferredTimeBlocks[0].startMinute;
      }
    }

    // Stagger times slightly so events don't all stack on the same time
    const typeIndex = profile.appointmentPreferences.indexOf(pref);
    const staggerMinutes = (typeIndex * 30) % 120;
    let adjustedHour = preferredHour + Math.floor((preferredMinute + staggerMinutes) / 60);
    let adjustedMinute = (preferredMinute + staggerMinutes) % 60;

    // Keep within reasonable bounds
    if (adjustedHour > 18) {
      adjustedHour = preferredHour;
      adjustedMinute = preferredMinute + 15;
    }

    // Generate events across the year
    let currentDate = new Date(startDate);

    // For daily standups (Jayden's team standup), only on weekdays
    if (pref.frequency === 'daily') {
      while (currentDate <= endDate) {
        if (isWeekday(currentDate) && !profile.schedulingPreferences.avoidDays.includes(currentDate.getDay())) {
          const start = setTime(new Date(currentDate), adjustedHour, adjustedMinute);
          const end = addMinutes(start, pref.preferredDuration);
          events.push({
            id: generateId(),
            title: APPOINTMENT_LABELS[pref.type],
            start,
            end,
            type: pref.type,
            category,
            isAgentScheduled: false,
            isRecurring: true,
            recurrenceId,
            profileId,
            color: CATEGORY_COLORS[category],
          });
        }
        currentDate = addDays(currentDate, 1);
      }
      continue;
    }

    // For weekly appointments
    if (pref.frequency === 'weekly') {
      // Determine which day of week
      let targetDay = pref.preferredDayOfWeek ?? 2; // Default to Tuesday
      currentDate = new Date(startDate);
      // Find first occurrence of target day
      while (currentDate.getDay() !== targetDay) {
        currentDate = addDays(currentDate, 1);
      }

      // If multiple per week (e.g., gym 3x/week), space them out
      const timesPerWeek = pref.frequencyValue || 1;
      if (timesPerWeek > 1) {
        const daySpacing = Math.floor(7 / timesPerWeek);
        let weekStart = new Date(startDate);
        // Find Monday
        while (weekStart.getDay() !== 1) {
          weekStart = addDays(weekStart, 1);
        }

        while (weekStart <= endDate) {
          for (let i = 0; i < timesPerWeek; i++) {
            const eventDate = addDays(weekStart, i * daySpacing);
            if (eventDate > endDate) break;
            if (profile.schedulingPreferences.avoidDays.includes(eventDate.getDay())) continue;

            const start = setTime(new Date(eventDate), adjustedHour, adjustedMinute);
            const end = addMinutes(start, pref.preferredDuration);
            events.push({
              id: generateId(),
              title: APPOINTMENT_LABELS[pref.type],
              start,
              end,
              type: pref.type,
              category,
              isAgentScheduled: false,
              isRecurring: true,
              recurrenceId,
              profileId,
              color: CATEGORY_COLORS[category],
            });
          }
          weekStart = addDays(weekStart, 7);
        }
        continue;
      }

      while (currentDate <= endDate) {
        if (!profile.schedulingPreferences.avoidDays.includes(currentDate.getDay())) {
          const start = setTime(new Date(currentDate), adjustedHour, adjustedMinute);
          const end = addMinutes(start, pref.preferredDuration);
          events.push({
            id: generateId(),
            title: APPOINTMENT_LABELS[pref.type],
            start,
            end,
            type: pref.type,
            category,
            isAgentScheduled: false,
            isRecurring: true,
            recurrenceId,
            profileId,
            color: CATEGORY_COLORS[category],
          });
        }
        currentDate = addDays(currentDate, 7);
      }
      continue;
    }

    // For biweekly, monthly, quarterly, biannual, annual
    // Start from a semi-random offset so not all profiles start on Jan 1
    const profileOffset = profiles.indexOf(profile) * 5 + typeIndex * 3;
    currentDate = addDays(startDate, profileOffset % recurrenceDays);

    // Make sure it's not on an avoid day
    while (
      profile.schedulingPreferences.avoidDays.includes(currentDate.getDay()) ||
      !isWeekday(currentDate)
    ) {
      currentDate = addDays(currentDate, 1);
    }

    // For preferred day of week, find next occurrence
    if (pref.preferredDayOfWeek !== undefined) {
      while (currentDate.getDay() !== pref.preferredDayOfWeek) {
        currentDate = addDays(currentDate, 1);
      }
    }

    while (currentDate <= endDate) {
      if (!profile.schedulingPreferences.avoidDays.includes(currentDate.getDay())) {
        const start = setTime(new Date(currentDate), adjustedHour, adjustedMinute);
        const end = addMinutes(start, pref.preferredDuration);
        events.push({
          id: generateId(),
          title: APPOINTMENT_LABELS[pref.type],
          start,
          end,
          type: pref.type,
          category,
          isAgentScheduled: false,
          isRecurring: true,
          recurrenceId,
          profileId,
          color: CATEGORY_COLORS[category],
        });
      }

      // Advance by recurrence interval
      currentDate = addDays(currentDate, recurrenceDays);
      // Skip avoid days
      while (
        profile.schedulingPreferences.avoidDays.includes(currentDate.getDay())
      ) {
        currentDate = addDays(currentDate, 1);
      }
    }
  }

  // Sort by date
  events.sort((a, b) => a.start.getTime() - b.start.getTime());

  return events;
}
