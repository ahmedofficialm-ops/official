import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export const SITE_TITLE = 'Official — Marketing skills for Cursor and AI agents'
export const SITE_DESCRIPTION =
  "50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines' marketingskills — install from this repo."

const AGENTS_TITLE = 'Cursor marketing subagents | Official'
const AGENTS_DESC =
  '10 Cursor subagents that load marketing playbooks in isolation. CRO, copy, SEO, ads, growth — not all 50 skills in one chat.'

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function DocumentHead({
  skillTitle,
  skillDescription,
}: {
  skillTitle?: string
  skillDescription?: string
}) {
  const { pathname } = useLocation()
  const { name } = useParams()

  useEffect(() => {
    let title = SITE_TITLE
    let description = SITE_DESCRIPTION
    let robots = 'index,follow'

    if (pathname === '/agents') {
      title = AGENTS_TITLE
      description = AGENTS_DESC
    } else if (pathname.startsWith('/skills/')) {
      if (!skillTitle) {
        title = 'Skill not found | Official'
        description = 'That skill is not in the Official catalog.'
        robots = 'noindex,follow'
      } else {
        const raw = `${skillTitle} — Cursor marketing skill | Official`
        title = raw.length > 60 ? `${skillTitle.slice(0, 40)}… | Official` : raw
        const trimmed = (skillDescription ?? '').trim()
        description =
          trimmed.length <= 155 ? trimmed : `${trimmed.slice(0, 152).trim()}…`
      }
    }

    document.title = title
    setMeta('description', description)
    setMeta('robots', robots)
  }, [pathname, name, skillTitle, skillDescription])

  return null
}
