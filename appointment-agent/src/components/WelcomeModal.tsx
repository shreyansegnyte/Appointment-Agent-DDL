'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Use an effect to ensure the modal only opens on the client side after hydration
  useEffect(() => {
    // Check if the user has already seen the modal in this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-modal-header">
          <h2>Welcome to the AI Appointment Agent 🤖📅</h2>
          <button className="welcome-close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        
        <div className="welcome-modal-body">
          <p>
            This application simulates how an <strong>AI Scheduling Agent</strong> would manage the calendars 
            of real people with different personalities, routines, and constraints. 
            Built for the Stanford Deliberative Democracy Lab.
          </p>

          <div className="welcome-section">
            <h3>🗓️ What does the calendar show?</h3>
            <p>
              The calendar is pre-populated with a full year of <strong>seed events</strong> (Jan-Dec 2026). 
              These represent each person's existing routines and commitments—like weekly team standups, monthly therapy sessions, or regular home cleanings.
            </p>
          </div>

          <div className="welcome-section">
            <h3>👥 The Four Personas</h3>
            <div className="persona-grid">
              <div className="persona-card">
                <strong>👩‍🏫 Margaret Chen</strong>
                <p>62-yr retired professor. Methodical morning person who prefers 90m gaps between appointments.</p>
              </div>
              <div className="persona-card">
                <strong>👨‍💻 Jayden Williams</strong>
                <p>28-yr startup founder. Chaotic scheduler with 4 events/day and 90% flexibility.</p>
              </div>
              <div className="persona-card">
                <strong>👩‍💼 Priya Ramanathan</strong>
                <p>41-yr working mom. Master optimizer who clusters events tightly around school hours.</p>
              </div>
              <div className="persona-card">
                <strong>👨‍⚕️ Carlos Gutierrez</strong>
                <p>35-yr night-shift nurse. Schedules strictly in a narrow afternoon window on specific days.</p>
              </div>
            </div>
          </div>

          <div className="welcome-section">
            <h3>⚙️ How to use the app</h3>
            <ol className="welcome-steps">
              <li><strong>Select a persona</strong> from the top bar to load their calendar and personality profile.</li>
              <li><strong>Choose a target month</strong> in the right-side agent panel.</li>
              <li><strong>Click "Run Scheduling Agent"</strong> to trigger the AI (GPT-5.4).</li>
              <li>The AI will read the persona's life context, existing calendar, and constraints, and then <strong>make scheduling and renewal decisions</strong> for that month.</li>
              <li>Review the generated <strong>decision cards</strong> to see the exact reasoning, confidence scores, and alternatives considered!</li>
            </ol>
          </div>
        </div>

        <div className="welcome-modal-footer">
          <button className="welcome-start-btn" onClick={() => setIsOpen(false)}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
