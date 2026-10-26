// Vitrina del portafolio. El portafolio NO aloja los proyectos: sólo enlaza a ellos.
// Campos de texto (role, problem, solution, description, highlights) viven en `copy`
// para que cada idioma se muestre completo y sin mezclar.

export const projects = [
  {
    id: 'portfolio-qna-agent',
    title: 'Portfolio Q&A Agent',
    tags: ['Vercel AI SDK', 'Groq', 'RAG', 'Agents', 'TypeScript'],
    link: '#portfolio-agent',
    github: 'https://github.com/noomesk/generative-art-port',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2026',
    copy: {
      en: {
        role: 'AI Engineer • RAG',
        problem: 'Recruiters want to quickly understand stack, projects and focus without reading the whole site.',
        solution: 'Terminal-style Q&A agent grounded on portfolio/CV data with a RAG-inspired retrieval layer. Designed to demonstrate context-aware answers over generic chat.',
        description: 'Terminal-style portfolio assistant that answers questions about stack, projects, AI work and experience using grounded context.',
        highlights: [
          'Grounded on portfolio data (context-first)',
          'Terminal UX matching the site aesthetic',
          'Extensible to embeddings + vector store',
          'Demonstrates tool/agent mindset'
        ]
      },
      es: {
        role: 'Ingeniero de IA • RAG',
        problem: 'Los reclutadores quieren entender rápido mi stack, proyectos y enfoque sin leer todo el sitio.',
        solution: 'Agente de preguntas y respuestas estilo terminal, anclado en datos del portafolio/CV, con una capa de recuperación inspirada en RAG. Diseñado para demostrar respuestas con contexto frente a un chat genérico.',
        description: 'Asistente de portafolio estilo terminal que responde preguntas sobre stack, proyectos, trabajo en IA y experiencia usando contexto verificado.',
        highlights: [
          'Anclado en datos del portafolio (contexto primero)',
          'UX de terminal alineada con la estética del sitio',
          'Extensible a embeddings + vector store',
          'Muestra mentalidad de agente y herramientas'
        ]
      }
    }
  },
  {
    id: 'cellular-automata-engine',
    title: 'Cellular Automata Engine',
    tags: ['WebGL', 'GLSL', 'TypeScript'],
    link: 'https://cellular-automata-audio.vercel.app/',
    github: 'https://github.com/noomesk/cellular_automata_engine',
    status: 'live',
    focusCategories: ['cr', 'fs'],
    year: '2025',
    copy: {
      en: {
        role: 'Creative Coder • Frontend Engineering',
        problem: 'Render millions of cellular automata cells in real-time without sacrificing FPS.',
        solution: 'Built a WebGL + GLSL rendering pipeline with a custom grid, optimized draw calls and configurable rule sets to explore emergent behaviors.',
        description: 'A high-performance WebGL cellular automata simulator capable of rendering millions of cells in real time. Explore emergent behaviors through custom rule sets.',
        highlights: [
          'GPU-accelerated rendering with fragment shaders',
          'Configurable rule sets for emergent behavior',
          'Performance-focused architecture for large grids'
        ]
      },
      es: {
        role: 'Creative Coder • Ingeniería Frontend',
        problem: 'Renderizar millones de celdas de autómatas celulares en tiempo real sin sacrificar FPS.',
        solution: 'Pipeline de renderizado WebGL + GLSL con grilla propia, llamadas de dibujo optimizadas y conjuntos de reglas configurables para explorar comportamientos emergentes.',
        description: 'Simulador de autómatas celulares en WebGL de alto rendimiento, capaz de renderizar millones de celdas en tiempo real. Explora comportamientos emergentes con conjuntos de reglas personalizados.',
        highlights: [
          'Renderizado acelerado por GPU con fragment shaders',
          'Conjuntos de reglas configurables para comportamiento emergente',
          'Arquitectura orientada a rendimiento para grillas grandes'
        ]
      }
    }
  },
  {
    id: 'ai-code-assistant',
    title: 'Lit Component Forge',
    tags: ['Lit', 'Web Components', 'MCP', 'Groq API', 'TypeScript'],
    link: 'https://lit-component-forge.vercel.app',
    github: 'https://github.com/noomesk/lit-component-forge',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2026',
    copy: {
      en: {
        role: 'AI Engineer • Frontend',
        problem: 'Teams need consistent Web Components, and generating them by hand is slow and error-prone.',
        solution: 'An MCP server and web demo that generate Lit components from a plain-language description, following team conventions: Shadow DOM, typed props, custom events and accessibility.',
        description: 'Model Context Protocol server that generates Lit components with team conventions, plus a web demo where you describe a component and see the generated code and a live preview.',
        highlights: [
          'MCP tools for validation and component generation',
          'Team conventions exposed as a resource for agents',
          'Live preview of generated Lit components'
        ]
      },
      es: {
        role: 'Ingeniero de IA • Frontend',
        problem: 'Los equipos necesitan Web Components consistentes, y escribirlos a mano es lento y propenso a errores.',
        solution: 'Un servidor MCP y una demo web que generan componentes Lit a partir de una descripción en lenguaje natural, siguiendo convenciones de equipo: Shadow DOM, props tipadas, eventos personalizados y accesibilidad.',
        description: 'Servidor de Model Context Protocol que genera componentes Lit con convenciones de equipo, y una demo web donde describes un componente y ves el código generado y una vista previa en vivo.',
        highlights: [
          'Herramientas MCP para validación y generación de componentes',
          'Convenciones de equipo expuestas como recurso para agentes',
          'Vista previa en vivo de componentes Lit generados'
        ]
      }
    }
  },
  {
    id: 'anxiety-companion',
    title: 'Anxiety Companion',
    tags: ['FastAPI', 'React', 'SQLite', 'Groq API', 'JWT', 'TypeScript'],
    link: 'https://app-anxiety-frontend.onrender.com/',
    github: 'https://github.com/noomesk/app_anxiety',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2025',
    copy: {
      en: {
        role: 'AI Product • Full-Stack',
        problem: 'Need a safe, accessible support space between therapy sessions with practical guardrails.',
        solution: 'LLM-powered empathetic chatbot with crisis detection, guided exercises, contextual memory, JWT auth and a FastAPI + React stack built with scalability in mind.',
        description: 'An emotional support app designed to be used between therapy sessions. It combines an LLM-powered empathetic chatbot, automatic crisis detection, guided therapeutic exercises, and contextual user memory — all built on a FastAPI + React architecture ready to scale.',
        highlights: [
          'Contextual memory per user session',
          'Crisis-aware flows with safety considerations',
          'Full-stack auth + REST architecture'
        ]
      },
      es: {
        role: 'Producto de IA • Full-Stack',
        problem: 'Hace falta un espacio de apoyo seguro y accesible entre sesiones de terapia, con barreras de seguridad prácticas.',
        solution: 'Chatbot empático con LLM, detección de crisis, ejercicios guiados, memoria contextual, autenticación JWT y una arquitectura FastAPI + React pensada para escalar.',
        description: 'App de apoyo emocional pensada para usarse entre sesiones de terapia. Combina un chatbot empático con LLM, detección automática de crisis, ejercicios terapéuticos guiados y memoria contextual del usuario, sobre una arquitectura FastAPI + React lista para escalar.',
        highlights: [
          'Memoria contextual por sesión de usuario',
          'Flujos sensibles a crisis con consideraciones de seguridad',
          'Autenticación full-stack + arquitectura REST'
        ]
      }
    }
  },
  {
    id: 'bioacoustic-soundscapes',
    title: 'Bioacoustic Soundscapes',
    tags: ['React', 'Python', 'Audio Processing'],
    link: '#',
    github: '#',
    status: 'in-progress',
    focusCategories: ['cr', 'ai'],
    year: '2026',
    copy: {
      en: {
        role: 'Data + Creative Coding',
        problem: 'Make biodiversity data audible and visual by turning raw field recordings into interpretable insights.',
        solution: 'Processing pipeline to generate spectrograms and interactive acoustic landscapes to analyze bioacoustic patterns.',
        description: 'A sound data processing tool that visualizes spectrograms and acoustic landscapes to analyze biodiversity through sound.',
        highlights: [
          'Spectrogram generation from audio',
          'Bridging biology + creative visualization',
          'Exploring ML for acoustic classification'
        ]
      },
      es: {
        role: 'Datos + Creative Coding',
        problem: 'Volver audible y visual la data de biodiversidad, convirtiendo grabaciones de campo en insights interpretables.',
        solution: 'Pipeline de procesamiento para generar espectrogramas y paisajes acústicos interactivos que permiten analizar patrones bioacústicos.',
        description: 'Herramienta de procesamiento de datos sonoros que visualiza espectrogramas y paisajes acústicos para analizar la biodiversidad a través del sonido.',
        highlights: [
          'Generación de espectrogramas a partir de audio',
          'Puente entre biología y visualización creativa',
          'Exploración de ML para clasificación acústica'
        ]
      }
    }
  },
  {
    id: 'genome-cleaner',
    title: 'Genome Cleaner',
    tags: ['Node.js', 'CLI', 'Bioinformatics'],
    link: 'https://genomecleaner.streamlit.app/',
    github: 'https://github.com/noomesk/genome-cleaner',
    status: 'live',
    focusCategories: ['fs'],
    year: '2025',
    copy: {
      en: {
        role: 'Bioinformatics Tooling',
        problem: 'Cleaning FASTA/FASTQ sequences is repetitive and error-prone for bioinformatic workflows.',
        solution: 'Lightweight CLI/processor to sanitize, format and normalize biological sequence strings with a focus on speed and clarity.',
        description: 'A high-efficiency processor for cleaning and formatting biological sequence strings in FASTA and FASTQ formats, streamlining bioinformatic workflows.',
        highlights: [
          'Streamlines repetitive bioinformatics cleanup',
          'Pragmatic CLI for real workflows',
          'Bridges CS + life sciences'
        ]
      },
      es: {
        role: 'Herramientas de bioinformática',
        problem: 'Limpiar secuencias FASTA/FASTQ es repetitivo y propenso a errores en flujos de bioinformática.',
        solution: 'CLI/procesador liviano para sanear, formatear y normalizar cadenas de secuencias biológicas, con foco en velocidad y claridad.',
        description: 'Procesador de alta eficiencia para limpiar y formatear cadenas de secuencias biológicas en formatos FASTA y FASTQ, agilizando los flujos de bioinformática.',
        highlights: [
          'Agiliza la limpieza repetitiva de bioinformática',
          'CLI pragmática para flujos reales',
          'Une computación y ciencias de la vida'
        ]
      }
    }
  },
  {
    id: 'interactive-fashion-gallery',
    title: 'Interactive Fashion Gallery',
    tags: ['React', 'Node.js', 'REST API', 'TypeScript'],
    link: 'https://endmoda.vercel.app/',
    github: 'https://github.com/noomesk/Endmoda',
    status: 'live',
    focusCategories: ['fs', 'cr'],
    year: '2024',
    copy: {
      en: {
        role: 'Frontend • UX Engineering',
        problem: 'Showcase a fashion collection with a focus on mood and motion without sacrificing performance.',
        solution: 'Responsive, fluid gallery with curated navigation and animation to drive exploration and product discovery.',
        description: 'A visual e-commerce platform where users explore styles, browse collections, and shop. Designed around visual experience and fluid navigation.',
        highlights: [
          'Motion-driven UX with Framer Motion',
          'Performance-conscious animations',
          'Strong visual identity'
        ]
      },
      es: {
        role: 'Frontend • Ingeniería UX',
        problem: 'Mostrar una colección de moda con foco en ambiente y movimiento sin sacrificar rendimiento.',
        solution: 'Galería fluida y responsiva con navegación curada y animaciones que impulsan la exploración y el descubrimiento de productos.',
        description: 'Plataforma visual de e-commerce donde los usuarios exploran estilos, navegan colecciones y compran. Diseñada alrededor de la experiencia visual y una navegación fluida.',
        highlights: [
          'UX impulsada por movimiento con Framer Motion',
          'Animaciones conscientes del rendimiento',
          'Identidad visual fuerte'
        ]
      }
    }
  },
  {
    id: 'security-anomaly-detector',
    title: 'Security Anomaly Detector',
    tags: ['ML', 'Streaming', 'SIEM', 'Security'],
    // Proyecto vive en su propio repositorio; aquí sólo se muestra la vitrina.
    link: '#',
    github: '#',
    status: 'in-progress',
    focusCategories: ['ai', 'fs'],
    year: '2026',
    copy: {
      en: {
        role: 'AI • Cybersecurity',
        problem: 'Detect anomalies in security logs in real-time without hard-coded rules.',
        solution: 'ML patterns + deterministic rules with streaming ingestion to flag suspicious activities and trigger alerts.',
        description: 'A real-time anomaly detector for security logs that combines machine-learning patterns with rule-based logic to surface actionable security insights.',
        highlights: [
          'Real-time anomaly detection',
          'Contextual alerting',
          'Extensible rule templates'
        ]
      },
      es: {
        role: 'IA • Ciberseguridad',
        problem: 'Detectar anomalías en logs de seguridad en tiempo real, sin reglas codificadas a mano.',
        solution: 'Patrones de ML + reglas deterministas con ingesta en streaming para marcar actividades sospechosas y disparar alertas.',
        description: 'Detector de anomalías en tiempo real para logs de seguridad que combina patrones de machine learning con lógica basada en reglas para entregar señales accionables.',
        highlights: [
          'Detección de anomalías en tiempo real',
          'Alertas con contexto',
          'Plantillas de reglas extensibles'
        ]
      }
    }
  }
];
