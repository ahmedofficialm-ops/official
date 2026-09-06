# Official — homepage + agents copy

**Voice:** Direct, technical-marketer, attribution-honest. Clarity over cleverness.  
**Primary CTA:** Keep the `CopyCommand` component. Command: `npx skills add ahmedofficialm-ops/official`  
**Secondary CTA:** Clone this repo in Cursor and use the 10 subagents.  
**Implement in:** `src/pages/Home.tsx`, `src/pages/AgentsPage.tsx` (parent implements; this file is copy only).  
**Preserve:** Two-line `h1` + `span` pattern, MIT fork credit, no fake proof.

---

## Homepage

### Eyebrow

```
50 skills · 10 specialists · MIT
```

*(Replace the current `{skills.length} skills · MIT · Cursor, Claude Code, Codex`. Counts are real; compatibility moves into the subhead so the eyebrow is scannable proof, not a client list.)*

### Headline (h1 + span)

```
Marketing skills
for AI agents
```

### Subhead (lede)

```
Conversion, copy, SEO, ads, and growth playbooks your coding agent can load on demand. Works with Cursor, Claude Code, Codex, and other Agent Skills clients. Ask for a landing-page audit or a welcome sequence — it loads the matching skill instead of guessing, or stuffing all 50 into one chat.
```

### Primary CTA

Keep:

```tsx
<CopyCommand command={INSTALL_COMMAND} />
```

`INSTALL_COMMAND` stays `npx skills add ahmedofficialm-ops/official`.

### CTA supporting line (immediately under CopyCommand)

```
Run that in your product repo. Clone Official in Cursor when you want the 10 specialists.
```

### Fineprint (attribution — required)

```
Skills are a maintained MIT fork of coreyhaines31/marketingskills (Copyright 2025 Corey Haines). Official adds this catalog, GitHub Pages packaging, and the Cursor desk in this repo. We are not Corey Haines, Conversion Factory, or Magister. Use upstream if you only need the playbooks.
```

Link `coreyhaines31/marketingskills` to `UPSTREAM_URL` as today.

### Subagents section

**Heading:** `Cursor specialists`

**Lede:**

```
Ten subagents under .cursor/agents/. Clone this repo in Cursor and ask for homepage copy or a CRO audit. The desk in AGENTS.md routes the work so one chat does not swallow every skill.
```

Keep the existing agent list (`code` name + summary) and the link:

```
See the full roster and skill map
```

### Install section

**Heading:** `Install in your project`

**Steps (user language, three sequential steps):**

1. In the repo you market from, run `npx skills add ahmedofficialm-ops/official`. Need only a few playbooks? Add `--skill cro copywriting` (swap names as needed).
2. Write `.agents/product-marketing.md` first — who you sell to, voice, and claims you will not invent — so CRO, copy, and SEO share one brief.
3. Invoke `product-marketer`, then the specialist for the job. For the 10 Cursor subagents, clone this repo. Do not install all 50 skills as Cursor skills in one project.

Implementation note: step 1 can still interpolate `{INSTALL_COMMAND}` inside the sentence. Keep `<code>` on paths, the install command, `product-marketer`, and `--skill` examples.

### Catalog section (keep; no rewrite required)

Leave heading `Skill catalog`, search placeholder `Search skills…`, empty state `No skills match that filter.`

Optional catalog lede if you want a one-liner above the grid:

```
Fifty installable skills, eight categories. Open a card for the full playbook and a per-skill install command.
```

---

## Annotations

**Eyebrow.** Real, countable proof only (50 / 10 / MIT). Compatibility in the hero eyebrow competed with the proof and buried the specialists — the product’s actual differentiator vs upstream.

**Headline.** Category + audience in five words. Matches README and the brand line already in the nav. Clever alternatives fail the “clarity over cleverness” rule and make the fork look like a SaaS.

**Subhead.** Names the jobs (conversion, copy, SEO, ads, growth), the mechanism (load the matching skill), and the two failure modes we solve (guessing vs context collapse). Compatibility lives here so the primary CTA is not delayed by a client laundry list.

**CopyCommand unchanged.** The conversion action is the install command, not a “Get started” button. The component is the CTA.

**CTA supporting line.** Tells the reader what happens after copy-paste, and splits primary (install skills into *their* repo) from secondary (clone Official for the desk). Removes the current fineprint’s job of explaining install mechanics so attribution can stay attribution.

**Fineprint.** Required MIT credit; states what this fork adds; answers “are you Corey / Conversion Factory / Magister?” in one sentence; points people who only want playbooks to upstream instead of smearing it.

**Subagents heading.** “Subagents” is accurate; “Cursor specialists” is the customer-facing job. Lede keeps `.cursor/agents/` and `AGENTS.md` because this audience lives in the repo.

**Install steps.** Old step 2 was an “or” (clone/copy files), so it was not a sequence. New steps are the real order: install → shared ICP file → invoke specialists / clone the desk. Step 3 names the anti-pattern explicitly (“do not install all 50 as Cursor skills”) because README already has to say it.

