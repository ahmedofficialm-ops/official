# Catalog CRO brief — Home, Agents, Skill

**Page types:** Homepage catalog (`src/pages/Home.tsx`), specialist roster (`src/pages/AgentsPage.tsx`), skill detail (`src/pages/SkillPage.tsx`). Shared install control: `src/components/CopyCommand.tsx`.

**Primary conversion:** Copy/run `npx skills add ahmedofficialm-ops/official` **and/or** clone `https://github.com/ahmedofficialm-ops/official` in Cursor and use subagents. Secondary: install one skill (`--skill <name>`), then create `.agents/product-marketing.md`.

**Traffic:** GitHub README + Cursor users + technical marketers. Dark static catalog. No analytics in-repo — **do not invent conversion rates, stars, or install counts.**

**Analyst stance:** Structure, value-prop clarity, CTA hierarchy, friction, and trust (fork attribution **must stay**). Counts used below are repo-true: 50 skills, 10 subagents, 8 categories.

---

## Diagnosis (what is true on the current pages)

### Value proposition (5-second test)

Home H1 is category-correct (`Marketing skills` / `for AI agents`) but does not name the **job**: isolated specialists + installable playbooks so one chat does not load all 50. The lede explains “loads the matching skill instead of guessing” — good for the **npx-into-another-project** path — and never states the **clone-this-repo desk** path in the hero.

Agents H1 (`Specialists` / `not one overloaded agent`) is the stronger differentiator and currently lives one click away.

### Two jobs, one CTA

| Job | Who | Current UI |
| --- | --- | --- |
| A. Install playbooks into **another** project | Technical marketer already in their product repo | Hero `CopyCommand` + duplicate `#install` list with the same command as dead `<code>` |
| B. Clone **this** repo and run Cursor subagents | Someone who wants the desk | Buried in Home fineprint (“Cursor subagents in this repo…”) and Agents lede. **No** `CopyCommand`, **no** GitHub clone CTA on Agents. Nav GitHub is a text link, not a conversion control |

`MARKETING_AGENTS[].title` exists in `src/agents.ts` (`CRO specialist`, `Copywriter`, …) and is **never rendered** on Home or Agents — cards show only `agent.name` in `<code>`.

### CTA hierarchy

- Home primary: `CopyCommand` with button label **Copy** (action, not outcome). Clipboard failure in `CopyCommand.tsx` is silent (`catch { setCopied(false) }`).
- Nav `#install` jumps to a second copy of the same command that is **not** copyable.
- Install step 3 (create `product-marketing.md`) is activation, not install — easy to skip; no example invoke.
- Skill page primary is correct (`INSTALL_COMMAND --skill ${name}`) but the lede dumps full YAML `description` (trigger phrases, “also use when…”). Cards already use `shortDescription()`; the detail page does not.
- Catalog grid is a research sink with **no** repeat CTA after the grid.
- Agents page has **zero** primary conversion control.

### Trust / objections

Home fineprint correctly credits `coreyhaines31/marketingskills`, MIT, Copyright 2025 Corey Haines. Keep it. Agents and Skill pages do **not** repeat attribution (Skill can look like original Official IP). Site never says “do not install all 50 as Cursor skills” (README does). Brand “Official” is not disambiguated from “the official marketingskills product.”

### Friction

- Path confusion: npx vs clone vs copy `skills/` vs Claude plugin (plugin is undocumented on the site).
- Agents: `product-marketer` first is fineprint, not a step.
- Search/filter: no chip counts except All; empty state has no “Clear filters”; search does not include agent names.
- Skill 404 and load error: no install CTA, Skill 404 nav missing Agents/GitHub.
- No footer: MIT + GitHub + install disappear after scroll.

---

## 1. Quick wins (ship in code this session)

Parent implements in `src/`. Do **not** invent logos, quotes, or metrics. Keep dark catalog styling (`src/App.css` tokens).

### 1.1 Home hero — two explicit paths (`src/pages/Home.tsx`)

Replace the single unlabeled `CopyCommand` with a **labeled primary + secondary**. Suggested markup (parent may class-name as needed; add CSS in `src/App.css`):

```tsx
<div className="cta-row">
  <div className="cta-primary">
    <p className="cta-label">In another project</p>
    <CopyCommand command={INSTALL_COMMAND} />
  </div>
  <p className="cta-secondary">
    <a href={REPO_URL}>Clone this repo in Cursor</a>
    {' '}for the 10 subagents (do not install all 50 skills into one Cursor project).
  </p>
</div>
```

**Copy to drop in for H1 / lede** — ship **Alternative A** from §4 unless copywriter picks another. Keep eyebrow (`{skills.length} skills · MIT · Cursor, Claude Code, Codex`) — those counts are real.

