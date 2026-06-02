const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal']
const concernsOptions = ['Acne', 'Dark spots', 'Fine lines', 'Pore texture', 'Redness', 'Uneven tone']
const ageRanges = ['Under 25', '25-34', '35-44', '45-54', '55+']
const budgets = ['Budget-friendly', 'Midrange', 'Luxury']

function Chip({selected, label, onClick}) {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default function SkinForm({values, onChange, onSubmit}) {
  const handleSelection = (field, value) => {
    onChange(field, value)
  }

  const handleConcernToggle = (option) => {
    const current = values.concerns || []
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option]
    onChange('concerns', next)
  }

  return (
    <section className="panel form-panel">
      <div className="panel-header">
        <h2>Tell us about your skin</h2>
        <p>Choose the options that fit your skin goals and get a tailored routine recommendation.</p>
      </div>

      <form className="skin-form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
        <div className="field-group">
          <label>Skin type</label>
          <div className="chip-list">
            {skinTypes.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={values.skinType === option}
                onClick={() => handleSelection('skinType', option)}
              />
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Primary concerns</label>
          <div className="chip-list">
            {concernsOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={(values.concerns || []).includes(option)}
                onClick={() => handleConcernToggle(option)}
              />
            ))}
          </div>
        </div>

        <div className="field-grid">
          <div className="field-group">
            <label>Age range</label>
            <div className="chip-list horizontal">
              {ageRanges.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  selected={values.ageRange === option}
                  onClick={() => handleSelection('ageRange', option)}
                />
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Budget</label>
            <div className="chip-list horizontal">
              {budgets.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  selected={values.budget === option}
                  onClick={() => handleSelection('budget', option)}
                />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="primary-button">
          Analyze my skin
        </button>
      </form>
    </section>
  )
}
