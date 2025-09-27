'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings, ExternalLink } from 'lucide-react'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyCookies(savedPreferences)
    }
  }, [])

  const applyCookies = (prefs: CookiePreferences) => {
    // In a real implementation, this would integrate with your analytics and marketing tools
    console.log('Applying cookie preferences:', prefs)

    // Example: Load Google Analytics if accepted
    if (prefs.analytics) {
      // Load Google Analytics script here
      console.log('Loading analytics cookies')
    }

    // Example: Load marketing cookies if accepted
    if (prefs.marketing) {
      // Load marketing scripts here
      console.log('Loading marketing cookies')
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    applyCookies(allAccepted)
    setIsVisible(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    applyCookies(preferences)
    setIsVisible(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential))
    applyCookies(onlyEssential)
    setIsVisible(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      {/* Main Cookie Banner */}
      {!showSettings && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Folosim cookie-uri</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Folosim cookie-uri pentru a vă oferi cea mai bună experiență pe site-ul nostru.
                Unele sunt esențiale pentru funcționare, altele ne ajută să îmbunătățim serviciile.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  Preferințe cookies
                </button>
                <a
                  href="/cookie-policy"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Politica de cookies
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Respinge
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Acceptă toate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Preferințe Cookie-uri</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  key: 'essential' as keyof CookiePreferences,
                  title: 'Cookie-uri Esențiale',
                  description: 'Necesare pentru funcționarea site-ului (autentificare, securitate)',
                  disabled: true
                },
                {
                  key: 'analytics' as keyof CookiePreferences,
                  title: 'Cookie-uri de Performanță',
                  description: 'Ne ajută să înțelegem cum folosiți site-ul pentru a-l îmbunătăți',
                  disabled: false
                },
                {
                  key: 'functional' as keyof CookiePreferences,
                  title: 'Cookie-uri Funcționale',
                  description: 'Memorează preferințele dumneavoastră (limbă, temă, setări)',
                  disabled: false
                },
                {
                  key: 'marketing' as keyof CookiePreferences,
                  title: 'Cookie-uri de Marketing',
                  description: 'Folosite pentru reclame țintite și campanii personalizate',
                  disabled: false
                }
              ].map((cookie) => (
                <div key={cookie.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{cookie.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cookie.description}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[cookie.key]}
                          onChange={() => togglePreference(cookie.key)}
                          disabled={cookie.disabled}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                          cookie.disabled ? 'bg-blue-600' : preferences[cookie.key] ? 'bg-blue-600' : 'bg-gray-300'
                        } peer-checked:bg-blue-600`}></div>
                      </label>
                    </div>
                  </div>
                  {cookie.disabled && (
                    <p className="text-xs text-gray-500 mt-2">Aceste cookie-uri sunt esențiale și nu pot fi dezactivate</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Respinge toate
              </button>
              <button
                onClick={acceptSelected}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CookieConsent