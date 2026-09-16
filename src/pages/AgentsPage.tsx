import { Link } from 'react-router-dom'
import { MARKETING_AGENTS } from '../agents'
import { INSTALL_COMMAND, REPO_URL, UPSTREAM_URL } from '../catalog'
import { DocumentHead } from '../components/DocumentHead'
import { DualCta } from '../components/DualCta'
import { SiteFooter } from '../components/SiteFooter'

export function AgentsPage() {
  return (
    <div className="page">
      <DocumentHead />
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
          Open this repo in Cursor and it loads <code>.cursor/agents/</code>. The
          parent reads <code>AGENTS.md</code> and routes each job so a specialist
          loads only its playbooks. Ask for a landing page and{' '}
          <code>cro-specialist</code> plus <code>copywriter</code> run — not all
          50 skills at once.
        </p>
        <DualCta />
        <ol className="steps">
          <li>
            Open this repository in Cursor (clone{' '}
            <a href={REPO_URL}>{REPO_URL}</a>).
          </li>
          <li>
            Invoke <code>product-marketer</code> so{' '}
            <code>.agents/product-marketing.md</code> exists.
          </li>
          <li>
            Ask for the job (“audit this landing page”, “write homepage copy”);
            the desk routes to a specialist below.
          </li>
        </ol>
        <p className="fineprint">
          Invoke <code>product-marketer</code> first so{' '}
          <code>.agents/product-marketing.md</code> exists. In another project,
          install playbooks with <code>{INSTALL_COMMAND}</code>. The 10
          subagents themselves live in this repository. Playbooks are a
          maintained MIT fork of{' '}
          <a href={UPSTREAM_URL}>coreyhaines31/marketingskills</a> (Copyright
          2025 Corey Haines). Official is this desk and catalog, not Conversion
          Factory or Magister.
        </p>
      </section>

      <ul className="grid">
        {MARKETING_AGENTS.map((agent) => (
          <li key={agent.name}>
            <article className="card agent-card">
              <span className="card-meta">{agent.skills.length} skills</span>
              <strong>{agent.title}</strong>
              <code>{agent.name}</code>
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
      <SiteFooter />
    </div>
  )
}
