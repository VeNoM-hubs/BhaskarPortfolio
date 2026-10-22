import { useEffect, useRef } from 'react'
import { projectById } from './data/portfolio'

type DetailProps = {
  projectId: string
  onClose: () => void
}

export function Detail({ projectId, onClose }: DetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const project = projectById(projectId)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    return () => {
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [projectId])

  if (!project) return null

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <aside
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          Close
        </button>
        <p className="kicker">
          <span className="code">{project.code}</span>
          {project.when}
        </p>
        <h2 id="detail-title">{project.title}</h2>
        <p className="place">{project.place}</p>
        <p className="matters">{project.matters}</p>
        <p>{project.summary}</p>
        <ul className="points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.links.length > 0 ? (
          <div className="related">
            <p>Related code</p>
            <div className="contact-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  )
}
