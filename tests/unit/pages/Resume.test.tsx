import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Resume } from '../../../src/pages/Resume';
import { ThemeProvider } from '../../../src/contexts/ThemeContext';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Resume Page with Tabs', () => {
  it('should render work experience section with tab navigation', () => {
    render(
      <TestWrapper>
        <Resume />
      </TestWrapper>
    );

    // Check for main Work Experience title
    expect(screen.getByText('Work Experience')).toBeInTheDocument();

    // Check for corporate and freelance tabs
    expect(screen.getByRole('tab', { name: /corporate/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /freelance/i })).toBeInTheDocument();
  });

  it('should show main work by default', () => {
    render(
      <TestWrapper>
        <Resume />
      </TestWrapper>
    );

    // Corporate tab should be active
    const corporateTab = screen.getByRole('tab', { name: /corporate/i });
    expect(corporateTab).toHaveAttribute('aria-selected', 'true');

    // Should show main work experience (check for multiple occurrences)
    expect(screen.getAllByText('DeNA Co., Ltd.').length).toBeGreaterThan(0);
  });

  it('should switch to freelance work when tab is clicked', () => {
    render(
      <TestWrapper>
        <Resume />
      </TestWrapper>
    );

    const freelanceTab = screen.getByRole('tab', { name: /freelance/i });
    fireEvent.click(freelanceTab);

    // Freelance tab should be active
    expect(freelanceTab).toHaveAttribute('aria-selected', 'true');

    // Should show freelance content
    expect(screen.getByText('Web3 New Game / Game Client Engineer')).toBeInTheDocument();
  });

  it('should maintain skills and contact sections regardless of tab', () => {
    render(
      <TestWrapper>
        <Resume />
      </TestWrapper>
    );

    // Check skills section is always visible
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();

    // Check contact section is always visible
    expect(screen.getByText('contact[at]hashiiiii.com')).toBeInTheDocument();

    // Switch to freelance work
    const freelanceTab = screen.getByRole('tab', { name: /freelance/i });
    fireEvent.click(freelanceTab);

    // Skills and contact should still be visible
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('contact[at]hashiiiii.com')).toBeInTheDocument();
  });

  it('should show education only on corporate tab', () => {
    render(
      <TestWrapper>
        <Resume />
      </TestWrapper>
    );

    // Education should be visible on corporate tab (default)
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(
      screen.getByText('Master of Science in Planetary Atmospheric Science')
    ).toBeInTheDocument();

    // Switch to freelance tab
    const freelanceTab = screen.getByRole('tab', { name: /freelance/i });
    fireEvent.click(freelanceTab);

    // Education should not be visible on freelance tab
    expect(screen.queryByText('Education')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Master of Science in Planetary Atmospheric Science')
    ).not.toBeInTheDocument();
  });
});
