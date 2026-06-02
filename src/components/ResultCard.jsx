export default function ResultCard({result}) {
  if (!result) return null

  return (
    <section className="panel result-panel">
      <div className="panel-header">
        <div className="result-score">{result.score}/100</div>
        <h2>{result.headline}</h2>
        <p>{result.summary}</p>
      </div>

      <div className="result-grid">
        <div className="result-block">
          <h3>AM Routine</h3>
          <ol>
            {result.amRoutine.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="result-block">
          <h3>PM Routine</h3>
          <ol>
            {result.pmRoutine.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-block small">
          <h3>Good ingredients</h3>
          <p>{result.goodIngredients}</p>
        </div>
        <div className="result-block small">
          <h3>Avoid</h3>
          <p>{result.avoidIngredients}</p>
        </div>
      </div>

      <div className="result-tip">
        <h3>Tip</h3>
        <p>{result.tip}</p>
      </div>

      {result.concerns?.length ? (
        <div className="concerns-list">
          <h3>Focus areas</h3>
          <div className="chip-list">
            {result.concerns.map((concern) => (
              <span className="chip passive" key={concern}>{concern}</span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
