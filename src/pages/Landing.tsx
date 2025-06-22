import React from 'react'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'

export const Landing: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Features />
    </div>
  )
}