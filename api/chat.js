// Función serverless (Vercel) que responde preguntas sobre el portafolio con Groq.
// La API key vive en la variable de entorno GROQ_API_KEY; nunca llega al navegador.

const MODEL = 'openai/gpt-oss-20b';
const MAX_QUESTION_CHARS = 500;

const PROFILE = `
Angie Plazas (noomesk) es ingeniera transdisciplinaria de Frontend e IA. Construye en la intersección
entre arte generativo, creative coding, matemáticas, ingeniería web e IA aplicada (agentes, RAG, llamadas a herramientas).
Stack núcleo: TypeScript, Next.js, React, Tailwind CSS, Node.js. Creativo: WebGL/GLSL, Three.js, P5.js.
IA: LLMs, Groq API, Vercel AI SDK, agentes, RAG, llamadas a herramientas, MCP e IA local con Ollama.
También explora bioinformática y procesamiento de audio.
Proyectos destacados: Motor de autómatas celulares (WebGL/GLSL), Asistente de código con IA (Groq + Llama + Three.js),
Compañero contra la ansiedad (FastAPI + React + LLM con guardarraíles), Genome Cleaner (CLI de bioinformática),
Endmoda (galería de moda), Security Anomaly Detector (en progreso), Portfolio Q&A Agent (este agente).
Experiencia: Junior Software Engineer (Trainee) en EPAM Systems / NEORIS (jun–oct 2026). Enfoque: Web Components
con Lit/LitElement, Shadow DOM, ecosistema Cells, mixins, i18n y software seguro + IA agéntica aplicada a flujos de desarrollo.
Contacto: disponible desde la sección de contacto del portafolio.
`.trim();

const SYSTEM_PROMPT = `Eres el agente del portafolio de Angie Plazas. Respondes preguntas de reclutadores y visitantes.
Reglas:
- Responde solo con la información del perfil. Si no sabes algo, dilo y sugiere preguntar por contacto.
- Sé breve: máximo 3 frases, estilo terminal minimalista, sin emojis.
- Responde en el mismo idioma de la pregunta (español o inglés).
- No inventes proyectos, fechas, empresas ni tecnologías.

PERFIL:
${PROFILE}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GROQ_API_KEY' });
  }

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(400).json({ error: 'Question too long' });
  }

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error('Groq error', upstream.status, detail);
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await upstream.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return res.status(502).json({ error: 'Empty response' });
    }
    return res.status(200).json({ answer });
  } catch {
    return res.status(502).json({ error: 'Request failed' });
  }
}
