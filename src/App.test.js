import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz title', () => {
  render(<App />);
  const titleElement = screen.getByText(/What Kind of Tea Are You\?/i);
  expect(titleElement).toBeInTheDocument();
});
