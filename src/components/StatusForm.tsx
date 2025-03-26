'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { State, Forecast } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function StatusForm() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    state: State.AVAILABLE,
    hours: 4,
    forecast: Forecast.DAY_TO_DAY,
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate session
      if (sessionStatus === 'loading') {
        throw new Error("Session is still loading")
      }

      if (sessionStatus === 'unauthenticated' || !session?.user?.id) {
        router.push('/login')
        return
      }

      // Validate form data
      if (formData.hours < 1 || formData.hours > 8) {
        throw new Error("Hours must be between 1 and 8")
      }

      console.log('Submitting status:', {
        userId: session.user.id,
        ...formData
      })

      const response = await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      // Success - refresh data
      router.refresh()
      alert('Status updated successfully!')
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-stone-900 rounded-lg shadow border border-stone-800">
      <h2 className="text-xl font-semibold text-white">Update Your Status</h2>
      
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
          {error}
        </div>
      )}

      {/* Status Selection */}
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-300">Current Status</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(State).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleChange('state', s)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.state === s 
                  ? s === State.BUSY ? 'bg-red-900 text-red-200' 
                    : s === State.AVAILABLE ? 'bg-green-900 text-green-200'
                    : 'bg-yellow-900 text-yellow-200'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Hours Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-300">
          Hours Available Today: <span className="text-white">{formData.hours}</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="8"
            value={formData.hours}
            onChange={(e) => handleChange('hours', Number(e.target.value))}
            className="flex-1 bg-stone-700 rounded-lg appearance-none cursor-pointer h-2"
          />
          <span className="text-sm w-8 text-center">{formData.hours}h</span>
        </div>
      </div>

      {/* Forecast Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-300">Week Forecast</label>
        <select
          value={formData.forecast}
          onChange={(e) => handleChange('forecast', e.target.value as Forecast)}
          className="w-full p-2 bg-stone-800 border border-stone-700 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.values(Forecast).map((f) => (
            <option key={f} value={f} className="bg-stone-800">
              {f.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-2 text-stone-300">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full p-2 bg-stone-800 border border-stone-700 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="E.g., 'In meetings until 2pm'"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || sessionStatus === 'loading'}
        className={`px-4 py-2 rounded text-white transition-colors ${
          isSubmitting ? 'bg-stone-600 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
        } disabled:opacity-70`}
      >
        {isSubmitting ? 'Saving...' : 'Update Status'}
      </button>
    </form>
  )
}