**Fineprint:** keep the existing Corey Haines / MIT sentence **verbatim in meaning**. You may add one clause after it, not instead of it:

> Official is this repo (`ahmedofficialm-ops/official`), not Corey Haines, Conversion Factory, or Magister.

Do not remove the upstream link or copyright year.

### 1.2 Deduplicate Install panel (`src/pages/Home.tsx` `#install`)

Rewrite the `<ol className="steps">` so it is **not** a second paste of the hero command. Target copy:

1. **Other project:** run the command in the hero (do not repeat raw `INSTALL_COMMAND` without `CopyCommand`; if you keep a command here, reuse `<CopyCommand command={INSTALL_COMMAND} />`).
2. **This desk:** clone `{REPO_URL}`, open in Cursor, ask in chat — parent reads `AGENTS.md` and routes. One line: do **not** add every folder under `skills/` as Cursor skills.
3. **Either path:** create `.agents/product-marketing.md` first (invoke `product-marketer` in this repo, or the `product-marketing` skill after npx).

Remove nav hash `#install` **or** keep it but point at this clarified list, not a clone of the hero.

### 1.3 Repeat CTA after catalog (`src/pages/Home.tsx`)

After the `<ul className="grid">` / empty state, add a slim panel:

> Install the set: `<CopyCommand command={INSTALL_COMMAND} />` · or `<Link to="/agents">open the specialist roster</Link>` · `<a href={REPO_URL}>GitHub</a>`

### 1.4 Agents page — add the missing conversion (`src/pages/AgentsPage.tsx`)

Immediately under the lede (before the grid), add the same dual CTA as Home:

- `<CopyCommand command={INSTALL_COMMAND} />` with label **Playbooks in another project**
- `<a href={REPO_URL}>Clone / open this repo in Cursor</a>` with label **Use these 10 subagents**

Move “First invoke `product-marketer`…” out of `.fineprint` into a 3-step list:

1. Open this repository in Cursor (clone `{REPO_URL}`).
2. Invoke `product-marketer` so `.agents/product-marketing.md` exists.
3. Ask for the job (“audit this landing page”, “write homepage copy”); desk routes to the specialist below.

Keep a **short** fineprint under that: npx command if they are not in this repo; subagents live **here**. Add one attribution line (can be shorter than Home):

> Playbooks are a maintained MIT fork of [coreyhaines31/marketingskills]({UPSTREAM_URL}) (Copyright 2025 Corey Haines). Import `UPSTREAM_URL` from `../catalog`.

Nav: add the same `Install` hash only if Home keeps `#install`; otherwise add `<a href={REPO_URL}>GitHub</a>` (already present) plus `<Link to="/">Catalog</Link>` (already present). Optional: `<a href={REPO_URL}>Clone</a>` is redundant if the hero CTA exists — skip.

### 1.5 Render `agent.title` (`src/pages/AgentsPage.tsx` and Home subagent list)

Agents cards today:

```tsx
<strong><code>{agent.name}</code></strong>
<span>{agent.summary}</span>
```

Change to:

```tsx
<span className="card-meta">{agent.skills.length} skills</span>
<strong>{agent.title}</strong>
<code>{agent.name}</code>
<span>{agent.summary}</span>
```

On Home `<ul className="agent-list">`, use:

`{agent.title} — <code>{agent.name}</code> — {agent.summary}`

Do not drop `agent.name`; that is the invoke string.

### 1.6 `CopyCommand` friction (`src/components/CopyCommand.tsx`)

- Button default label: **Copy command** (not `Copy`). Copied state: **Copied**.
- `aria-label={`Copy ${command}`}` on the button.
- On `clipboard` failure: select the `<code>` text (range / `window.getSelection`) so GitHub Pages over HTTP or denied clipboard still converts.
- Optional prop `label?: string` if Home/Agents want “Copy install command” vs Skill “Copy this skill”.

No new analytics events this session unless analytics-specialist adds them.

### 1.7 Skill page lede + trust (`src/pages/SkillPage.tsx`)

- Lede: `{shortDescription(summary.description)}` — import `shortDescription` from `../catalog`. Full playbook stays in the markdown article.
- Under `CopyCommand`, one line: **Do not install all 50.** This command adds `{summary.name}` only.
- Nav: add `<a href={REPO_URL}>GitHub</a>` (import `REPO_URL`) for parity with Home.
- 404 / load error: include `<Link to="/">Back to catalog</Link>` (404 already has it) plus Agents + GitHub on 404 header.
- Optional one-liner under related skills: attribution only if you add a site-wide footer; otherwise Skill can inherit footer (1.8).

### 1.8 Minimal footer on all three pages

Same three links, no extra marketing:

`MIT` · fork of [coreyhaines31/marketingskills](UPSTREAM_URL) · [GitHub](REPO_URL)

