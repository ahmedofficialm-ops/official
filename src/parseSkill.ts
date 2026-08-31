export function parseSkillMarkdown(raw: string, filePath = 'SKILL.md') {
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

  const related = new Set<string>()
  const relatedSection = body.match(/## Related Skills([\s\S]*?)(?:\n## |\n*$)/)
  if (relatedSection) {
    for (const match of relatedSection[1].matchAll(/\*\*([a-z0-9-]+)\*\*/g)) {
      related.add(match[1])
    }
  }

  return { name, description, version, related: [...related], body }
}
