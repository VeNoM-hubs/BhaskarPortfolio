export type Link = {
  label: string
  href: string
}

export type Project = {
  id: string
  code: string
  title: string
  label: string
  place: string
  when: string
  summary: string
  matters: string
  points: string[]
  tags: string[]
  links: Link[]
}

export type ProcessStep = {
  id: string
  index: string
  title: string
  body: string
}

export type Box = {
  x: number
  y: number
  width: number
  height: number
}

export const profile = {
  name: 'Bhaskar Lukram',
  kicker: 'AI generalist',
  line: 'I find the repetitive part of a creative process and build the smallest AI workflow that removes it.',
  education: 'B.Tech CSE, SRM University · CGPA 8.17 · 2023–2027',
  email: 'lukram01@gmail.com',
  github: 'https://github.com/VeNoM-hubs',
  githubLabel: 'github.com/VeNoM-hubs',
  linkedin: 'https://www.linkedin.com/in/bhaskar-lukram',
  linkedinLabel: 'LinkedIn',
  note: 'Drag the board. The work sits to the right.',
}

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    index: '01',
    title: 'Name the friction',
    body: 'Sit with the people doing the work and name the friction.',
  },
  {
    id: 'step-2',
    index: '02',
    title: 'Try the tool',
    body: 'Try the tool on the real task before recommending it.',
  },
  {
    id: 'step-3',
    index: '03',
    title: 'Ship something openable',
    body: 'Ship a script, prototype, or workflow someone can open and use.',
  },
  {
    id: 'step-4',
    index: '04',
    title: 'Leave the instructions',
    body: 'Leave documentation so the team keeps using it after you leave.',
  },
]

export const projects: Project[] = [
  {
    id: 'neuralyzer',
    code: 'P-01',
    title: 'Neuralyzer',
    label: 'Carnegie Mellon',
    place: 'AI-ML Intern, Carnegie Mellon University',
    when: 'Jun 2026 – Jul 2026',
    summary: 'A speech-and-text model packaged so someone else can run it.',
    matters: 'A trained model is only useful if another person can run it.',
    points: [
      'Rebuilt a HuBERT speech branch and a BERT text branch, aligned them with mutual information (MINE), and fused them with attention.',
      'Followed the published protocol, including six fusion mechanisms and three speech encoders, and reported the mean and spread across five training seeds.',
      'Separated Colab training from a local CPU inference path that runs without the training dependencies.',
    ],
    tags: ['PyTorch', 'HuBERT', 'BERT', 'Evaluation', 'Deployment'],
    links: [
      { label: 'CMU_CNN', href: 'https://github.com/VeNoM-hubs/CMU_CNN' },
      { label: 'CMU_RNN', href: 'https://github.com/VeNoM-hubs/CMU_RNN' },
      { label: 'CMU-testing', href: 'https://github.com/VeNoM-hubs/CMU-testing' },
    ],
  },
  {
    id: 'clinical',
    code: 'P-02',
    title: 'Clinical records to retrieval',
    label: 'ACTREC, Mumbai',
    place: 'AI Engineering Intern, ACTREC, Mumbai',
    when: 'Dec 2025 – Jan 2026',
    summary: 'Unstructured clinical notes turned into records a search system can use.',
    matters: 'Messy human writing becomes a tool when every output is checked.',
    points: [
      'Designed prompt workflows that validate extracted records against the expected structure before they are kept.',
      'Added semantic search and vector embeddings so the same notes can be retrieved and used in a RAG pipeline.',
    ],
    tags: ['Prompting', 'RAG', 'Embeddings', 'Validation'],
    links: [],
  },
  {
    id: 'guardrails',
    code: 'P-03',
    title: 'LLM guardrails',
    label: 'Infopercept',
    place: 'Defensive Security Intern, Infopercept, Ahmedabad',
    when: 'Jun 2025 – Nov 2025',
    summary: 'A check that stops personal and clinical data before an outside model sees it.',
    matters: 'Sensitive details are caught before they reach an external model.',
    points: [
      'Built an NER guardrail that detects PII and PHI and intercepts those entities before external processing.',
      'Added encryption and privacy-aware preprocessing so only sanitized text is ingested.',
    ],
    tags: ['NER', 'Privacy', 'NLP', 'Pipelines'],
    links: [],
  },
  {
    id: 'emotion',
    code: 'P-04',
    title: 'Live emotion engine',
    label: 'Sentiment',
    place: 'Multimodal sentiment analysis',
    when: 'Personal project',
    summary: 'Emotion from live voice and face, using only the frames that have already happened.',
    matters: 'Pictures and time can be read together as a live signal.',
    points: [
      'Fused WavLM speech features with MediaPipe facial features through a temporal GRU.',
      'Kept inference causal, so a prediction never depends on future frames.',
      'Classified six emotional states continuously from live input.',
    ],
    tags: ['WavLM', 'MediaPipe', 'GRU', 'Real-time'],
    links: [],
  },
  {
    id: 'godseye',
    code: 'P-05',
    title: 'GodsEye',
    label: 'Access and monitoring',
    place: 'Cyber-physical security',
    when: 'Personal project',
    summary: 'A door check, a sensor, and a security monitor treated as one system.',
    matters: 'A physical check and a software alert can live in one workflow.',
    points: [
      'Joined RFID and fingerprint authentication with MQTT so physical access shows up as a digital event.',
      'Ran honeypot detection beside Wazuh and Sysmon, covering both decoy traffic and real traffic.',
    ],
    tags: ['ESP32', 'MQTT', 'Wazuh', 'Sysmon'],
    links: [],
  },
  {
    id: 'aaruush',
    code: 'P-06',
    title: 'Aaruush Creatives',
    label: 'Creative team',
    place: 'Committee head, Aaruush',
    when: 'Volunteer',
    summary: 'A twenty-person creative team, from event coverage to the finished picture.',
    matters: 'Creative work ships when a team can share a direction.',
    points: [
      'Led a 20-member team across event coverage, photography, videography, editing, and VFX.',
      'Kept the group aligned on what the coverage needed to look like, then shipped the edits.',
    ],
    tags: ['Direction', 'Photography', 'Video', 'VFX'],
    links: [],
  },
]

