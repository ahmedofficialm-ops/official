import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { loadSkillsFromDir } from './scripts/parse-skill.mjs'

const root = path.dirname(fileURLToPath(import.meta.url))

function skillsCatalogPlugin(): Plugin {
  const virtualId = 'virtual:skills-catalog'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'skills-catalog',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return
      const skills = loadSkillsFromDir(path.join(root, 'skills')).map(
        ({ name, description, version, related }) => ({
          name,
          description,
          version,
          related,
        }),
      )
      return `export const skills = ${JSON.stringify(skills)}`
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/official/' : '/',
  plugins: [skillsCatalogPlugin(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