Implementation: small `<footer className="site-footer">` duplicated in the three page files **or** a new `src/components/SiteFooter.tsx` — parent’s call; do not invent extra columns.

### 1.9 Empty catalog state (`src/pages/Home.tsx`)

When `filtered.length === 0`, add a button `type="button"` that sets `query` to `''` and `active` to `'all'`. Copy: **Clear search and filters**.

### CSS notes (`src/App.css`)

- `.cta-row` / `.cta-label`: label in `--muted` or `--accent-2`, 13px mono, above the command box. Secondary link on its own line under the command (not competing gold buttons).
- `.cta-secondary` uses default `a` accent; **do not** add a second filled button that visually ties with Copy.
- Footer: `margin-top: 48px`, `--muted`, 14px — match `.fineprint`.
- Agent cards: `code` under `strong` should stay `--text-h` / existing `code` styles; no new palette.

---

## 2. High-impact changes (after this session)

Not required for the parent’s first patch. Larger than a copy tweak.

1. **Path chooser as two cards in the Home hero** — “Install skills in my repo” vs “Open the marketing desk.” Each card has one CTA. Highest clarity for mixed GitHub vs Cursor traffic. Risk: more chrome on a dense page; test (§3).

2. **Map each skill to its specialist on `SkillPage`** — e.g. `cro` → `cro-specialist`. Data already in `src/agents.ts`. Copy: “In this repo, invoke `<code>cro-specialist</code>` instead of loading this file as a Cursor skill.” Converts researchers who landed on a playbook into Job B.

3. **Sticky or nav-level install** — persistent `CopyCommand` or “Copy install” in `.nav` so catalog scavengers still convert. Risk: noisy on Skill pages where the command is `--skill` specific; use full-library command in nav, skill command in hero.

4. **Activation after copy** — post-copy helper text (not a modal): “Then add `.agents/product-marketing.md` (or run `product-marketer` in this repo).” This is the real second conversion; install without ICP re-creates the generic-output problem.

5. **Claude Code path** — one line + link to `.claude-plugin/` / marketplace name `marketingskills` **with** the same fork attribution. Only if you confirm you will not imply a published marketplace listing (context: **Unknown** whether listing is live).

6. **Search agents from Home** — include `MARKETING_AGENTS` names/titles/summaries in filter or a toggle. Reduces “I want CRO, why is the specialist on another URL?”

7. **Instrument later** (analytics-specialist): `copy_install` (location: hero | footer | skill | agents), `click_github`, `click_agents`, `catalog_search`. No rates until that exists.

---

## 3. Test ideas (untested hypotheses)

No baseline. Treat as hypotheses; do not run live experiments without analytics-specialist / ab-testing. Label every test **untested**.

| ID | Hypothesis (untested) | Variant |
| --- | --- | --- |
| T1 | A headline that names “50 playbooks, 10 specialists” will outperform the current category H1 for GitHub visitors who already know Agent Skills | Current vs §4 B |
| T2 | Dual-path hero (npx + clone) will increase *completed* Job B without reducing copy clicks vs npx-only | Current vs §1.1 |
| T3 | Putting the catalog grid **above** Subagents will increase skill-page views but decrease copy clicks (research sink) | Section order swap |
| T4 | Skill-page lede as `shortDescription` will increase `--skill` copy vs full YAML description | Current vs §1.7 |
| T5 | Button label “Copy install command” vs “Copy command” vs “Copy” — longer label reduces mis-clicks / increases copies | CopyCommand labels |
| T6 | Showing `agent.title` plus invoke name increases Agents → GitHub/clone vs code-only names | §1.5 |
| T7 | Repeating CopyCommand below the grid recovers copies from deep scrollers | §1.3 |
| T8 | Sticky nav copy control increases copies from category-chip users | High-impact #3 |

Do **not** test: removing attribution, fake testimonials, “official marketingskills” branding, or “install everything.”

---

## 4. Copy alternatives

Ship **A** this session if parent needs a default. B/C are for copywriter / later tests. Voice: direct, technical-marketer, not playful, not enterprise-salesy. No invented metrics.

### Home headline

**Current:** `Marketing skills` + span `for AI agents`

| ID | Copy | Rationale |
| --- | --- | --- |
| A (ship) | `Marketing skills` / `isolated, not dumped in one chat` | Keeps the catalog noun; second line states the actual differentiator vs upstream-only and vs “install all 50.” |
| B | `50 marketing playbooks` / `10 specialists for Cursor` | Specific, countable, matches traffic that wants numbers. Slightly more product-y; still true. |
| C | `Install the playbooks.` / `Route the specialists.` | Imperative, two jobs in two lines. May under-explain for cold visitors who do not know Agent Skills. |

### Home lede

