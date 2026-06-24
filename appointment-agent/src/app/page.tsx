'use client';

import { useState, useMemo, useCallback } from 'react';
import { profiles } from '@/lib/profiles';
import { generateSeedEvents } from '@/data/seed-events';
import { CalendarEvent, AgentDecision, CATEGORY_COLORS } from '@/lib/types';
import ProfileSelector from '@/components/ProfileSelector';
import Calendar from '@/components/Calendar';
import EventModal from '@/components/EventModal';
import AgentPanel from '@/components/AgentPanel';
import WelcomeModal from '@/components/WelcomeModal';

export default function Home() {
  const [activeProfileId, setActiveProfileId] = useState('margaret');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 15)); // June 2026
  const [calendarView, setCalendarView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [agentDecisions, setAgentDecisions] = useState<Record<string, AgentDecision[]>>({});
  const [agentSummaries, setAgentSummaries] = useState<Record<string, string>>({});
  const [agentEvents, setAgentEvents] = useState<Record<string, CalendarEvent[]>>({});

  const activeProfile = profiles.find((p) => p.id === activeProfileId)!;

  // Generate seed events for active profile (memoized)
  const seedEvents = useMemo(() => {
    return generateSeedEvents(activeProfileId);
  }, [activeProfileId]);

  // Combine seed events with agent-scheduled events
  const allEvents = useMemo(() => {
    const agent = agentEvents[activeProfileId] || [];
    return [...seedEvents, ...agent];
  }, [seedEvents, agentEvents, activeProfileId]);

  const handleDecisionsReceived = useCallback(
    (decisions: AgentDecision[], summary: string) => {
      // Store decisions
      setAgentDecisions((prev) => ({
        ...prev,
        [activeProfileId]: decisions,
      }));
      setAgentSummaries((prev) => ({
        ...prev,
        [activeProfileId]: summary,
      }));

      // Convert decisions to calendar events
      const newEvents: CalendarEvent[] = decisions
        .filter((d) => d.renewalDecision)
        .map((d) => {
          const [year, month, day] = d.scheduledDate.split('-').map(Number);
          const [hour, minute] = d.scheduledTime.split(':').map(Number);
          const start = new Date(year, month - 1, day, hour, minute);
          const end = new Date(start.getTime() + d.duration * 60000);
          const category =
            ['doctor_annual', 'dentist_cleaning', 'dermatologist', 'eye_exam', 'therapy', 'pediatrician', 'physical_therapy'].includes(d.appointmentType)
              ? 'medical'
              : ['haircut', 'gym_trainer', 'massage_spa', 'meditation_class', 'hobby_class'].includes(d.appointmentType)
                ? 'personal'
                : ['financial_advisor', 'networking_lunch', 'career_coach', 'mentor_meeting', 'team_standup'].includes(d.appointmentType)
                  ? 'professional'
                  : 'household';

          return {
            id: `agent-${Math.random().toString(36).substring(2, 9)}`,
            title: `🤖 ${d.title}`,
            start,
            end,
            type: d.appointmentType as CalendarEvent['type'],
            category: category as CalendarEvent['category'],
            isAgentScheduled: true,
            isRecurring: d.renewalDecision,
            profileId: activeProfileId,
            color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
            agentReasoning: {
              reasoning: d.reasoning,
              renewalDecision: d.renewalDecision,
              renewalReasoning: d.renewalReasoning,
              nextOccurrence: d.nextOccurrence,
              confidenceScore: d.confidenceScore,
              alternativesConsidered: d.alternativesConsidered,
              factors: d.factors,
            },
          };
        });

      setAgentEvents((prev) => ({
        ...prev,
        [activeProfileId]: newEvents,
      }));
    },
    [activeProfileId]
  );

  const handleProfileSwitch = (profileId: string) => {
    setActiveProfileId(profileId);
    setSelectedEvent(null);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 5, 24)); // Current date in the scenario
  };

  const currentMonthLabel = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="app-container" data-profile={activeProfileId}>
      {/* Header */}
      <header className="app-header">
        <div className="app-title-section">
          <div className="app-logo">📅</div>
          <div>
            <div className="app-title">AI Appointment Agent</div>
            <div className="app-subtitle">Stanford Deliberative Democracy Lab</div>
          </div>
        </div>

        <ProfileSelector
          profiles={profiles}
          activeProfileId={activeProfileId}
          onSelect={handleProfileSwitch}
        />
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Calendar Area */}
        <div className="calendar-area">
          {/* Calendar Toolbar */}
          <div className="calendar-toolbar">
            <div className="calendar-nav">
              <button className="today-btn" onClick={goToToday}>
                Today
              </button>
              <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                ‹
              </button>
              <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                ›
              </button>
              <span className="calendar-current-month">{currentMonthLabel}</span>
            </div>

            <div className="stats-bar">
              <div className="stat-chip">
                Total Events: <span className="stat-chip-value">{allEvents.length}</span>
              </div>
              <div className="stat-chip">
                Agent Scheduled:{' '}
                <span className="stat-chip-value">
                  {allEvents.filter((e) => e.isAgentScheduled).length}
                </span>
              </div>
            </div>

            <div className="calendar-view-toggle">
              {['month', 'week', 'day', 'agenda'].map((view) => (
                <button
                  key={view}
                  className={`calendar-view-btn ${calendarView === view ? 'active' : ''}`}
                  onClick={() => setCalendarView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Visual Legend */}
          <div className="calendar-visual-legend">
            <div className="legend-item">
              <div className="legend-box seed-box"></div>
              <span>Pre-existing Routine</span>
            </div>
            <div className="legend-item">
              <div className="legend-box ai-box">✨</div>
              <span>AI Scheduled Event</span>
            </div>
          </div>

          {/* Calendar */}
          <Calendar
            events={allEvents}
            currentDate={currentDate}
            view={calendarView}
            onNavigate={handleNavigate}
            onViewChange={handleViewChange}
            onSelectEvent={handleSelectEvent}
          />
        </div>

        {/* Agent Panel */}
        <AgentPanel
          profile={activeProfile}
          events={allEvents}
          currentDate={currentDate}
          onDecisionsReceived={handleDecisionsReceived}
          agentDecisions={agentDecisions[activeProfileId] || []}
          agentSummary={agentSummaries[activeProfileId] || ''}
        />
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Welcome Modal */}
      <WelcomeModal />
    </div>
  );
}
