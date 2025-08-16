'use client'

import { useTranslation } from '../context/TranslationContext'
import { Languages } from 'lucide-react'

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
        className="bg-transparent border-none text-sm font-medium text-gray-700 cursor-pointer focus:outline-none"
      >
        <option value="es">🇪🇸 ES</option>
        <option value="en">🇺🇸 EN</option>
      </select>
    </div>
  )
}