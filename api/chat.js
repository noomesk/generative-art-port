// Función serverless (Vercel) que responde preguntas sobre el portafolio con Groq.
// La API key vive en la variable de entorno GROQ_API_KEY; nunca llega al navegador.

const MODEL = 'openai/gpt-oss-20b';
const MAX_QUESTION_CHARS = 500;

const PROFILE = `
Angie Plazas (noomesk) es ingeniera transdisciplinaria de Frontend e IA. Construye en la intersección
entre arte generativo, creative coding, matemáticas, ingeniería web e IA aplicada (agentes, RAG, llamadas a herramientas).
Stack núcleo: TypeScript, Next.js, React, Tailwind CSS, Node.js.
Creativo & Performance: WebGL/GLSL, Three.js, P5.js, Live Coding / Visual DJ (VJ) en tiempo real. Actúa como intérprete
de código en vivo, modulando manualmente las variables de los shaders de partículas, Perlin noise y fractales con Tweakpane al ritmo del beat.
IA: LLMs, Groq API, Vercel AI SDK, agentes, RAG, llamadas a herramientas, MCP e IA local con Ollama.
También explora bioinformática y procesamiento de audio.
Proyectos destacados: Lit Component Forge (servidor MCP + generador Lit), Motor de autómatas celulares (WebGL/GLSL),
sets de Visual DJ en vivo (FLUIDO y Entrópico), Genome Cleaner (CLI de bioinformática), Compañero contra la ansiedad (FastAPI + React).
Experiencia: Junior Software Engineer (Trainee) en EPAM Systems / Neoris, asignada a cliente bancario (junio–presente).
Desarrollo con JavaScript, HTML y CSS. Enfoque: Web Components con Lit/LitElement, Shadow DOM, mixins, i18n y el ecosistema
interno de componentes del cliente. Experiencia previa con Polymer. Certificación en desarrollo seguro (Net4Skill).
Aplicación de IA agéntica a flujos de desarrollo. No menciones el nombre del cliente ni el nombre del framework interno.
Contacto: disponible desde la sección de contacto del portafolio.
`.trim();

const OUT_OF_SCOPE_RESPONSES = {
  es: `Jaja, esa pregunta se me sale del contexto. Angie me diseñó para conversar sobre lo que comparte en su portafolio: sus proyectos, su trabajo, las herramientas que usa y su experiencia.

Soy un RAG (generación aumentada por recuperación): no soy un chatbot que sepa de todo, sino un sistema que busca respuestas dentro de un contexto concreto. En este caso, mi contexto es este portafolio, así que no puedo responder con fundamento preguntas personales ni otros temas que se salgan de él.

Si necesitas más información, déjame un mensaje en el formulario de contacto. Angie con gusto te leerá y te responderá lo más rápido posible.

Si quieres, pregúntame por mi stack, mi experiencia, mis proyectos, el arte generativo, mis sets como Visual DJ o mis intereses creativos. Por ejemplo: ¿qué tecnologías uso?, ¿qué hago como Visual DJ? o ¿qué temas me interesan?`,
  en: `Haha, that question is outside my context. Angie designed me to talk about what she shares in her portfolio: her projects, her work, the tools she uses, and her experience.

I'm a RAG (retrieval-augmented generation) system: I'm not a general-purpose chatbot; I look for answers within a specific context. Here, that context is this portfolio, so I can't reliably answer personal questions or other topics outside it.

If you need more information, leave a message in the contact form. Angie will be happy to read it and get back to you as soon as she can.

If you'd like, ask me about my stack, experience, projects, generative art, Visual DJ sets, or creative interests. For example: what technologies do I use, what do I do as a Visual DJ, or what topics interest me?`,
};

const GREETING_RESPONSES = {
  es: '¡Hola! Angie me diseñó como un RAG (generación aumentada por recuperación): no soy un chatbot que sepa de todo, sino que busco respuestas en el contexto de este portafolio. Puedes preguntarme por su stack, su experiencia, sus proyectos, el arte generativo, sus sets como Visual DJ o sus intereses creativos. ¿Qué te gustaría saber?',
  en: "Hi! Angie designed me as a RAG (retrieval-augmented generation) system: I'm not a general-purpose chatbot; I look for answers in the context of this portfolio. You can ask me about her tech stack, experience, projects, generative art, Visual DJ sets, or creative interests. What would you like to know?",
};

const SYSTEM_PROMPT = (language) => `Eres el agente del portafolio de Angie Plazas. Respondes preguntas de reclutadores y visitantes.
Reglas:
- Si el usuario solo saluda o pregunta qué haces tú, qué eres o qué puede hacer este agente, responde exactamente con el mensaje de bienvenida indicado abajo. Si combina un saludo con una pregunta sobre Angie, responde la pregunta sobre Angie.
- Responde sobre temas del perfil únicamente. Si la pregunta está fuera del contexto del portafolio, responde exactamente con el mensaje de fuera de contexto indicado abajo y no añadas nada.
- Para preguntas dentro del contexto, responde solo con la información del perfil. Si no sabes algo, dilo y sugiere preguntar por contacto.
- Sé breve para preguntas dentro del contexto: máximo 3 frases, estilo terminal minimalista, sin emojis.
- Responde en el mismo idioma de la pregunta (español o inglés).
- No inventes proyectos, fechas, empresas ni tecnologías.

MENSAJE EXACTO PARA SALUDOS Y PREGUNTAS SOBRE EL AGENTE:
${GREETING_RESPONSES[language]}

MENSAJE EXACTO PARA PREGUNTAS FUERA DE CONTEXTO:
${OUT_OF_SCOPE_RESPONSES[language]}

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
  const language = req.body?.language === 'en' ? 'en' : 'es';
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
          { role: 'system', content: SYSTEM_PROMPT(language) },
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
