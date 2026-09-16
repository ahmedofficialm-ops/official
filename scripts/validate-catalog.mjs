import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSkillsFromDir } from './parse-skill.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skills = loadSkillsFromDir(path.join(root, 'skills'))

if (skills.length !== 50) {
  throw new Error(`Expected 50 skills, found ${skills.length}`)
}

for (const skill of skills) {
  if (skill.description.length < 40) {
    throw new Error(`${skill.name}: description too short`)
  }
  if (skill.body.length < 200) {
    throw new Error(`${skill.name}: body too short`)
  }
}

console.log(`OK: validated ${skills.length} skills`)
console.log(skills.map((s) => `${s.name}@${s.version}`).join('\n'))

const agentsDir = path.join(root, '.cursor/agents')
const agentFiles = fs
  .readdirSync(agentsDir)
  .filter((file) => file.endsWith('.md'))
  .sort()

if (agentFiles.length !== 10) {
  throw new Error(`Expected 10 subagents, found ${agentFiles.length}`)
}

const assigned = new Map()
const skillNames = new Set(skills.map((s) => s.name))

for (const file of agentFiles) {
  const raw = fs.readFileSync(path.join(agentsDir, file), 'utf8')
  const name = raw.match(/^name:\s*([a-z0-9-]+)/m)?.[1]
  if (!name) throw new Error(`${file}: missing name`)
  if (`${name}.md` !== file) {
    throw new Error(`${file}: name "${name}" does not match filename`)
  }
  if (!raw.includes('description:')) {
    throw new Error(`${file}: missing description`)
  }
  const mentioned = [...raw.matchAll(/skills\/([a-z0-9-]+)\/SKILL\.md/g)].map(
    (match) => match[1],
  )
  if (mentioned.length === 0) {
    throw new Error(`${file}: does not reference any SKILL.md`)
  }
  for (const skill of mentioned) {
    if (!skillNames.has(skill)) {
      throw new Error(`${file}: unknown skill ${skill}`)
    }
    const owner = assigned.get(skill)
    if (owner && owner !== name) {
      throw new Error(`skill ${skill} assigned to both ${owner} and ${name}`)
    }
    assigned.set(skill, name)
  }
}

const missing = [...skillNames].filter((skill) => !assigned.has(skill))
if (missing.length) {
  throw new Error(`skills with no subagent: ${missing.join(', ')}`)
}

const desk = path.join(root, '.cursor/skills/marketing-desk/SKILL.md')
if (!fs.existsSync(desk)) {
  throw new Error('missing .cursor/skills/marketing-desk/SKILL.md')
}

console.log(`OK: validated ${agentFiles.length} subagents covering ${assigned.size} skills`)
console.log(
  [...assigned.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([skill, agent]) => `${skill} → ${agent}`)
    .join('\n'),
)
