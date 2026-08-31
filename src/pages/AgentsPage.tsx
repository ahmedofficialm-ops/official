import { Link } from 'react-router-dom'
import { MARKETING_AGENTS } from '../agents'
import { INSTALL_COMMAND, REPO_URL } from '../catalog'

export function AgentsPage() {
  return (
    <div className="page">
      <header className="nav">
        <Link to="/" className="brand">
          Official
        </Link>
        <nav>
          <Link to="/">Catalog</Link>
          <a href={REPO_URL}>GitHub</a>
        </nav>
      </header>

      <section className="hero-block">
        <p className="eyebrow">10 Cursor subagents · shared product context</p>
        <h1>
          Specialists
          <span>not one overloaded agent</span>
        </h1>
        <p className="lede">
          Opening this repo in Cursor loads <code>.cursor/agents/</code>. The
          parent desk reads <code>AGENTS.md</code>, then Task-delegates so each
          specialist loads only its playbooks. Ask for a landing page and{' '}
          <code>cro-specialist</code> plus <code>copywriter</code> run — not all
          50 skills at once.
        </p>
        <p className="fineprint">
          First invoke <code>product-marketer</code> so{' '}
          <code>.agents/product-marketing.md</code> exists. Install playbooks
          with <code>{INSTALL_COMMAND}</code> if you are in another project;
          the subagents themselves live in this repository.
        </p>
      </section>

      <ul className="grid">
        {MARKETING_AGENTS.map((agent) => (
          <li key={agent.name}>
            <article className="card agent-card">
              <span className="card-meta">{agent.skills.length} skills</span>
              <strong>
                <code>{agent.name}</code>
              </strong>
              <span>{agent.summary}</span>
              <p className="related">
                {agent.skills.map((skill, index) => (
                  <span key={skill}>
                    {index > 0 ? ', ' : ''}
                    <Link to={`/skills/${skill}`}>{skill}</Link>
                  </span>
                ))}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
