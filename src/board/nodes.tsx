import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ProjectFlowNode, StepFlowNode } from './graph'
import {
  certificates,
  guideIndex,
  practiceGroups,
  processSteps,
  profile,
  projectById,
  projects,
  teaching,
} from '../data/portfolio'
import { useBoardActions } from './actions'

function GhostHandle({
  type,
  position,
  id,
}: {
  type: 'source' | 'target'
  position: Position
  id: string
}) {
  return <Handle type={type} position={position} id={id} className="ghost-handle" isConnectable={false} />
}

export function IntroNode() {
  const { enter } = useBoardActions()
  return (
    <article className="card card-intro">
      <GhostHandle type="source" position={Position.Left} id="left" />
      <GhostHandle type="source" position={Position.Right} id="right" />
      <GhostHandle type="source" position={Position.Top} id="top" />
      <GhostHandle type="source" position={Position.Bottom} id="bottom" />
      <p className="kicker">
        <span className="copper-dot" />
        {profile.kicker}
      </p>
      <h1>
        {profile.name}
        <span className="period">.</span>
      </h1>
      <p className="lede">{profile.line}</p>
      <p className="meta">{profile.education}</p>
      <button type="button" className="explore-button nodrag nopan" data-cursor="Explore" onClick={() => enter(0)}>
        Explore
      </button>
    </article>
  )
}

export function StepNode({ data }: NodeProps<StepFlowNode>) {
  const step = processSteps.find((item) => item.id === data.stepId)
  if (!step) return null

  return (
    <article className="card card-step card-focus">
      <GhostHandle type="target" position={Position.Top} id="in" />
      <GhostHandle type="source" position={Position.Bottom} id="out" />
      <p className="kicker">Step {step.index}</p>
      <h2>{step.title}</h2>
      <p className="focus-copy">{step.body}</p>
    </article>
  )
}

export function ProcessNode() {
  const { enter } = useBoardActions()
  return (
    <article className="card card-process">
      <GhostHandle type="target" position={Position.Right} id="in" />
      <GhostHandle type="source" position={Position.Bottom} id="down" />
      <header className="process-head">
        <span>P-03</span>
        <span>Process</span>
      </header>
      <ol>
        {processSteps.map((step) => (
          <li key={step.id}>
            <button type="button" className="nodrag nopan" data-cursor="Open" onClick={() => enter(guideIndex(step.id))}>
              <span>{step.index}</span>
              <strong>{step.title}</strong>
              <i className="row-arrow" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
    </article>
  )
}

export function WorkNode() {
  const { enter } = useBoardActions()
  return (
    <article className="card card-work" data-cursor="View work">
      <GhostHandle type="target" position={Position.Left} id="in" />
      <GhostHandle type="source" position={Position.Right} id="out" />
      <p className="kicker">
        <span className="copper-dot" />
        Selected work
      </p>
      <h2>Six things I shipped.</h2>
      <ol>
        {projects.map((project) => (
          <li key={project.id}>
            <button type="button" className="nodrag nopan" onClick={() => enter(guideIndex(project.id))}>
              <i className="row-arrow" aria-hidden="true" />
              <span className="row-label">{project.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </article>
  )
}

export function ProjectNode({ data }: NodeProps<ProjectFlowNode>) {
  const { enter } = useBoardActions()
  const project = projectById(data.projectId)
  if (!project) return null

  return (
    <article
      className="card card-project"
      data-cursor="View"
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onClick={() => enter(data.guideIndex)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          enter(data.guideIndex)
        }
      }}
    >
      <GhostHandle type="target" position={Position.Left} id="in" />
      <p className="kicker">
        <span className="code">{project.code}</span>
        {project.label}
      </p>
      <h2>{project.title}</h2>
      <p className="summary">{project.summary}</p>
      <p className="card-matters">{project.matters}</p>
      <ul className="tags">
        {project.tags.slice(0, 3).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  )
}

export function ContactNode() {
  return (
    <article className="card card-contact">
      <GhostHandle type="target" position={Position.Bottom} id="in" />
      <p className="kicker">
        <span className="copper-dot" />
        Contact
      </p>
      <h2>Write to me.</h2>
      <a className="mail nodrag nopan" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="contact-links">
        <a className="nodrag nopan" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="nodrag nopan" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </article>
  )
}

export function PracticeNode() {
  return (
    <article className="card card-practice">
      <GhostHandle type="target" position={Position.Top} id="in" />
      <p className="kicker">
        <span className="copper-dot" />
        Practice
      </p>
      <h2>Tools I will actually hand over.</h2>
      <div className="practice-grid">
        {practiceGroups.map((group) => (
          <section key={group.label} className="practice-group">
            <h3>{group.label}</h3>
            <ul className="tags">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <ul className="cert-lines">
        {certificates.map((certificate) => (
          <li key={certificate}>{certificate}</li>
        ))}
      </ul>
      <p className="teaching">
        <strong>{teaching.title}.</strong> {teaching.body}
      </p>
    </article>
  )
}

export function NoteNode() {
  return <p className="note-card">{profile.note}</p>
}