**Current:** “A deployable catalog of conversion, copy, SEO, ads, and growth playbooks. Ask your coding agent to optimize a landing page or write a welcome sequence — it loads the matching skill instead of guessing.”

| ID | Copy | Rationale |
| --- | --- | --- |
| A (ship) | `MIT catalog of conversion, copy, SEO, ads, and growth playbooks — plus 10 Cursor subagents so one chat does not load all 50. Install into your project, or clone this repo and ask for a landing-page audit; the desk routes to cro-specialist and copywriter.` | Names both conversions, the pain (context dump), and a concrete ask. Still technical. |
| B | `Stop stuffing 50 marketing skills into one Cursor project. npx the library into the repo you already work in, or open Official here and Task-delegate specialists that each load only their playbooks.` | Stronger problem language (customer-language adjacent). Slightly longer; “Official” as product name is OK if fineprint still disambiguates. |
| C | Keep sentence 1 of current lede. Replace sentence 2 with: `Copy the install command for another repo, or clone this one in Cursor and start with product-marketer.` | Minimal diff; forces dual CTA in prose. Weaker on “why specialists.” |

### Primary CTA (button + surrounding label)

**Current:** button `Copy` around `npx skills add ahmedofficialm-ops/official`. Command string **must not change**.

| ID | UI copy | Rationale |
| --- | --- | --- |
| A (ship) | Label: `Install into another project`. Button: `Copy command`. Secondary text link: `Clone this repo in Cursor` → `REPO_URL` | Outcome-labeled primary; secondary is the desk path without a second gold button. |
| B | Label: `Install`. Button: `Copy npx command`. Secondary: `Open GitHub to clone` | More literal for engineers who scan for `npx`. Slightly colder. |
| C | Single primary: button `Copy install command`. No secondary in hero; clone only in Install steps | Cleaner hero; **loses** Job B above the fold — only use if T2 says dual-path hurts. |

### Agents headline / lede (optional this session)

Keep current H1; it already carries the differentiator. If parent touches lede, ship:

**Lede A:** `Opening this repo in Cursor loads .cursor/agents/. Clone it (do not npx all 50 into a random project as Cursor skills). Ask for the work; AGENTS.md Task-delegates so cro-specialist and copywriter load their playbooks — not the whole catalog.`

**CTA A:** Same dual control as Home §1.1.

---

## 5. What NOT to change

- **Attribution / MIT credit:** Keep Home fineprint credit to [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), MIT, **Copyright 2025 Corey Haines**. Do not rephrase into “inspired by” or drop the copyright line. `NOTICE`, `LICENSE`, `vendor/UPSTREAM.md` are out of scope for catalog CRO and must remain accurate.
- **Do not claim** Corey Haines, Conversion Factory, or Magister as Official’s team, customers, or product names. Do not title the site “official marketingskills.”
- **Do not invent** conversion rates, user counts, testimonials, logos, or “used by.”
- **Do not** add a primary CTA that says install every skill into Cursor. README forbids it; CRO must not contradict.
- **Do not** change `INSTALL_COMMAND` (`npx skills add ahmedofficialm-ops/official`) or `REPO_URL`.
- **Do not** hide that this is a fork. Clarity of “what Official adds” (catalog, Pages, org install path, subagents) is allowed; smearing upstream quality is not.
- **Do not** turn the catalog into a SaaS signup, email gate, or pricing page.
- **Do not** remove skill search/categories — they serve the researcher path; pair with repeat CTA instead.
- **Visual identity:** keep dark theme, accent gold, existing type. CRO is hierarchy and copy, not a redesign.
- **Skill markdown bodies:** do not rewrite `skills/*/SKILL.md` for catalog conversion.

---

## Implementation checklist (parent patch)

Files expected to change:

- `src/pages/Home.tsx` — hero dual CTA, H1/lede A, install steps, post-grid CTA, agent list titles, empty-state reset, footer
- `src/pages/AgentsPage.tsx` — CopyCommand + clone, steps, titles, attribution, footer
- `src/pages/SkillPage.tsx` — shortDescription lede, GitHub nav, single-skill warning, 404 nav, footer
- `src/components/CopyCommand.tsx` — label, aria, clipboard fallback
- `src/App.css` — `.cta-row`, `.cta-label`, `.cta-secondary`, `.site-footer` only as needed
- Optional: `src/components/SiteFooter.tsx`

Files **not** to change for this CRO pass: `NOTICE`, `LICENSE`, `src/catalog.ts` command constants (except imports), skill playbooks.

---

## Suggested next specialists

- **copywriter** — if parent wants B/C headlines in voice, or a full rewrite beyond the A patches above.
- **analytics-specialist** — copy_install / click_github events before any A/B.
- **seo-specialist** — title/description for Pages URL; out of scope here.
- **cro-specialist** — re-review after the parent patch (especially dual-path layout on mobile).
