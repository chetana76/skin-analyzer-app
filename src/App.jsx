import { useState } from 'react'
import './App.css'
import { analyzeSkin } from './api/skinAnalyzer'
import SkinForm from './components/SkinForm.jsx'
import PhotoUpload from './components/PhotoUpload.jsx'
import ResultCard from './components/ResultCard.jsx'

const initialForm = {
  skinType: 'Combination',
  concerns: ['Acne'],
  ageRange: '25-34',
  budget: 'Midrange',
  photo: '',
}

function App() {
  const [formValues, setFormValues] = useState(initialForm)
  const [photoPreview, setPhotoPreview] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    console.log('KEY:', import.meta.env.VITE_ANTHROPIC_KEY)
  }

  const handlePhotoChange = (base64) => {
    setPhotoPreview(base64)
    setFormValues((current) => ({ ...current, photo: base64 }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await analyzeSkin({
        skinType: formValues.skinType,
        concerns: formValues.concerns,
        ageRange: formValues.ageRange,
        budget: formValues.budget,
        photoBase64: formValues.photo,
      })
      setResult(response)
    } catch (err) {
      setError(err?.message ?? 'Unable to analyze skin at this time.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="hero-banner">
        <div>
          <span className="eyebrow">Skin Wellness</span>
          <h1>Smart skin analysis for your daily routine</h1>
          <p>Build a personalized AM and PM regimen with a soft-touch skin assessment and simple ingredient guidance.</p>
        </div>
      </header>

      <main className="content-grid">
        <div className="left-column">
          <SkinForm values={formValues} onChange={handleChange} onSubmit={handleSubmit} />
          <PhotoUpload photoPreview={photoPreview} onPhotoChange={handlePhotoChange} />
        </div>

        <aside className="right-column">
          <section className="panel info-panel">
            <div className="panel-header">
              <h2>How it works</h2>
              <p>Complete the questionnaire, share a selfie if you like, then tap analyze to receive a clean, custom skin routine.</p>
            </div>
            <div className="info-list">
              <p>• Skin type and concern matching</p>
              <p>• Practical AM / PM steps</p>
              <p>• Ingredient guidance for your profile</p>
            </div>
            {error ? <div className="error-banner">{error}</div> : null}
            <button type="button" className="primary-button wide" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze now'}
            </button>
          </section>

          {result ? <ResultCard result={result} /> : null}
        </aside>
      </main>
    </div>
  )
}

export default App
