import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function OnboardingModal({ isOpen, onComplete }) {
  const { user, updateProfile, isLoading } = useAuth();
  const [selectedBackground, setSelectedBackground] = useState(user?.background || '');
  const [error, setError] = useState('');

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  const backgroundOptions = [
    {
      value: 'software',
      label: 'Software Developer',
      icon: '💻',
      description: 'I primarily work with software, programming, and AI/ML systems',
    },
    {
      value: 'hardware',
      label: 'Hardware Engineer',
      icon: '🔧',
      description: 'I work with physical hardware, robotics, and embedded systems',
    },
    {
      value: 'student',
      label: 'Student',
      icon: '📚',
      description: "I'm learning about AI, robotics, or computer science",
    },
    {
      value: 'other',
      label: 'Other',
      icon: '✨',
      description: 'I have a different background or am new to this field',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedBackground) {
      setError('Please select your background to continue');
      return;
    }

    try {
      await updateProfile({ background: selectedBackground });
      onComplete?.();
    } catch (err) {
      setError(err.message || 'Failed to save your selection');
    }
  };

  return (
    <div className="onboarding-modal-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <div className="onboarding-icon">👋</div>
          <h2>Welcome to Physical AI & Humanoid Robotics!</h2>
          <p>Help us personalize your learning experience by telling us about your background.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="background-options">
            {backgroundOptions.map((option) => (
              <label
                key={option.value}
                className={`background-card ${selectedBackground === option.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="background"
                  value={option.value}
                  checked={selectedBackground === option.value}
                  onChange={() => setSelectedBackground(option.value)}
                />
                <div className="card-content">
                  <span className="card-icon">{option.icon}</span>
                  <div className="card-text">
                    <span className="card-label">{option.label}</span>
                    <span className="card-description">{option.description}</span>
                  </div>
                </div>
                {selectedBackground === option.value && (
                  <div className="check-mark">✓</div>
                )}
              </label>
            ))}
          </div>

          {error && <div className="onboarding-error">{error}</div>}

          <button
            type="submit"
            className="onboarding-btn"
            disabled={isLoading || !selectedBackground}
          >
            {isLoading ? 'Saving...' : 'Get Started'}
          </button>
        </form>
      </div>

      <style>{`
        .onboarding-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(4px);
        }

        .onboarding-modal {
          background: var(--ifm-background-color);
          padding: 2.5rem;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .onboarding-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .onboarding-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .onboarding-header h2 {
          margin-bottom: 0.75rem;
          color: var(--ifm-color-primary);
        }

        .onboarding-header p {
          color: var(--ifm-color-emphasis-600);
          font-size: 1rem;
        }

        .background-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .background-card {
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          border: 2px solid var(--ifm-color-emphasis-200);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .background-card input {
          display: none;
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .card-icon {
          font-size: 1.75rem;
        }

        .card-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .card-label {
          font-weight: 600;
          font-size: 1rem;
        }

        .card-description {
          font-size: 0.85rem;
          color: var(--ifm-color-emphasis-600);
          margin-top: 0.25rem;
        }

        .background-card:hover {
          border-color: var(--ifm-color-primary-light);
          background: var(--ifm-color-emphasis-100);
        }

        .background-card.selected {
          border-color: var(--ifm-color-primary);
          background: var(--ifm-color-primary-lightest);
        }

        .check-mark {
          width: 24px;
          height: 24px;
          background: var(--ifm-color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
        }

        .onboarding-error {
          background: var(--ifm-color-danger-lightest);
          color: var(--ifm-color-danger);
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .onboarding-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          background: var(--ifm-color-primary);
          color: white;
          transition: all 0.2s;
        }

        .onboarding-btn:hover:not(:disabled) {
          background: var(--ifm-color-primary-dark);
          transform: translateY(-1px);
        }

        .onboarding-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* RTL support */
        [lang='ur'] .card-text {
          text-align: right;
        }

        [lang='ur'] .card-content {
          flex-direction: row-reverse;
        }

        [lang='ur'] .onboarding-modal {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
