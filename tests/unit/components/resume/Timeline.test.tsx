import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../../../../src/components/resume/Timeline';

describe('Timeline Component', () => {
  it('should render timeline items with all fields', () => {
    const items = [
      {
        title: 'Senior Engineer',
        company: 'Tech Corp',
        period: '2020 - Present',
        description: ['Built amazing things'],
        current: true,
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2020 - Present')).toBeInTheDocument();
    expect(screen.getByText('Built amazing things')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('should render timeline items without company', () => {
    const items = [
      {
        title: 'Freelance Developer',
        period: '2020 - 2022',
        description: ['Various projects'],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Freelance Developer')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2022')).toBeInTheDocument();
    expect(screen.getByText('Various projects')).toBeInTheDocument();
    // Should not show separator bullet
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });

  it('should render timeline items without period', () => {
    const items = [
      {
        title: 'Project Lead',
        company: 'Startup Inc',
        description: ['Leading innovation'],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Project Lead')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    expect(screen.getByText('Leading innovation')).toBeInTheDocument();
    // Should not show separator bullet
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });

  it('should render timeline items with only title and description', () => {
    const items = [
      {
        title: 'Open Source Contributor',
        description: ['Contributing to various projects'],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Open Source Contributor')).toBeInTheDocument();
    expect(screen.getByText('Contributing to various projects')).toBeInTheDocument();
  });

  it('should render nested description items', () => {
    const items = [
      {
        title: 'Full Stack Developer',
        description: [
          {
            text: 'Main responsibilities',
            items: [
              'Frontend development',
              'Backend APIs',
              {
                text: 'DevOps tasks',
                items: ['CI/CD', 'Monitoring'],
              },
            ],
          },
        ],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Main responsibilities')).toBeInTheDocument();
    expect(screen.getByText('Frontend development')).toBeInTheDocument();
    expect(screen.getByText('Backend APIs')).toBeInTheDocument();
    expect(screen.getByText('DevOps tasks')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
    expect(screen.getByText('Monitoring')).toBeInTheDocument();
  });
});