export const practiceGroups = [
  { label: 'Languages', items: ['Python', 'SQL', 'C++'] },
  { label: 'Tools', items: ['Docker', 'Git', 'PostgreSQL', 'MySQL'] },
  { label: 'Workflows', items: ['Prompt checks', 'RAG', 'Deployment'] },
]

export const certificates = [
  'GitHub Copilot Certification',
  'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
]

export const teaching = {
  title: 'Desire Society',
  body: 'Taught science and mathematics to orphaned children through interactive learning sessions.',
}

export type GuideStop = {
  id: string
  label: string
  nextLabel: string | null
  focusIds: string[]
  parentId: string | null
}

const projectStops: GuideStop[] = projects.map((project, index) => ({
  id: project.id,
  label: project.title,
  nextLabel: projects[index + 1]?.title ?? 'Contact',
  focusIds: [project.id],
  parentId: 'work',
}))

export const guide: GuideStop[] = [
  {
    id: 'process',
    label: 'How I work',
    nextLabel: 'Name the friction',
    focusIds: ['process'],
    parentId: null,
  },
  ...processSteps.map((step, index) => ({
    id: step.id,
    label: step.title,
    nextLabel: processSteps[index + 1]?.title ?? 'Practice',
    focusIds: [step.id],
    parentId: 'process',
  })),
  {
    id: 'practice',
    label: 'Practice',
    nextLabel: 'Selected work',
    focusIds: ['practice'],
    parentId: null,
  },
  {
    id: 'work',
    label: 'Selected work',
    nextLabel: projects[0]?.title ?? 'Contact',
    focusIds: ['work', ...projects.map((project) => project.id)],
    parentId: null,
  },
  ...projectStops,
  {
    id: 'contact',
    label: 'Contact',
    nextLabel: null,
    focusIds: ['contact'],
    parentId: null,
  },
]

export function guideIndex(id: string) {
  return guide.findIndex((stop) => stop.id === id)
}

const INTRO_W = 540
const INTRO_H = 400
const CONTACT_W = 440
const CONTACT_H = 236
const DETAIL_W = 640
const DETAIL_H = 360
const PROJECT_W = 420
const PROJECT_H = 300

const projectOriginX = 1360
const projectOriginY = -40

export const boxes: Record<string, Box> = {
  intro: { x: 0, y: 0, width: INTRO_W, height: INTRO_H },
  contact: {
    x: (INTRO_W - CONTACT_W) / 2,
    y: -96 - CONTACT_H,
    width: CONTACT_W,
    height: CONTACT_H,
  },
  practice: { x: 0, y: INTRO_H + 240, width: INTRO_W, height: 400 },
  note: { x: INTRO_W + 36, y: -250, width: 220, height: 78 },
  process: { x: -470, y: -10, width: 320, height: 430 },
  work: { x: 660, y: 10, width: 340, height: 430 },
  'step-1': { x: -80, y: 1120, width: DETAIL_W, height: DETAIL_H },
  'step-2': { x: -80, y: 1640, width: DETAIL_W, height: DETAIL_H },
  'step-3': { x: -80, y: 2160, width: DETAIL_W, height: DETAIL_H },
  'step-4': { x: -80, y: 2680, width: DETAIL_W, height: DETAIL_H },
  neuralyzer: { x: projectOriginX, y: projectOriginY, width: PROJECT_W, height: PROJECT_H },
  clinical: { x: projectOriginX + 500, y: projectOriginY, width: PROJECT_W, height: PROJECT_H },
  guardrails: { x: projectOriginX + 250, y: projectOriginY + 380, width: PROJECT_W, height: PROJECT_H },
  emotion: { x: projectOriginX - 220, y: projectOriginY + 180, width: PROJECT_W, height: PROJECT_H },
  godseye: { x: projectOriginX + 760, y: projectOriginY + 200, width: PROJECT_W, height: PROJECT_H },
  aaruush: { x: projectOriginX + 250, y: projectOriginY + 760, width: PROJECT_W, height: PROJECT_H },
}

export function projectById(id: string) {
  return projects.find((project) => project.id === id)
}
