# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-09-06

## Product Overview
**One-liner:** Official is an MIT-licensed marketing skill library and Cursor marketing desk: 50 agent playbooks plus 10 specialist subagents, with a public catalog so you install and invoke only what you need.

**What it does:** This GitHub repo (`ahmedofficialm-ops/official`) vendors Corey Haines' `marketingskills` (upstream 2.11.0, snapshot 2026-08-31) and adds a Vite/React catalog, GitHub Pages deploy, and Cursor routing so one chat does not load all 50 skills. Users install with `npx skills add ahmedofficialm-ops/official` (or copy `skills/` into `.agents/skills/`), open this repo in Cursor, and run `product-marketer` then specialists. The catalog lists every skill with install commands and full `SKILL.md` content.

**Product category:** Marketing skills / playbooks for AI coding agents (Agent Skills spec); Cursor subagent marketing desk; open-source skill catalog.

**Product type:** Open-source GitHub repository + static catalog website (not a hosted SaaS). Compatible with Cursor, Claude Code, Codex, and other agents that support [agentskills.io](https://agentskills.io). Claude Code plugin/marketplace manifests live in `.claude-plugin/`.

**Business model:** MIT-licensed, free to use, copy, and redistribute. No paid plans, seats, or usage metering in this repo. **Unknown:** whether ahmedofficialm-ops will offer paid support, a hosted product, or commercial services later. Do not invent pricing.

**Attribution (required):** Skills and much of the tooling are a maintained fork of [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Copyright 2025 Corey Haines). See `LICENSE`, `NOTICE`, and `vendor/UPSTREAM.md`. The catalog site, packaging, Pages deploy, `AGENTS.md` desk, `.cursor/agents/`, and `.cursor/skills/marketing-desk/` are additional work in this repo. Do **not** claim Corey Haines, Conversion Factory, or Magister as Official, as customers of Official, or as operators of this fork.

## Target Audience
**Target companies:** Early-stage and growth software teams (SaaS, product companies, agencies) whose marketers or founders already work in Cursor or another agent that can load skills. **Unknown:** company size mix, industries served, and geographic focus — no CRM or research file in-repo.

**Decision-makers:** The person who chooses the agent stack and marketing workflow: technical marketers, growth marketers, founder-led GTM. Operator of *this* repo: Mudassar (marketer), GitHub org `ahmedofficialm-ops`. End users of the *library* are anyone who installs the skills into their own project.

**Primary use case:** Get conversion, copy, SEO, ads, and growth help from a coding agent without stuffing 50 playbooks into one context window, and without guessing marketing process from a generic model.

**Jobs to be done:**
- Hire a shared ICP/positioning file (`.agents/product-marketing.md`) so every skill and specialist stays on-message.
- Hire specialist Cursor subagents (CRO, copy, SEO, paid, analytics, growth, GTM, strategy, council) that load only their playbooks.
- Hire a browsable catalog + `npx skills add` so a team can install the full set or a subset (`--skill cro copywriting`) from this GitHub repo.

**Use cases:**
- Clone Official in Cursor and ask “Write homepage copy” or “Audit this landing page for CRO”; parent routes to `copywriter` / `cro-specialist`.
- Install skills into another product repo and create `.agents/product-marketing.md` first.
- Browse https://ahmedofficialm-ops.github.io/official/ (once Pages is enabled) to search the 50 skills by category and copy install commands.
- Claude Code users load the marketplace/plugin from `.claude-plugin/` (plugin name `marketing-skills`, marketplace name `marketingskills`).

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| User (technical / growth marketer in Cursor) | On-brief drafts, playbooks that match CRO/copy/SEO practice, not generic LLM filler | Agent either guesses or loads every skill and degrades | Isolated specialists + 50 sourced playbooks; start with product-marketer |
| Champion (Mudassar / in-house marketer owning the desk) | One repo the team can clone; catalog they can share; honest fork credit | Marketing work scattered; upstream skills exist but Cursor context is a mess | Working marketing desk: `AGENTS.md` + 10 subagents + Pages catalog |
| Decision maker (founder / GTM lead) | Speed to decent marketing artifacts without hiring a full bench | Paying for agencies or waiting on a marketer for every page | Free MIT library; drafts under `marketing/` for git review |
| Technical influencer (engineer / Cursor power user) | Context window, repo hygiene, not 50 skills dumped as Cursor skills | “Install everything” wrecks agent quality | Explicit: do not install every skill as Cursor skills; use subagents or a few `npx skills add` packages |
| Financial buyer | **Unknown** — no paid SKU | N/A until there is a commercial offer | MIT; no license fee |

## Problems & Pain Points
**Core problem:** Coding agents are asked to do marketing (landing pages, SEO, ads, emails) without a shared ICP or specialist process, so output is generic — or the user installs all 50 marketing skills and the agent drowns.

**Why alternatives fall short:**
- Generic ChatGPT/Cursor with no skills: no CRO/copy/SEO playbooks, no shared positioning file.
- Installing all of `marketingskills` as Cursor skills in one project: parent instructions say this overloads context; Official exists to route instead.
- Upstream `coreyhaines31/marketingskills` alone: the playbooks; this fork adds catalog site, Pages URL, org-specific `npx skills add` path, and Cursor subagents. Upstream remains the skill source of truth to credit, not a competitor to smear.
- Random “marketing GPT” prompts and Notion dumps: not Agent Skills spec, not installable, not specialist-routed.

**What it costs them:** Rewriting off-brand copy; bloated agent sessions; inconsistent ICP across CRO vs SEO vs ads; time spent hunting which `SKILL.md` to load.

**Emotional tension:** Doubt that an AI “marketer” knows the product; fear of looking unprofessional; annoyance that 50 skills in one chat feels clever until it fails.

## Competitive Landscape
**Direct:** [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — same 50-skill library (this repo *is* a fork). Falls short *for Official’s operator* only in distribution: no Official catalog site, no `ahmedofficialm-ops` install path, no `.cursor/agents` desk in that upstream snapshot. Credit it; do not position as inferior quality.

**Direct (adjacent):** Other Agent Skills marketing packs and generic skill registries — **Unknown** named alternatives in-repo beyond the Agent Skills spec itself. Falls short when they lack the specialist routing + shared product-marketing context file.

**Secondary:** Loading all marketing knowledge as Cursor rules, MCP docs, or a single mega-prompt — falls short because context is not isolated per specialty.

**Indirect:** Hiring an agency; Conversion Factory / Magister / Corey Haines offerings (whatever form they take) — **Unknown** exact product overlap; we do not sell those brands and must not impersonate them. Human teams and other vendors fall short for users who want in-repo, git-reviewed drafts for free.

**Do not claim:** Corey Haines, Conversion Factory, or Magister as Official’s team, customers, or product names.

## Differentiation
**Key differentiators:**
- 10 Cursor specialist subagents under `.cursor/agents/` so an agent does not load all 50 skills.
- Catalog site (`src/pages/Home.tsx`, `AgentsPage.tsx`, `SkillPage.tsx`) with search, categories, and copy-paste install.
- Install from this GitHub repo: `npx skills add ahmedofficialm-ops/official`.
- Honest attribution (`NOTICE`, homepage fineprint, plugin description).

**How we do it differently:** Parent `AGENTS.md` + `.cursor/skills/marketing-desk/` Task-delegate; `product-marketer` writes `.agents/product-marketing.md` first; specialists load only their `skills/<name>/SKILL.md` lists.

**Why that's better:** Smaller context, on-brand shared ICP, browsable catalog, org-owned fork URL.

**Why customers choose us:** They already want the Haines playbooks *and* a Cursor desk plus a public catalog on `ahmedofficialm-ops`. If they only need upstream skills, they can use Corey Haines’ repo — say that.

## Objections
| Objection | Response |
|-----------|----------|
| “This is just a fork of Corey Haines / marketingskills.” | Yes. MIT fork, Copyright 2025 Corey Haines, upstream 2.11.0. Official adds catalog, Pages, this org’s install command, and Cursor subagents. Credit stays in LICENSE/NOTICE and site copy. |
| “I’ll just install all 50 skills in Cursor.” | README and AGENTS.md say not to. Use the 10 subagents here, or `npx skills add ahmedofficialm-ops/official --skill …` for the few playbooks you need. |
| “Are you Corey Haines / Conversion Factory / Magister / ‘official’ marketingskills?” | No. Product name is Official (this repo). We are not those people or companies. Skills are vendored with MIT attribution. |
| “Why not use upstream only?” | Use upstream if you only need the playbooks. Use this repo if you want the catalog, Pages URL, and specialist routing. |
| “Is the GitHub Pages site live?” | Intended URL: https://ahmedofficialm-ops.github.io/official/. Requires Settings → Pages → GitHub Actions and a successful deploy from `main`. **Unknown:** live status at any given moment. |

**Anti-persona:** Teams that want Official to be Corey Haines, Conversion Factory, or Magister; users who insist on dumping all 50 skills into one Cursor project; people expecting a hosted marketing SaaS, SLAs, or customer logos; anyone who will not keep MIT attribution.

## Switching Dynamics
**Push:** Generic agent marketing output; context collapse from too many skills; no shared ICP file across tasks.

**Pull:** `npx skills add ahmedofficialm-ops/official`; clone-in-Cursor desk; catalog; specialists; MIT.

**Habit:** Pasting briefs into ChatGPT; one mega Cursor rule; installing upstream skills without routing.

**Anxiety:** “Is this unofficial/unlicensed?” (address: MIT + NOTICE). “Will drafts ship without review?” (guardrail: no publish/spend/send without go-ahead; prefer `marketing/` in git). “Will Pages 404?” (Actions + `/official/` base path).

## Customer Language
**How they describe the problem:**
- No customer interviews in-repo. Site/README language to treat as *our* phrasing, not customer verbatim:
- “Ask your coding agent to optimize a landing page or write a welcome sequence — it loads the matching skill instead of guessing.”
- “Specialists not one overloaded agent”
- “one chat does not swallow every skill”

**How they describe us:**
- **Unknown** — no testimonials. Internal names: Official, marketing desk, marketing skills for AI agents.

**Words to use:** Official; marketing skills for AI agents; MIT-licensed fork; Corey Haines / coreyhaines31/marketingskills (when attributing); Cursor subagents; catalog; `npx skills add ahmedofficialm-ops/official`; product-marketer first; Agent Skills spec; 50 skills; 10 specialists.

**Words to avoid:** Claiming Corey Haines, Conversion Factory, or Magister as ours; invented metrics, logos, or quotes; “the official marketingskills product”; implying a paid SaaS; “install every skill into Cursor.”

**Glossary:**
| Term | Meaning |
|------|---------|
| Official | This product/repo (`ahmedofficialm-ops/official`) and catalog brand — not an affiliation claim |
| marketingskills | Upstream library by Corey Haines; vendored into `skills/` |
| product-marketer | Cursor subagent that owns `.agents/product-marketing.md` |
| Marketing desk | Parent routing in `AGENTS.md` + `.cursor/skills/marketing-desk/` |
| Skill | A folder under `skills/<name>/` with `SKILL.md` (Agent Skills spec) |
| Subagent | One of 10 files in `.cursor/agents/` (product-marketer, cro-specialist, copywriter, seo-specialist, paid-media, analytics-specialist, growth-retention, gtm-sales, marketing-strategist, marketing-council) |
| Catalog | Vite React site: Home (search/filter), Agents (roster), Skill (full playbook + install) |

## Brand Voice
**Tone:** Direct, technical-marketer, attribution-honest. Hero copy is short; fineprint credits the fork. Not playful, not enterprise-salesy.

**Style:** Imperative install steps; code in running text (`npx skills add`, `.cursor/agents/`); categories named Conversion, Content & copy, SEO & discovery, Paid & distribution, Measurement, Growth & retention, Sales & GTM, Strategy.

**Personality:** Practical, precise, fork-honest, specialist (not omniscient), git-native.

## Proof Points
**Metrics:** Countable from the repo only: 50 skills in `skills/`; 10 subagents; 8 catalog categories; plugin/marketplace version 2.11.0 matching upstream; npm package version `0.0.0` (private Vite app). **No** conversion rates, user counts, or revenue. Do not invent them.

**Customers:** None to list. Operator: Mudassar (marketer), org `ahmedofficialm-ops`. No logos.

**Testimonials:** None. Do not fabricate.

> No quotes on file.

**Value themes:**
| Theme | Proof |
|-------|-------|
| Isolated specialists | `.cursor/agents/*.md` skill lists; AGENTS.md routing table; Agents page lede |
| Shared ICP | Every specialist/skill instructed to read `.agents/product-marketing.md` first |
| Honest fork | LICENSE copyright Corey Haines 2025; NOTICE; Home fineprint; `vendor/UPSTREAM.md` |
| Discoverable install | `INSTALL_COMMAND` on Home and Skill pages; README; intended Pages URL |

## Goals
**Business goal:** Make Official the installable, attributable marketing desk for `ahmedofficialm-ops` (Mudassar and collaborators): skills in projects, Cursor routing in this repo, catalog on GitHub Pages.

**Conversion action:** (1) Run `npx skills add ahmedofficialm-ops/official` or clone this repo in Cursor. (2) Invoke `product-marketer`, then the matching specialists. Secondary: enable Pages and share https://ahmedofficialm-ops.github.io/official/.

**Current metrics:** **Unknown** — no analytics, star/install counts, or Pages traffic in this context doc. Catalog validation is `npm test` (`scripts/validate-catalog.mjs`). Site local: `npm run dev` → http://localhost:5173.

## Unknowns (do not invent)
- Live GitHub Pages status and traffic
- Install/clone counts, stars, or qualitative customer language
- Commercial roadmap, pricing, or positioning beyond MIT
- Legal relationship (if any) to Conversion Factory or Magister — only instruction is do not claim them
- ICP firmographics beyond “technical marketers and founders using agents”
- Whether Claude Code marketplace listing is published beyond this repo’s manifests

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-09-06) — Initial context auto-drafted from README, NOTICE, catalog site copy, AGENTS.md, and `.cursor/agents/`.
