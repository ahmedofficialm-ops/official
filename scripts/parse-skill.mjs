import fs from 'node:fs'
import path from 'node:path'

export function parseSkillMarkdown(raw, filePath = 'SKILL.md') {
  if (!raw.startsWith('---')) {
    throw new Error(`${filePath}: missing YAML frontmatter`)
  }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    throw new Error(`${filePath}: unclosed frontmatter`)
  }
  const fm = raw.slice(4, end)
  const body = raw.slice(end + 4).replace(/^\s*\n/, '')

  const name = fm.match(/^name:\s*["']?([a-z0-9-]+)["']?\s*$/m)?.[1]
  if (!name) throw new Error(`${filePath}: missing name`)

  let description = ''
  const quoted = fm.match(/^description:\s*"([\s\S]*?)"\s*$/m)
  const plain = fm.match(/^description:\s*(.+)\s*$/m)
  if (quoted) description = quoted[1].replaceAll('\\"', '"')
  else if (plain) description = plain[1].replace(/^['"]|['"]$/g, '')
  if (!description) throw new Error(`${filePath}: missing description`)

  const version = fm.match(/version:\s*([0-9.]+)/)?.[1] ?? '0.0.0'

  const related = new Set()
  const relatedSection = body.match(/## Related Skills([\s\S]*?)(?:\n## |\n*$)/)
  if (relatedSection) {
    for (const match of relatedSection[1].matchAll(/\*\*([a-z0-9-]+)\*\*/g)) {
      related.add(match[1])
    }
  }

  return { name, description, version, related: [...related], body }
}

export function loadSkillsFromDir(skillsDir) {
  const names = fs.readdirSync(skillsDir).filter((entry) => {
    const full = path.join(skillsDir, entry)
    return fs.statSync(full).isDirectory()
  })

  return names
    .map((dirName) => {
      const filePath = path.join(skillsDir, dirName, 'SKILL.md')
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing ${filePath}`)
      }
      const parsed = parseSkillMarkdown(fs.readFileSync(filePath, 'utf8'), filePath)
      if (parsed.name !== dirName) {
        throw new Error(`${filePath}: name "${parsed.name}" does not match folder "${dirName}"`)
      }
      return parsed
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
