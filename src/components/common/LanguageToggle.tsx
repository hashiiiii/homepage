import React from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage, Language } from '../../contexts/LanguageContext'
import {
  shouldShowLanguageToggle,
  isMultilingualEnabled,
  getDefaultLanguage,
  getAvailableLanguages,
} from '../../config/multilingual'

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const location = useLocation()

  // Get configuration for current page
  const showToggle = shouldShowLanguageToggle(location.pathname)
  const multilingualEnabled = isMultilingualEnabled(location.pathname)
  const defaultLanguage = getDefaultLanguage(location.pathname)
  const availableLanguages = getAvailableLanguages(location.pathname)

  // Don't render if toggle should not be shown
  if (!showToggle) {
    return null
  }

  const isDisabled = !multilingualEnabled
  const displayLanguage = isDisabled ? defaultLanguage : language

  const toggleLanguage = () => {
    if (isDisabled) return
    
    // Cycle through available languages
    const currentIndex = availableLanguages.indexOf(language)
    const nextIndex = (currentIndex + 1) % availableLanguages.length
    setLanguage(availableLanguages[nextIndex])
  }

  const getLanguageDisplay = (lang: Language): string => {
    return lang === 'en' ? '🇺🇸 EN' : '🇯🇵 JP'
  }

  const getAriaLabel = (): string => {
    if (isDisabled) {
      return 'Language switching not available for this page'
    }
    const nextLang = availableLanguages[(availableLanguages.indexOf(language) + 1) % availableLanguages.length]
    return `Switch to ${nextLang === 'en' ? 'English' : 'Japanese'}`
  }

  return (
    <button
      onClick={toggleLanguage}
      disabled={isDisabled}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        isDisabled
          ? 'bg-tn-bg-tertiary/50 text-tn-fg-muted cursor-not-allowed opacity-50'
          : 'bg-tn-bg-tertiary hover:bg-tn-accent-blue/10 text-tn-fg-secondary hover:text-tn-accent-blue'
      }`}
      aria-label={getAriaLabel()}
    >
      <span className="text-sm font-medium">
        {getLanguageDisplay(displayLanguage)}
      </span>
    </button>
  )
}