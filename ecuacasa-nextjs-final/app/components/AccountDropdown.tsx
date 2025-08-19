'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { User, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function AccountDropdown() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // For now, assume user is not signed in to avoid hook issues
  const isSignedIn = false

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Don't show dropdown if user is signed in (they have UserButton)
  if (isSignedIn) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-all"
      >
        <User size={18} />
        <span className="hidden sm:inline">{t('nav.account')}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Sign In Option */}
          <Link 
            href="/sign-in" 
            onClick={() => setIsOpen(false)}
            className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium">{t('nav.signin')}</div>
                <div className="text-sm text-gray-500">{t('nav.signin.subtitle')}</div>
              </div>
            </div>
          </Link>

          {/* Divider */}
          <div className="my-2 border-t border-gray-100"></div>

          {/* Sign Up Option */}
          <Link 
            href="/sign-up" 
            onClick={() => setIsOpen(false)}
            className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">+</span>
              </div>
              <div>
                <div className="font-medium">{t('nav.signup')}</div>
                <div className="text-sm text-gray-500">{t('nav.signup.subtitle')}</div>
              </div>
            </div>
          </Link>

          {/* Info Footer */}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="px-4 py-2 text-xs text-gray-500">
              {t('nav.account.footer')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}