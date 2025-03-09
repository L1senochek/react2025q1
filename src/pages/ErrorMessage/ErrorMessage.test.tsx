import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage:', () => {
  test('- Renders error message correctly', () => {
    const errorMessage = 'Test error message';

    render(<ErrorMessage />);

    const errorTitle = screen.getByText(/Error message:/i);

    expect(errorTitle).toBeTruthy();

    const errorMessageText = screen.getByText(errorMessage);

    expect(errorMessageText).toBeTruthy();
  });
});
