import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { skills } from 'virtual:skills-catalog'
import {
  CATEGORIES,
  INSTALL_COMMAND,
  REPO_URL,
  UPSTREAM_URL,
  categoryFor,
  shortDescription,
} from '../catalog'
import { CopyCommand } from '../components/CopyCommand'

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
      <header className="nav">
        <Link to="/" className="brand">
          Official
        </Link>
        <nav>
          <a href={REPO_URL}>GitHub</a>
          <a href="#install">Install</a>
        </nav>
      </header>

      <section className="hero-block">
        <p className="eyebrow">
          {skills.length} skills · MIT · Cursor, Claude Code, Codex
        </p>
        <h1>
          Marketing skills
          <span>for AI agents</span>
        </h1>
        <p className="lede">
          A deployable catalog of conversion, copy, SEO, ads, and growth
          playbooks. Ask your coding agent to optimize a landing page or write
          a welcome sequence — it loads the matching skill instead of guessing.
        </p>
        <CopyCommand command={INSTALL_COMMAND} />
        <p className="fineprint">
          Skills are a maintained fork of{' '}
          <a href={UPSTREAM_URL}>coreyhaines31/marketingskills</a> (MIT,
          Copyright 2025 Corey Haines). Install from this repo, or clone and
          copy <code>skills/</code> into <code>.agents/skills/</code>.
        </p>
      </section>

      <section id="install" className="panel">
        <h2>Install</h2>
        <ol className="steps">
          <li>
            From a project directory, run{' '}
            <code>{INSTALL_COMMAND}</code>
          </li>
          <li>
            Or clone this repo and copy <code>skills/*</code> into{' '}
            <code>.agents/skills/</code>
          </li>
          <li>
            Create <code>.agents/product-marketing.md</code> first so every
            other skill shares your ICP and positioning
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
          <p className="empty">No skills match that filter.</p>
        ) : null}
      </section>
    </div>
  )
}
