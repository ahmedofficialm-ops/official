# Official

Marketing skills for AI agents — a deployable catalog and MIT-licensed skill library for Cursor, Claude Code, Codex, and other agents that support the [Agent Skills spec](https://agentskills.io).

This repository vendors [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Copyright 2025 Corey Haines) and ships a public catalog site plus GitHub Pages deployment.

## Install the skills

```bash
npx skills add ahmedofficialm-ops/official
```

Specific skills:

```bash
npx skills add ahmedofficialm-ops/official --skill cro copywriting
```

Or copy `skills/` into `.agents/skills/` in any project.

Start with `product-marketing` so other skills share one ICP and positioning file at `.agents/product-marketing.md`.

## Cursor subagents

This repo is the working marketing desk. Cursor picks up:

| Path | Role |
| --- | --- |
| `AGENTS.md` | Parent routing: who to spawn |
| `.cursor/skills/marketing-desk/` | Skill that triggers that routing |
| `.cursor/agents/*.md` | 10 specialists with isolated context |

Ask in Cursor: “Write homepage copy” or “Audit this landing page for CRO.” The parent should run `product-marketer` if context is missing, then `copywriter` / `cro-specialist` rather than loading all 50 playbooks.

Do **not** install every skill into a single project as Cursor skills. Use the subagents here, or install only the few `npx skills add` packages you need.

## Catalog site

```bash
npm ci
npm test
npm run dev
```

The site runs at http://localhost:5173 and lists all 50 skills with install commands and full `SKILL.md` content.

Production build:

```bash
npm run build
npm run preview
```

## Deploy

GitHub Actions publishes the catalog to GitHub Pages on push to `main`.

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Merge to `main` (or run the **Deploy GitHub Pages** workflow)
3. Site URL: https://ahmedofficialm-ops.github.io/official/

The Pages build sets `GITHUB_PAGES=true` so Vite uses the `/official/` base path.

## Layout

| Path | Purpose |
| --- | --- |
| `skills/` | Agent skills (`SKILL.md` per skill) |
| `.cursor/agents/` | Cursor specialist subagents |
| `.cursor/skills/marketing-desk/` | Orchestrator skill |
| `AGENTS.md` | Parent delegation rules |
| `tools/` | CLI helpers and integration notes from upstream |
| `.claude-plugin/` | Claude Code marketplace / plugin manifests |
| `src/` | Catalog website |
| `scripts/` | Skill frontmatter parser and catalog validation |

## License

MIT. See `LICENSE` and `NOTICE`.
