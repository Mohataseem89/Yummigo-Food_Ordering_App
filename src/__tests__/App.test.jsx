import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText(/namaste/i); // match based on your App text
  expect(heading).toBeInTheDocument();
});
