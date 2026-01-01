import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function SignIn({ onSwitchToSignUp, onClose }) {
  const { signIn, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signIn(formData.email, formData.password);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="auth-close-btn" onClick={onClose}>×</button>

        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue learning</p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <button type="button" className="auth-forgot-btn">
            Forgot your password?
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignUp}>
            Sign Up
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
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .auth-subtitle {
          text-align: center;
          color: var(--ifm-color-emphasis-600);
          margin-bottom: 1.5rem;
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

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-forgot-btn {
          width: 100%;
          background: none;
          border: none;
          color: var(--ifm-color-primary);
          cursor: pointer;
          margin-top: 0.75rem;
          font-size: 0.9rem;
        }

        .auth-forgot-btn:hover {
          text-decoration: underline;
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
      `}</style>
    </div>
  );
}
