import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm', () => {
  it('submits the form with email and password', async () => {
    const mockLogin = vi.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onLogin={mockLogin} isLoading={false} error={null} />);

    await user.type(
      screen.getByPlaceholderText(/email/i),
      'test@example.com'
    );
    await user.type(
      screen.getByPlaceholderText(/password/i),
      'password123'
    );
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('displays error message when provided', () => {
    render(
      <LoginForm
        onLogin={() => Promise.resolve()}
        isLoading={false}
        error="Invalid credentials"
      />
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('disables submit button while loading', () => {
    render(
      <LoginForm
        onLogin={() => Promise.resolve()}
        isLoading={true}
        error={null}
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});