'use client';

import { useState, useEffect } from 'react';
import { Profile, AgentDecision, AgentResponse, CalendarEvent, CATEGORY_COLORS } from '@/lib/types';
import { getAppointmentInfo } from '@/lib/appointments';

interface AgentPanelProps {
  profile: Profile;
  events: CalendarEvent[];
  currentDate: Date;
  onDecisionsReceived: (decisions: AgentDecision[], summary: string) => void;
  agentDecisions: AgentDecision[];
  agentSummary: string;
}

export default function AgentPanel({
  profile,
  events,
  currentDate,
  onDecisionsReceived,
  agentDecisions,
  agentSummary,
}: AgentPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [targetMonth, setTargetMonth] = useState(currentDate.getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    setExpandedCards(new Set());

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: profile.id,
          events: events.map((e) => ({
            ...e,
            start: e.start.toISOString(),
            end: e.end.toISOString(),
          })),
          targetMonth,
          targetYear: 2026,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to run agent');
      }

      const data: AgentResponse = await response.json();
      onDecisionsReceived(data.decisions, data.summary);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceClass = (score: number) => {
    if (score >= 0.8) return 'confidence-high';
    if (score >= 0.5) return 'confidence-medium';
    return 'confidence-low';
  };

  const eventsThisMonth = events.filter(
    (e) => e.start.getMonth() === currentDate.getMonth() && e.start.getFullYear() === 2026
  );

  const eventsByCategory = {
    medical: eventsThisMonth.filter((e) => e.category === 'medical').length,
    personal: eventsThisMonth.filter((e) => e.category === 'personal').length,
    professional: eventsThisMonth.filter((e) => e.category === 'professional').length,
    household: eventsThisMonth.filter((e) => e.category === 'household').length,
  };

  return (
    <div className="agent-panel">
      <div className="agent-panel-header">
        <div className="agent-panel-title">
          <div className="agent-status-dot" />
          AI Scheduling Agent
        </div>
      </div>

      <div className="agent-panel-body">
        {/* Profile Summary */}
        <div className="profile-detail">
          <div className="profile-detail-header">
            <span className="profile-detail-avatar">{profile.avatar}</span>
            <div>
              <div className="profile-detail-name">{profile.name}</div>
              <div className="profile-detail-occupation">{profile.occupation}</div>
            </div>
          </div>
          <div className="profile-detail-stats">
            <div className="profile-stat">
              <div className="profile-stat-label">Max/Day</div>
              <div className="profile-stat-value">{profile.schedulingPreferences.maxAppointmentsPerDay}</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-label">Min Gap</div>
              <div className="profile-stat-value">{profile.schedulingPreferences.minGapBetweenAppointments}m</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-label">This Month</div>
              <div className="profile-stat-value">{eventsThisMonth.length}</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-label">Flexibility</div>
              <div className="profile-stat-value">
                {Math.round(profile.schedulingPreferences.willingnessToReschedule * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Category Legend */}
        <div className="category-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: CATEGORY_COLORS.medical }} />
            Medical ({eventsByCategory.medical})
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: CATEGORY_COLORS.personal }} />
            Personal ({eventsByCategory.personal})
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: CATEGORY_COLORS.professional }} />
            Professional ({eventsByCategory.professional})
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: CATEGORY_COLORS.household }} />
            Household ({eventsByCategory.household})
          </div>
        </div>

        {/* Agent Controls */}
        <div className="month-selector">
          <label>Target Month:</label>
          <select value={targetMonth} onChange={(e) => setTargetMonth(Number(e.target.value))}>
            {months.map((m, i) => (
              <option key={i} value={i}>
                {m} 2026
              </option>
            ))}
          </select>
        </div>

        <button
          className={`run-agent-btn ${loading ? 'loading' : ''}`}
          onClick={runAgent}
          disabled={loading}
        >
          {loading ? 'Agent is thinking...' : '🤖 Run Scheduling Agent'}
        </button>

        {loading && (
          <div className="agent-progress-container indeterminate">
            <div className="pulse-text">
              Agent is analyzing calendar constraints and generating decisions...
              <br/>
              <span className="pulse-text-sub">(Usually takes 15-30s)</span>
            </div>
            <div className="agent-progress-bar-bg indeterminate-bg">
              <div className="agent-progress-bar-fill indeterminate-fill" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}

        {/* Agent Summary */}
        {agentSummary && (
          <div className="agent-summary">
            <div className="agent-summary-title">
              ✨ Agent Summary
            </div>
            {agentSummary}
          </div>
        )}

        {/* Decision Cards */}
        {agentDecisions.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              {agentDecisions.length} Decision{agentDecisions.length !== 1 ? 's' : ''}
            </div>
            {agentDecisions.map((decision, index) => {
              const info = getAppointmentInfo(decision.appointmentType as CalendarEvent['type']);
              const isExpanded = expandedCards.has(index);

              return (
                <div key={index} className="decision-card">
                  <div className="decision-card-header" onClick={() => toggleCard(index)}>
                    <div className="decision-card-left">
                      <span className="decision-icon">{info?.icon || '📅'}</span>
                      <div className="decision-title-block">
                        <div className="decision-title">{decision.title}</div>
                        <div className="decision-subtitle">
                          {decision.scheduledDate} at {decision.scheduledTime} · {decision.duration}m
                        </div>
                      </div>
                    </div>
                    <span className={`confidence-badge ${getConfidenceClass(decision.confidenceScore)}`}>
                      {Math.round(decision.confidenceScore * 100)}%
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="decision-card-body">
                      <p className="decision-reasoning">{decision.reasoning}</p>

                      <div>
                        <span className={`renewal-badge ${decision.renewalDecision ? 'renewal-yes' : 'renewal-no'}`}>
                          {decision.renewalDecision ? '✓ Renew' : '✕ Skip Renewal'}
                        </span>
                      </div>

                      <p className="decision-reasoning" style={{ fontSize: 11 }}>
                        <strong>Renewal reasoning:</strong> {decision.renewalReasoning}
                      </p>

                      {decision.nextOccurrence && (
                        <div className="decision-meta">
                          <span>Next: {decision.nextOccurrence}</span>
                        </div>
                      )}

                      {decision.factors && decision.factors.length > 0 && (
                        <div className="decision-factors">
                          {decision.factors.map((f, i) => (
                            <span key={i} className="decision-factor">{f}</span>
                          ))}
                        </div>
                      )}

                      {decision.alternativesConsidered && (
                        <div className="decision-alternatives">
                          {decision.alternativesConsidered}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* Empty State */}
        {agentDecisions.length === 0 && !loading && !error && (
          <div className="empty-state">
            <div className="empty-state-icon">🤖</div>
            <div className="empty-state-text">
              Select a target month and run the agent to see AI scheduling decisions for {profile.name}.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
