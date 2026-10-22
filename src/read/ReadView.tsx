import { certificates, practiceGroups, processSteps, profile, projects, teaching } from '../data/portfolio'

export function ReadView() {
  return (
    <main className="read">
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

      <section className="read-section" aria-labelledby="how-heading">
        <h2 id="how-heading">How I work</h2>
        <ol className="steps">
          {processSteps.map((step) => (
            <li key={step.id}>
              <span>{step.index}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="read-section" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work</h2>
        <div className="read-projects">
          {projects.map((project) => (
            <article key={project.id} id={project.id}>
              <p className="kicker">
                <span className="code">{project.code}</span>
                {project.place}
                <span className="when">{project.when}</span>
              </p>
              <h3>{project.title}</h3>
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
                <p className="related">
                  Related code:{' '}
                  {project.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? ', ' : null}
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </span>
                  ))}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="read-section" aria-labelledby="practice-heading">
        <h2 id="practice-heading">Practice</h2>
        <p className="section-lead">Tools I will actually hand over.</p>
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
        <ul className="cert-list">
          {certificates.map((certificate) => (
            <li key={certificate}>{certificate}</li>
          ))}
        </ul>
        <p className="teaching">
          <strong>{teaching.title}.</strong> {teaching.body}
        </p>
      </section>

      <section className="read-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <p className="section-lead">Write to me.</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            {profile.githubLabel}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedinLabel}
          </a>
        </div>
      </section>
    </main>
  )
}
