import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Product } from '../../../src/pages/Product'
import { ThemeProvider } from '../../../src/contexts/ThemeContext'
import { LanguageProvider } from '../../../src/contexts/LanguageContext'

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Product Page', () => {
  it('should render page title', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    )
    
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should render OSS section', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    )
    
    expect(screen.getByText('OSS')).toBeInTheDocument()
  })

  it('should render presentations section', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    )
    
    expect(screen.getByText('Presentations')).toBeInTheDocument()
  })

  it('should display OSS projects with links', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    )
    
    // Check for at least one OSS project structure
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
    
    // Check for GitHub links (multiple projects have GitHub links)
    const githubLinks = screen.getAllByText('GitHub')
    expect(githubLinks.length).toBeGreaterThan(0)
  })

  it('should display presentations with slides', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    )
    
    // Check for presentation items
    const presentations = screen.getAllByRole('article')
    expect(presentations.length).toBeGreaterThan(0)
  })
})