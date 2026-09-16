export function parseSkillMarkdown(
  raw: string,
  filePath?: string,
): {
  name: string
  description: string
  version: string
  related: string[]
  body: string
}

export function loadSkillsFromDir(skillsDir: string): Array<{
  name: string
  description: string
  version: string
  related: string[]
  body: string
}>
