'use client';

import { useMemo, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views, Event as RBCEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CATEGORY_COLORS } from '@/lib/types';

const localizer = momentLocalizer(moment);

interface CalendarProps {
  events: CalendarEvent[];
  currentDate: Date;
  view: string;
  onNavigate: (date: Date) => void;
  onViewChange: (view: string) => void;
  onSelectEvent: (event: CalendarEvent) => void;
}

export default function Calendar({
  events,
  currentDate,
  view,
  onNavigate,
  onViewChange,
  onSelectEvent,
}: CalendarProps) {
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const color = event.color || CATEGORY_COLORS[event.category] || '#4ea8de';
    const isAgentScheduled = event.isAgentScheduled;

    if (isAgentScheduled) {
      return {
        style: {
          backgroundColor: color,
          color: '#ffffff',
          border: `1px solid ${color}`,
          borderLeft: `4px solid ${color}`,
          fontSize: '11px',
          fontWeight: 600,
          padding: '2px 6px',
          borderRadius: '4px',
          boxShadow: `0 0 10px ${color}60`,
          zIndex: 10,
        },
      };
    } else {
      return {
        style: {
          backgroundColor: `${color}1a`, // 10% opacity
          color: 'var(--text-secondary)',
          border: `1px solid ${color}33`, // 20% opacity
          borderLeft: `3px solid ${color}80`,
          fontSize: '11px',
          fontWeight: 500,
          padding: '2px 6px',
          borderRadius: '4px',
        },
      };
    }
  }, []);

  const formats = useMemo(() => ({
    dayHeaderFormat: 'ddd MMM D',
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format('MMM D')} – ${moment(end).format('MMM D, YYYY')}`,
    monthHeaderFormat: 'MMMM YYYY',
    agendaDateFormat: 'ddd MMM D',
    agendaTimeFormat: 'h:mm A',
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format('h:mm A')} – ${moment(end).format('h:mm A')}`,
  }), []);

  const handleSelectEvent = useCallback(
    (event: RBCEvent) => {
      onSelectEvent(event as unknown as CalendarEvent);
    },
    [onSelectEvent]
  );

  const currentView = view === 'month' ? Views.MONTH : view === 'week' ? Views.WEEK : view === 'day' ? Views.DAY : Views.AGENDA;

  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events as unknown as RBCEvent[]}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onNavigate={onNavigate}
        onView={(v) => onViewChange(v)}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter as unknown as undefined}
        formats={formats}
        popup
        selectable={false}
        style={{ height: '100%' }}
        min={new Date(2026, 0, 1, 6, 0)} 
        max={new Date(2026, 0, 1, 22, 0)}
        step={30}
        timeslots={2}
      />
    </div>
  );
}
