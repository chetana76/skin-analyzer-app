const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

function extractJsonFragment(text) {
  const cleaned = text.trim().replace(/```json|```/gi, '').trim()
  const start = cleaned.search(/[{\[]/)
  if (start === -1) {
    console.warn('No JSON object/array found in response', cleaned.slice(0, 200))
    return null
  }

  let depth = 0
  let inString = false
  let escape = false
  const openChar = cleaned[start]
  const closeChar = openChar === '[' ? ']' : '}'

  for (let i = start; i < cleaned.length; i += 1) {
    const char = cleaned[i]
    if (escape) {
      escape = false
      continue
    }
    if (char === '\\') {
      escape = true
      continue
    }
    if (char === '"' && !escape) {
      inString = !inString
    }
    if (!inString) {
      if (char === openChar) depth += 1
      if (char === closeChar) {
        depth -= 1
        if (depth === 0) {
          return cleaned.slice(start, i + 1)
        }
      }
    }
  }

  console.warn('JSON object not properly closed. Response may be incomplete.', cleaned.slice(0, 300))
  return null
}

function safeParseJson(text) {
  const cleaned = text.trim().replace(/```json|```/gi, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch (firstError) {
    const fragment = extractJsonFragment(cleaned)
    if (!fragment) {
      throw new Error(`Unable to extract valid JSON from response. First 500 chars: ${cleaned.slice(0, 500)}`)
    }
    try {
      return JSON.parse(fragment)
    } catch (secondError) {
      throw new Error(`Extracted JSON fragment is invalid. Fragment: ${fragment.slice(0, 500)}`)
    }
  }
}

export async function analyzeSkin(payload) {
  const key = import.meta.env.VITE_ANTHROPIC_KEY?.trim()
  if (!key) {
    throw new Error('Missing VITE_ANTHROPIC_KEY in .env file')
  }

  const prompt = `You are a professional skin analyst. Analyze the following and return ONLY valid JSON with exactly these keys: score (number 0-100), headline (string), summary (string), concerns (array of strings), amRoutine (array of strings), pmRoutine (array of strings), goodIngredients (array of strings), avoidIngredients (array of strings), tip (string). No text outside the JSON.\n\nPatient details: ${JSON.stringify(payload)}`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Anthropic API error: ${response.status} — ${errorText}`)
  }

  const data = await response.json()
  
  let rawText = ''
  if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
    rawText = data.content[0].text
  } else if (data.completion) {
    rawText = typeof data.completion === 'string' ? data.completion : data.completion.toString()
  } else if (data.output && Array.isArray(data.output) && data.output[0]?.content?.[0]?.text) {
    rawText = data.output[0].content[0].text
  }

  if (!rawText || rawText.length === 0) {
    throw new Error(`Empty response from Anthropic API. Response keys: ${Object.keys(data).join(', ')}`)
  }

  const parsed = safeParseJson(rawText)

  return {
    score: parsed.score ?? 0,
    headline: parsed.headline ?? '',
    summary: parsed.summary ?? '',
    concerns: Array.isArray(parsed.concerns) ? parsed.concerns : [],
    amRoutine: Array.isArray(parsed.amRoutine) ? parsed.amRoutine : [],
    pmRoutine: Array.isArray(parsed.pmRoutine) ? parsed.pmRoutine : [],
    goodIngredients: Array.isArray(parsed.goodIngredients) ? parsed.goodIngredients : [],
    avoidIngredients: Array.isArray(parsed.avoidIngredients) ? parsed.avoidIngredients : [],
    tip: parsed.tip ?? '',
  }
}
