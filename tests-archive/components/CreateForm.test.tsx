// tests/components/CreateForm.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateForm from '@/components/CreateForm';

describe('CreateForm', () => {
  it('renders form title input', () => {
    render(<CreateForm />);
    expect(screen.getByPlaceholderText(/Untitled Form/i)).toBeInTheDocument();
  });
});
