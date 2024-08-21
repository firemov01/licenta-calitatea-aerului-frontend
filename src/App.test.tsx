import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // arrange
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // act

    // expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });

  // This is probably more appropriate as an integration test as we are essentially testing how react-router integrates in our app
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-url-path']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
