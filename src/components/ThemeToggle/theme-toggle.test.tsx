import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import ThemeToggle from './ThemeToggle';

import { ThemeProvider } from '@/providers/ThemeProvider';

describe('ThemeToggle', () => {
  it('Should render the component', () => {
    const { container } = render(<ThemeToggle />);
    expect(
      container.querySelector('[class*=theme-toggle]')
    ).toBeInTheDocument();
  });
  it('Should change theme by click', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole('checkbox');

    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute('theme')).toBe('light');
  });
});
