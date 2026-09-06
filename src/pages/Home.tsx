import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { skills } from 'virtual:skills-catalog'
import { MARKETING_AGENTS } from '../agents'
import {
  CATEGORIES,
  INSTALL_COMMAND,
  REPO_URL,
  UPSTREAM_URL,
  categoryFor,
  shortDescription,
} from '../catalog'
import { CopyCommand } from '../components/CopyCommand'
import { DocumentHead } from '../components/DocumentHead'
import { DualCta } from '../components/DualCta'
import { SiteFooter } from '../components/SiteFooter'

export function Home() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const category = categoryFor(skill.name)
      if (active !== 'all' && category !== active) return false
      if (!q) return true
      const summary = shortDescription(skill.description).toLowerCase()
      return (
        skill.name.includes(q) ||
        category.toLowerCase().includes(q) ||
        summary.includes(q)
      )
    })
  }, [query, active])

  return (
    <div className="page">
      <DocumentHead />
      <header className="nav">
        <Link to="/" className="brand">
          Official
        </Link>
        <nav>
          <Link to="/agents">Agents</Link>
          <a href={REPO_URL}>GitHub</a>
          <a href="#install">Install</a>
        </nav>
      </header>

      <section className="hero-block">
        <p className="eyebrow">50 skills · 10 specialists · MIT</p>
        <h1>
          Marketing skills
          <span>for AI agents</span>
        </h1>
        <p className="lede">
          Conversion, copy, SEO, ads, and growth playbooks your coding agent can
          load on demand. Works with Cursor, Claude Code, Codex, and other Agent
          Skills clients. Ask for a landing-page audit or a welcome sequence — it
          loads the matching skill instead of guessing, or stuffing all 50 into
          one chat.
        </p>
        <DualCta />
        <p className="fineprint">
          Skills are a maintained MIT fork of{' '}
          <a href={UPSTREAM_URL}>coreyhaines31/marketingskills</a> (Copyright
          2025 Corey Haines). Official adds this catalog, GitHub Pages
          packaging, and the Cursor desk in this repo. We are not Corey Haines,
          Conversion Factory, or Magister. Use upstream if you only need the
          playbooks.
        </p>
      </section>

      <section className="panel" id="agents">
        <h2>Cursor specialists</h2>
        <p className="lede">
          Ten subagents under <code>.cursor/agents/</code>. Clone this repo in
          Cursor and ask for homepage copy or a CRO audit. The desk in{' '}
          <code>AGENTS.md</code> routes the work so one chat does not swallow
          every skill.
        </p>
        <ul className="agent-list">
          {MARKETING_AGENTS.map((agent) => (
            <li key={agent.name}>
              {agent.title} — <code>{agent.name}</code> — {agent.summary}
            </li>
          ))}
        </ul>
        <p>
          <Link to="/agents">See the full roster and skill map</Link>
        </p>
      </section>

      <section id="install" className="panel">
        <h2>Install in your project</h2>
        <ol className="steps">
          <li>
            In the repo you market from, run{' '}
            <CopyCommand command={INSTALL_COMMAND} /> Need only a few playbooks?
            Add <code>--skill cro copywriting</code> (swap names as needed).
          </li>
          <li>
            Write <code>.agents/product-marketing.md</code> first — who you sell
            to, voice, and claims you will not invent — so CRO, copy, and SEO
            share one brief.
          </li>
          <li>
            Invoke <code>product-marketer</code>, then the specialist for the
            job. For the 10 Cursor subagents, clone this repo. Do not install
            all 50 skills as Cursor skills in one project.
          </li>
        </ol>
      </section>

      <section className="catalog">
        <div className="catalog-head">
          <h2>Skill catalog</h2>
          <input
            type="search"
            placeholder="Search skills…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search skills"
          />
        </div>
        <p className="lede">
          Fifty installable skills, eight categories. Open a card for the full
          playbook and a per-skill install command.
        </p>
        <div className="chips" role="tablist" aria-label="Skill categories">
          <button
            type="button"
            className={active === 'all' ? 'chip on' : 'chip'}
            onClick={() => setActive('all')}
          >
            All ({skills.length})
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={active === category.label ? 'chip on' : 'chip'}
              onClick={() => setActive(category.label)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <p className="count">
          {filtered.length} skill{filtered.length === 1 ? '' : 's'}
        </p>
        <ul className="grid">
          {filtered.map((skill) => (
            <li key={skill.name}>
              <Link to={`/skills/${skill.name}`} className="card">
                <span className="card-meta">
                  {categoryFor(skill.name)} · v{skill.version}
                </span>
                <strong>{skill.name}</strong>
                <span>{shortDescription(skill.description)}</span>
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length === 0 ? (
          <p className="empty">
            No skills match that filter.{' '}
            <button
              type="button"
              className="chip"
              onClick={() => {
                setQuery('')
                setActive('all')
              }}
            >
              Clear search and filters
            </button>
          </p>
        ) : null}
        <div className="panel after-grid">
          <p className="cta-label">Install the set</p>
          <CopyCommand command={INSTALL_COMMAND} />
          <p className="cta-secondary">
            or <Link to="/agents">open the specialist roster</Link> ·{' '}
            <a href={REPO_URL}>GitHub</a>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
