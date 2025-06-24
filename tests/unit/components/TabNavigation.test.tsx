import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TabNavigation } from '../../../src/components/common/TabNavigation'

describe('TabNavigation', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]

  it('should render all tabs', () => {
    const onTabChange = vi.fn()
    render(
      <TabNavigation 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={onTabChange} 
      />
    )

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('should highlight active tab', () => {
    const onTabChange = vi.fn()
    render(
      <TabNavigation 
        tabs={mockTabs} 
        activeTab="tab2" 
        onTabChange={onTabChange} 
      />
    )

    const activeTab = screen.getByText('Tab 2').closest('button')
    expect(activeTab).toHaveClass('border-tn-blue', 'text-tn-blue')
  })

  it('should call onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn()
    render(
      <TabNavigation 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={onTabChange} 
      />
    )

    fireEvent.click(screen.getByText('Tab 2'))
    expect(onTabChange).toHaveBeenCalledWith('tab2')
  })

  it('should have proper accessibility attributes', () => {
    const onTabChange = vi.fn()
    render(
      <TabNavigation 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={onTabChange} 
      />
    )

    const tabButtons = screen.getAllByRole('tab')
    expect(tabButtons).toHaveLength(3)
    
    // Check first tab is selected
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'false')
  })
})