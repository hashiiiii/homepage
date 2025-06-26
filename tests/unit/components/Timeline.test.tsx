import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../../../src/components/resume/Timeline';

describe('Timeline', () => {
  it('renders simple string descriptions', () => {
    const items = [
      {
        title: 'Software Engineer',
        company: 'Test Company',
        period: '2020 - 2022',
        description: ['Task 1', 'Task 2'],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('renders nested descriptions', () => {
    const items = [
      {
        title: 'Lead Engineer',
        company: 'Test Corp',
        period: '2022 - Present',
        current: true,
        description: [
          'Simple task',
          {
            text: 'Parent task',
            items: [
              'Child task 1',
              'Child task 2',
              {
                text: 'Nested parent',
                items: ['Grandchild task'],
              },
            ],
          },
        ],
      },
    ];

    render(<Timeline items={items} />);

    expect(screen.getByText('Simple task')).toBeInTheDocument();
    expect(screen.getByText('Parent task')).toBeInTheDocument();
    expect(screen.getByText('Child task 1')).toBeInTheDocument();
    expect(screen.getByText('Grandchild task')).toBeInTheDocument();
  });
});
