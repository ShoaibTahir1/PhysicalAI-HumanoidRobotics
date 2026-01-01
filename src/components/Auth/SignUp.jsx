import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function SignUp({ onSwitchToSignIn, onClose }) {
  const { signUp, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    background: '',
  });
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Account, 2: Background

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    setStep(2);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.background) {
      setError('Please select your background');
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name, formData.background);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  const backgroundOptions = [
    { value: 'software', label: 'Software Developer', icon: '💻' },
    { value: 'hardware', label: 'Hardware Engineer', icon: '🔧' },
    { value: 'student', label: 'Student', icon: '📚' },
    { value: 'other', label: 'Other', icon: '✨' },
  ];

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="auth-close-btn" onClick={onClose}>×</button>

        <h2>Create Account</h2>

        {step === 1 && (
          <form onSubmit={handleSubmitStep1}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitStep2}>
            <p className="auth-subtitle">Tell us about your background so we can personalize your experience</p>

            <div className="background-options">
              {backgroundOptions.map((option) => (
                <label
                  key={option.value}
                  className={`background-option ${formData.background === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="background"
                    value={option.value}
                    checked={formData.background === option.value}
                    onChange={handleChange}
                  />
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </label>
              ))}
            </div>

            {error && <div className="auth-error">{error}</div>}

            <div className="auth-actions">
              <button
                type="button"
                className="auth-btn secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="auth-btn primary" disabled={isLoading || !formData.background}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToSignIn}>
            Sign In
          </button>
        </p>
      </div>

      <style>{`
        .auth-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .auth-modal-content {
          background: var(--ifm-background-color);
          padding: 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .auth-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--ifm-color-emphasis-600);
        }

        .auth-modal-content h2 {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--ifm-color-emphasis-300);
          border-radius: 8px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--ifm-color-primary);
          box-shadow: 0 0 0 3px var(--ifm-color-primary-lightest);
        }

        .auth-error {
          background: var(--ifm-color-danger-lightest);
          color: var(--ifm-color-danger);
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .auth-btn {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .auth-btn.primary {
          background: var(--ifm-color-primary);
          color: white;
        }

        .auth-btn.primary:hover:not(:disabled) {
          background: var(--ifm-color-primary-dark);
        }

        .auth-btn.secondary {
          background: var(--ifm-color-emphasis-200);
          color: var(--ifm-color-emphasis-700);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-actions {
          display: flex;
          gap: 1rem;
        }

        .auth-actions .auth-btn {
          flex: 1;
        }

        .auth-subtitle {
          text-align: center;
          color: var(--ifm-color-emphasis-600);
          margin-bottom: 1.5rem;
        }

        .background-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .background-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 2px solid var(--ifm-color-emphasis-200);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .background-option input {
          display: none;
        }

        .background-option:hover {
          border-color: var(--ifm-color-primary-light);
        }

        .background-option.selected {
          border-color: var(--ifm-color-primary);
          background: var(--ifm-color-primary-lightest);
        }

        .option-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .option-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .auth-switch {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--ifm-color-emphasis-600);
        }

        .auth-switch button {
          background: none;
          border: none;
          color: var(--ifm-color-primary);
          cursor: pointer;
          font-weight: 500;
        }

        /* RTL support */
        [lang='ur'] .auth-modal-content {
          text-align: right;
        }

        [lang='ur'] .auth-actions {
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  );
}
