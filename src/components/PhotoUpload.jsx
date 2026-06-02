import { useRef } from 'react'

export default function PhotoUpload({photoPreview, onPhotoChange}) {
  const fileInput = useRef(null)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        onPhotoChange(reader.result.toString())
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="panel upload-panel">
      <div className="panel-header">
        <h2>Upload a photo</h2>
        <p>Share a selfie or close-up so the analyzer has context for your routine recommendations.</p>
      </div>

      <div className="upload-card">
        {photoPreview ? (
          <img src={photoPreview} alt="Skin preview" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <span>Photo preview</span>
          </div>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="photo-input"
        />
        <button type="button" className="secondary-button" onClick={() => fileInput.current?.click()}>
          Choose image
        </button>
      </div>
    </section>
  )
}
