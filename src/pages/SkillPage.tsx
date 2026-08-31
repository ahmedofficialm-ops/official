import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { skills } from 'virtual:skills-catalog'
import { INSTALL_COMMAND, categoryFor } from '../catalog'
import { CopyCommand } from '../components/CopyCommand'
import { parseSkillMarkdown } from '../parseSkill'

const skillFiles = import.meta.glob('../../skills/*/SKILL.md', {
  query: '?raw',
  import: 'default',
})

export function SkillPage() {
  const { name } = useParams()
  const summary = skills.find((item) => item.name === name)
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setHtml(null)
    setError(null)
    if (!name) return

    const key = `../../skills/${name}/SKILL.md`
    const loader = skillFiles[key]
    if (!loader) {
      setError('missing')
      return
    }

    loader()
      .then((raw) => {
        if (cancelled) return
        const parsed = parseSkillMarkdown(String(raw), key)
        const rendered = marked.parse(parsed.body, { async: false }) as string
        setHtml(rendered)
      })
      .catch(() => {
        if (!cancelled) setError('load')
      })

    return () => {
      cancelled = true
    }
  }, [name])

  if (!summary || error === 'missing') {
    return (
      <div className="page">
        <header className="nav">
          <Link to="/" className="brand">
            Official
          </Link>
        </header>
        <section className="hero-block">
          <h1>Skill not found</h1>
          <p>
            No skill named <code>{name}</code>.{' '}
            <Link to="/">Back to catalog</Link>
          </p>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="nav">
        <Link to="/" className="brand">
          Official
        </Link>
        <nav>
          <Link to="/">Catalog</Link>
        </nav>
      </header>
      <section className="skill-hero">
        <p className="eyebrow">
          {categoryFor(summary.name)} · v{summary.version}
        </p>
        <h1>{summary.name}</h1>
        <p className="lede">{summary.description}</p>
        <CopyCommand command={`${INSTALL_COMMAND} --skill ${summary.name}`} />
        {summary.related.length > 0 ? (
          <p className="related">
            Related:{' '}
            {summary.related.map((rel, index) => (
              <span key={rel}>
                {index > 0 ? ', ' : ''}
                <Link to={`/skills/${rel}`}>{rel}</Link>
              </span>
            ))}
          </p>
        ) : null}
      </section>
      {error === 'load' ? (
        <p className="empty">Could not load this skill file.</p>
      ) : html ? (
        <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="empty">Loading playbook…</p>
      )}
    </div>
  )
}
