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
