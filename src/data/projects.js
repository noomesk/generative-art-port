export const projects = [
  {
    id: 'portfolio-qna-agent',
    title: 'Portfolio Q&A Agent',
    role: 'AI Engineer • RAG',
    category: ['AI Agents', 'RAG'],
    featured: true,
    problem: 'Recruiters want to quickly understand stack, projects and focus without reading the whole site.',
    solution: 'Terminal-style Q&A agent grounded on portfolio/CV data with a RAG-inspired retrieval layer. Designed to demonstrate context-aware answers over generic chat.',
    description: 'Terminal-style portfolio assistant that answers questions about stack, projects, AI work and experience using grounded context.',
    tags: ['Vercel AI SDK', 'Groq', 'RAG', 'Agents', 'TypeScript'],
    link: '#portfolio-agent',
    github: 'https://github.com/noomesk/generative-art-port',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2026',
    highlights: [
      'Grounded on portfolio data (context-first)',
      'Terminal UX matching the site aesthetic',
      'Extensible to embeddings + vector store',
      'Demonstrates tool/agent mindset'
    ]
  },
  {
    id: 'cellular-automata-engine',
    title: 'Cellular Automata Engine',
    role: 'Creative Coder • Frontend Engineering',
    category: ['Creative Coding', 'WebGL'],
    featured: true,
    problem: 'Render millions of cellular automata cells in real-time without sacrificing FPS.',
    solution: 'Built a WebGL + GLSL rendering pipeline with a custom grid, optimized draw calls and configurable rule sets to explore emergent behaviors.',
    description: 'A high-performance WebGL cellular automata simulator capable of rendering millions of cells in real time. Explore emergent behaviors through custom rule sets.',
    tags: ['WebGL', 'GLSL', 'TypeScript'],
    link: 'https://cellular-automata-audio.vercel.app/',
    github: 'https://github.com/noomesk/cellular_automata_engine',
    status: 'live',
    focusCategories: ['cr', 'fs'],
    year: '2025',
    highlights: [
      'GPU-accelerated rendering with fragment shaders',
      'Configurable rule sets for emergent behavior',
      'Performance-focused architecture for large grids'
    ]
  },
  {
    id: 'ai-code-assistant',
    title: 'AI Code Assistant',
    role: 'AI Engineer • Frontend',
    category: ['AI Agents', 'Frontend'],
    featured: true,
    problem: 'Speed up component refactoring by surfacing actionable suggestions aligned to an existing design system.',
    solution: 'Integrated Groq + Llama 3.1 with component analysis to suggest Tailwind/Material UI-aligned refactors, wrapped in an immersive 3D WebGL experience.',
    description: 'An AI-powered development tool that analyzes React components and provides real-time refactoring suggestions to align code with design systems like Tailwind CSS and Material UI, set within an immersive environment featuring an interactive 3D point-cloud wasp.',
    tags: ['Next.js', 'React', 'Groq API', 'Llama 3.1', 'Three.js'],
    link: 'https://asesor-de-codigo.vercel.app/ai-code-advisor.html',
    github: 'https://github.com/noomesk/asesor-de-codigo',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2025',
    highlights: [
      'LLM orchestration with real-time suggestions',
      'Design-system aware prompting',
      'Immersive 3D UI built with Three.js'
    ]
  },
  {
    id: 'anxiety-companion',
    title: 'Anxiety Companion',
    role: 'AI Product • Full-Stack',
    category: ['AI Agents', 'Full-Stack'],
    featured: true,
    problem: 'Need a safe, accessible support space between therapy sessions with practical guardrails.',
    solution: 'LLM-powered empathetic chatbot with crisis detection, guided exercises, contextual memory, JWT auth and a FastAPI + React stack built with scalability in mind.',
    description: 'An emotional support app designed to be used between therapy sessions. It combines an LLM-powered empathetic chatbot, automatic crisis detection, guided therapeutic exercises, and contextual user memory — all built on a FastAPI + React architecture ready to scale.',
    tags: ['FastAPI', 'React', 'SQLite', 'Groq API', 'JWT', 'TypeScript'],
    link: 'https://app-anxiety-frontend.onrender.com/',
    github: 'https://github.com/noomesk/app_anxiety',
    status: 'live',
    focusCategories: ['ai', 'fs'],
    year: '2025',
    highlights: [
      'Contextual memory per user session',
      'Crisis-aware flows with safety considerations',
      'Full-stack auth + REST architecture'
    ]
  },
  {
    id: 'bioacoustic-soundscapes',
    title: 'Bioacoustic Soundscapes',
    role: 'Data + Creative Coding',
    category: ['Creative Coding', 'Data'],
    featured: false,
    problem: 'Make biodiversity data audible and visual by turning raw field recordings into interpretable insights.',
    solution: 'Processing pipeline to generate spectrograms and interactive acoustic landscapes to analyze bioacoustic patterns.',
    description: 'A sound data processing tool that visualizes spectrograms and acoustic landscapes to analyze biodiversity through sound.',
    tags: ['React', 'Python', 'Audio Processing'],
    link: '#',
    github: '#',
    status: 'in-progress',
    focusCategories: ['cr', 'ai'],
    year: '2026',
    highlights: [
      'Spectrogram generation from audio',
      'Bridging biology + creative visualization',
      'Exploring ML for acoustic classification'
    ]
  },
  {
    id: 'genome-cleaner',
    title: 'Genome Cleaner',
    role: 'Bioinformatics Tooling',
    category: ['Bioinformatics', 'CLI'],
    featured: false,
    problem: 'Cleaning FASTA/FASTQ sequences is repetitive and error-prone for bioinformatic workflows.',
    solution: 'Lightweight CLI/processor to sanitize, format and normalize biological sequence strings with a focus on speed and clarity.',
    description: 'A high-efficiency processor for cleaning and formatting biological sequence strings in FASTA and FASTQ formats, streamlining bioinformatic workflows.',
    tags: ['Node.js', 'CLI', 'Bioinformatics'],
    link: 'https://genomecleaner.streamlit.app/',
    github: 'https://github.com/noomesk/genome-cleaner',
    status: 'live',
    focusCategories: ['fs'],
    year: '2025',
    highlights: [
      'Streamlines repetitive bioinformatics cleanup',
      'Pragmatic CLI for real workflows',
      'Bridges CS + life sciences'
    ]
  },
  {
    id: 'interactive-fashion-gallery',
    title: 'Interactive Fashion Gallery',
    role: 'Frontend • UX Engineering',
    category: ['Frontend', 'UX'],
    featured: false,
    problem: 'Showcase a fashion collection with a focus on mood and motion without sacrificing performance.',
    solution: 'Responsive, fluid gallery with curated navigation and animation to drive exploration and product discovery.',
    description: 'A visual e-commerce platform where users explore styles, browse collections, and shop. Designed around visual experience and fluid navigation.',
    tags: ['React', 'Node.js', 'REST API', 'TypeScript'],
    link: 'https://endmoda.vercel.app/',
    github: 'https://github.com/noomesk/Endmoda',
    status: 'live',
    focusCategories: ['fs', 'cr'],
    year: '2024',
    highlights: [
      'Motion-driven UX with Framer Motion',
      'Performance-conscious animations',
      'Strong visual identity'
    ]
  }
];
