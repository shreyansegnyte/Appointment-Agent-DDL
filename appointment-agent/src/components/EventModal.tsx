'use client';

import { CalendarEvent, CATEGORY_COLORS, CATEGORY_LABELS, APPOINTMENT_LABELS } from '@/lib/types';
import { getAppointmentInfo } from '@/lib/appointments';

interface EventModalProps {
  event: CalendarEvent;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const info = getAppointmentInfo(event.type);
  const categoryColor = CATEGORY_COLORS[event.category];
  const reasoning = event.agentReasoning;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

  const durationMinutes = Math.round((event.end.getTime() - event.start.getTime()) / 60000);

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'var(--color-success)';
    if (score >= 0.5) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="event-modal-header">
          <div className="event-modal-title-block">
            <span className="event-modal-icon">{info?.icon || '📅'}</span>
            <div>
              <div className="event-modal-title">{event.title}</div>
              <span
                className="event-modal-category"
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}30`,
                }}
              >
                {CATEGORY_LABELS[event.category]}
              </span>
            </div>
          </div>
          <button className="event-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="event-modal-body">
          {/* Details */}
          <div className="event-modal-detail-row">
            <span className="event-modal-detail-label">📅 Date</span>
            <span className="event-modal-detail-value">{formatDate(event.start)}</span>
          </div>
          <div className="event-modal-detail-row">
            <span className="event-modal-detail-label">🕐 Time</span>
            <span className="event-modal-detail-value">
              {formatTime(event.start)} – {formatTime(event.end)}
            </span>
          </div>
          <div className="event-modal-detail-row">
            <span className="event-modal-detail-label">⏱️ Duration</span>
            <span className="event-modal-detail-value">{durationMinutes} minutes</span>
          </div>
          <div className="event-modal-detail-row">
            <span className="event-modal-detail-label">🔄 Recurring</span>
            <span className="event-modal-detail-value">
              {event.isRecurring ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="event-modal-detail-row">
            <span className="event-modal-detail-label">🤖 Source</span>
            <span className="event-modal-detail-value">
              {event.isAgentScheduled ? (
                <span style={{ color: 'var(--accent)' }}>AI Agent Scheduled</span>
              ) : (
                'Pre-existing'
              )}
            </span>
          </div>

          {/* Agent Reasoning (only for agent-scheduled events) */}
          {reasoning && (
            <>
              <div className="event-modal-section">
                <div className="event-modal-section-title">
                  🧠 Agent Reasoning
                </div>
                <p className="event-modal-reasoning">{reasoning.reasoning}</p>
              </div>

              {/* Confidence Score */}
              <div className="event-modal-section">
                <div className="event-modal-section-title">
                  📊 Confidence Score
                </div>
                <div className="confidence-meter">
                  <div className="confidence-bar-bg">
                    <div
                      className="confidence-bar-fill"
                      style={{
                        width: `${reasoning.confidenceScore * 100}%`,
                        background: getConfidenceColor(reasoning.confidenceScore),
                      }}
                    />
                  </div>
                  <span
                    className="confidence-value"
                    style={{ color: getConfidenceColor(reasoning.confidenceScore) }}
                  >
                    {Math.round(reasoning.confidenceScore * 100)}%
                  </span>
                </div>
              </div>

              {/* Renewal Decision */}
              <div className="event-modal-section">
                <div className="event-modal-section-title">
                  🔄 Renewal Decision
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className={`renewal-badge ${reasoning.renewalDecision ? 'renewal-yes' : 'renewal-no'}`}>
                    {reasoning.renewalDecision ? '✓ Will Renew' : '✕ Will Not Renew'}
                  </span>
                </div>
                <p className="event-modal-reasoning">{reasoning.renewalReasoning}</p>
                {reasoning.nextOccurrence && (
                  <p className="event-modal-reasoning" style={{ marginTop: 6 }}>
                    <strong>Next occurrence:</strong> {reasoning.nextOccurrence}
                  </p>
                )}
              </div>

              {/* Factors */}
              {reasoning.factors && reasoning.factors.length > 0 && (
                <div className="event-modal-section">
                  <div className="event-modal-section-title">
                    📋 Key Factors
                  </div>
                  <div className="decision-factors">
                    {reasoning.factors.map((factor, i) => (
                      <span key={i} className="decision-factor">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternatives */}
              {reasoning.alternativesConsidered && (
                <div className="event-modal-section">
                  <div className="event-modal-section-title">
                    🔀 Alternatives Considered
                  </div>
                  <div className="decision-alternatives">
                    {reasoning.alternativesConsidered}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