**No social proof block.** There are no customers, logos, quotes, or traffic numbers. Inventing them would violate voice and legal attribution. Counts in the eyebrow are the proof.

**Emotion.** One concrete annoyance (“stuffing all 50 into one chat”) — not hype, not jokes.

---

## Headline / CTA-line alternatives

Test these if the chosen hero feels too much like a category label. Do not ship more than one h1.

### Headlines

**Chosen:** `Marketing skills` / `for AI agents`  
Category lock. Lowest decode cost. Best default.

**Alt A:** `Marketing skills` / `without stuffing one chat`  
Pain-first. Stronger “now you can” (use playbooks without context collapse). Slightly more informal; still not playful.

**Alt B:** `50 playbooks. 10 specialists.` / `Not all 50 in one chat.`  
Specificity + mechanism. Good if we need the counts in the h1 (then shorten the eyebrow to `MIT · Cursor, Claude Code, Codex`). Risk: reads like a feature dump if the subhead repeats the numbers.

**Alt C:** `Give your coding agent CRO, copy, and SEO` / `without loading every skill`  
Job-to-be-done. Narrower than the full catalog (ads/growth implied, not named). Use if traffic is mostly Cursor marketers asking for page work.

### CTA supporting lines

**Chosen:** `Run that in your product repo. Clone Official in Cursor when you want the 10 specialists.`  
Primary vs secondary path in two sentences.

**Alt A:** `Paste it in your project directory. Then write .agents/product-marketing.md so every skill shares one ICP.`  
Pushes the shared-brief objection. Use if installers skip context and get generic drafts.

**Alt B:** `That installs the library. The 10 subagents live in this repository — clone it in Cursor, don’t dump every skill into yours.`  
Stronger anti-pattern. Use if we see people `npx skills add` the full set *as Cursor skills*.

**Alt C:** `One command in your repo. Then product-marketer, then the specialist.`  
Shortest path to invocation. Weak on the clone/desk secondary CTA.

---

## Agents page hero

### Eyebrow

```
10 Cursor subagents · shared product context
```

*(Keep. True and specific.)*

### Headline (h1 + span)

```
Specialists
not one overloaded agent
```

*(Keep the contrast; it is the page’s job. Do not clever it.)*

### Lede

```
Open this repo in Cursor and it loads .cursor/agents/. The parent reads AGENTS.md and routes each job so a specialist loads only its playbooks. Ask for a landing page and cro-specialist plus copywriter run — not all 50 skills at once.
```

Dropped “Task-delegates” (Cursor-internal). Kept file paths and agent names the user will type.

### Fineprint

```
Invoke product-marketer first so .agents/product-marketing.md exists. In another project, install playbooks with npx skills add ahmedofficialm-ops/official. The 10 subagents themselves live in this repository. Skills remain an MIT fork of Corey Haines’ marketingskills; Official is this desk and catalog, not Conversion Factory or Magister.
```

Use `{INSTALL_COMMAND}` for the command. One attribution sentence is enough here; homepage fineprint stays the canonical credit.

### Roster

No card copy rewrite. Keep `agent.summary` from `src/agents.ts`. Optional meta line already works: `{n} skills`.

---

## Meta (if parent sets document title / description)

**Home title:** `Official — marketing skills for AI agents`  
**Home description:** `50 conversion, copy, SEO, ads, and growth skills for Cursor, Claude Code, and Codex. 10 specialists so one chat does not load all of them. MIT fork of Corey Haines’ marketingskills.`

**Agents title:** `Cursor specialists — Official`  
**Agents description:** `Ten Cursor subagents that load only their marketing playbooks. Start with product-marketer, then CRO, copy, SEO, ads, and the rest.`

Do not claim the GitHub Pages URL is live.

---

## Words to avoid

- Corey Haines, Conversion Factory, or Magister as *our* team, customers, product names, or “partners”
- “The official marketingskills product,” “official Corey Haines skills,” “Official by Conversion Factory”
- Invented metrics, logos, testimonials, quotes, user counts, stars, traffic
- Paid SaaS language: plans, seats, trials, “trusted by,” SLAs
- “Install every skill into Cursor” / “add all 50 as Cursor skills” as a recommendation
- Playful or enterprise-salesy: “magic,” “delight,” “leverage,” “seamless,” “unlock,” “next-gen,” “AI-powered marketing suite”
- Superlatives we cannot prove: “best,” “leading,” “#1”
- Implying we wrote the 50 playbooks from scratch (we maintain a fork; credit upstream)

## Words to use

Official; marketing skills for AI agents; MIT-licensed fork; Corey Haines / `coreyhaines31/marketingskills` (when attributing); Cursor subagents; catalog; `npx skills add ahmedofficialm-ops/official`; `product-marketer` first; Agent Skills; 50 skills; 10 specialists.
