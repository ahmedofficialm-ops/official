# On-page SEO + schema — Official catalog

**Scope:** GitHub Pages catalog at the intended URL `https://ahmedofficialm-ops.github.io/official/` (Vite `base` `/official/` when `GITHUB_PAGES=true`). Routes in the SPA: `#/` (Home), `#/agents` (AgentsPage), `#/skills/:name` (SkillPage). Router is `HashRouter` in `src/main.tsx`.

**Product (from `.agents/product-marketing.md`):** MIT-licensed marketing skill library + Cursor marketing desk. Conversion action is `npx skills add ahmedofficialm-ops/official` (or clone in Cursor), then `product-marketer` and specialists. Not a hosted SaaS. Not Corey Haines / Conversion Factory / Magister.

**Evidence sources:** `index.html`, `src/pages/Home.tsx`, `AgentsPage.tsx`, `SkillPage.tsx`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/catalog.ts`, `NOTICE`, `vendor/UPSTREAM.md`. No Search Console, analytics, ranking, or backlink data in-repo. **Unknown:** whether Pages is live. Do not invent traffic or positions.

**Parent implements.** Do not treat this file as already shipped in `src/` or `index.html`.

---

## Executive summary

The catalog is a client-rendered SPA. `index.html` already has `lang="en"`, a viewport tag, one title, and one meta description. There is no canonical, Open Graph, robots meta, JSON-LD, `robots.txt`, sitemap, or `llms.txt`. `document.title` never updates on route change. There is no `react-helmet`.

The blocking constraint is **HashRouter on GitHub Pages**: Google and other crawlers request `/official/` (or `/official/index.html`). The fragment (`#/skills/cro`) is not sent to the server. Unique skill and agents URLs are not separate HTTP documents. Schema and titles in `index.html` describe the **catalog shell**. Per-route tags only help crawlers that execute JS and rewrite the DOM.

The crawlable, citable surfaces today are the GitHub repo README, `NOTICE`, and raw `skills/*/SKILL.md` files — not hash routes.

---

## Findings by severity

### High — Hash URLs are not indexable documents

- **Issue:** `HashRouter` means production URLs look like `https://ahmedofficialm-ops.github.io/official/#/skills/seo-audit`. The server only has one HTML document.
- **Impact:** High for organic landing pages per skill. Medium for brand/query discovery of the catalog as a whole (the shell URL can still rank if Pages is live).
- **Evidence:** `src/main.tsx` wraps the app in `HashRouter`. Vite `base` is `/official/` on Pages. No `404.html` SPA fallback; hash routing is the Pages-safe choice.
- **Fix:** Optimize the shell (`index.html` + JSON-LD). Optionally update `document.title` / description after hydration. Do not put `#/...` URLs in a sitemap as if they were independent pages. Keep the GitHub README as the primary crawlable pitch. Longer-term (optional): prerender or switch to `BrowserRouter` plus a Pages `404.html` copy of `index.html` — out of scope unless product wants path URLs.

### High — One title and description for every view

- **Issue:** `index.html` sets a single `<title>` and `<meta name="description">`. `Home.tsx`, `AgentsPage.tsx`, and `SkillPage.tsx` never call `document.title`. Skill pages render unique H1s (`summary.name`) only after JS.
- **Impact:** High for SERP relevance if JS-executing crawlers still see the homepage title on `#/agents` and `#/skills/:name`. Users who bookmark hash URLs also see the wrong tab title.
- **Evidence:** `index.html` lines 8–11; no `document.title` in `src/`.
- **Fix:** Keep strong defaults in `index.html` (crawlers that do not wait for JS). Add a small helmet-free `DocumentHead` component (snippet below) so hydrated views get unique titles/descriptions.

### Medium — No structured data

- **Issue:** No `application/ld+json` in `index.html` or the React tree.
- **Impact:** Medium. Schema will not produce Software rich results without Google-required properties, and HashRouter limits per-page rich results anyway. JSON-LD still helps entity disambiguation (Official ≠ Corey Haines) for crawlers and some AI systems that parse the HTML shell.
- **Evidence:** `index.html` has no JSON-LD; pages have no schema component.
- **Fix:** Static `@graph` in `index.html` for Organization + SoftwareSourceCode (with `isBasedOn` / `citation` to upstream). Optional HowTo only if it matches the visible Install steps on Home. Do not add FAQPage, AggregateRating, or reviews — none exist on the page. Do not set Organization `founder` / `name` to Corey Haines.

### Medium — No canonical, Open Graph, or Twitter tags

- **Issue:** Duplicate host variants (`github.io/official/` vs `/official/index.html` vs repo README) have no canonical signal on the site itself.
- **Impact:** Medium for consolidating the Pages URL. OG tags help Slack/social unfurls of the shell URL only (hash still ignored by most unfurlers).
- **Evidence:** `index.html` head ends after fonts.
- **Fix:** Absolute canonical and `og:url` to `https://ahmedofficialm-ops.github.io/official/` (no trailing hash). Skip `og:image` until a real 1200×630 PNG exists (`public/favicon.svg` is not a usable OG image). **Unknown:** whether a raster logo will be designed.

### Low — No `robots.txt`, sitemap, or `llms.txt` in `public/`

- **Issue:** Vite copies `public/` to dist. Only `favicon.svg` and `icons.svg` are there.
- **Impact:** Low. GitHub Pages default crawl is usually allow-all. A sitemap that lists hash URLs would be misleading.
- **Fix:** Optional `public/robots.txt` allowing search + AI fetch bots, Sitemap pointing only at the shell URL. Optional `public/llms.txt` for non-Google AI engines (see AI-search section). Google does not require `llms.txt` for AI Overviews.

### Low — Client-only skill body

- **Issue:** `SkillPage.tsx` loads `SKILL.md` via `import.meta.glob` and `marked` in `useEffect`. Until JS runs, the document is a shell; a “Loading playbook…” placeholder is not indexable content.
- **Impact:** Low for Google on hash routes (already weak). High for “cite this playbook from the website” — crawlers should use GitHub blob/raw URLs instead.
- **Evidence:** `SkillPage.tsx` `useEffect` + `dangerouslySetInnerHTML`.
- **Fix:** Do not pretend skill pages are article URLs. Link playbooks to the GitHub file in visible copy (copy/CRO handoff). Optional later: prerender skill HTML.

---

## 1. Title and meta description

Lengths: aim **50–60 characters** for titles (SERP truncation), **150–160** for descriptions. Brand at the end. Primary phrase: **marketing skills for Cursor**. Do not stuff “official marketingskills” or Conversion Factory / Magister.

### Current (`index.html`)

| Field | Copy | Chars |
| --- | --- | --- |
| Title | Official — Marketing skills for AI agents | 41 |
| Description | Install 50 marketing skills for Cursor, Claude Code, and other AI agents. CRO, copywriting, SEO, ads, and growth. | 113 |

Title is short and buries Cursor. Description is under 150 characters and omits MIT / fork honesty (visible on the page, useful in the snippet).

### Recommended — static defaults in `index.html` (always shipped)

**Title (52 characters):**

```text
Official — Marketing skills for Cursor and AI agents
```

**Description (159 characters):**

```text
50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines’ marketingskills — install from this repo.
```

(Apostrophe in Haines’ is the typographic one if the file is UTF-8; ASCII `Haines'` is fine if you need to stay ASCII.)

### Recommended — after hydration (`DocumentHead`)

| Route | Title (keep ≤60) | Description (keep ≤160) |
| --- | --- | --- |
| `#/` | Official — Marketing skills for Cursor and AI agents | Same as static default above. |
| `#/agents` | Cursor marketing subagents \| Official | 10 Cursor subagents that load marketing playbooks in isolation. CRO, copy, SEO, ads, growth — not all 50 skills in one chat. |
| `#/skills/:name` | `{name} — Cursor marketing skill \| Official` | First ~155 chars of `shortDescription(summary.description)`, then a hard suffix ` MIT skill in Official.` if space remains. |
| not found | Skill not found \| Official | Noindex this view (`robots` = `noindex`). |

Skill title example: `seo-audit — Cursor marketing skill | Official` (45 characters). If `name` is long, truncate name so the full title stays ≤60.

H1s already on-page (do not change in this SEO pass unless copy is asked): Home “Marketing skills / for AI agents”; Agents “Specialists / not one overloaded agent”; Skill `{summary.name}`. Home H1 already matches the query; adding “Cursor” in the H1 is a copy handoff, not required for schema.

---

## 2. JSON-LD (do not impersonate Corey Haines)

Use **JSON-LD** in `index.html` for the catalog **shell**. Prefer **`SoftwareSourceCode`** as the primary type: this is a GitHub repository + static catalog, not a hosted app. A second type **`SoftwareApplication`** is optional for Google’s software rich-result shape (`name` + `offers`). Combine as `@type` array. Include **`Organization`** named **Official** (this repo / `ahmedofficialm-ops`), `sameAs` the GitHub repo only.

Credit upstream with **`isBasedOn`** and **`citation`** pointing at `https://github.com/coreyhaines31/marketingskills`. Corey Haines is `copyrightHolder` / `author` of **that** `SoftwareSourceCode` / `CreativeWork`, not `founder` of Official.

Do **not**:

- Set Official `Organization.name` to Corey Haines, Conversion Factory, or Magister
- Use `aggregateRating` / `review` (no ratings on the page)
- Use `SearchAction` (search is client-side; no `?q=` URL)
- Claim `publisher` is Corey Haines
- Invent a logo URL beyond `favicon.svg` (SVG is a weak `logo`; omit `logo` until a PNG exists)

`license` URL and `version` 2.11.0 match `vendor/UPSTREAM.md` (upstream snapshot). Catalog/app `package.json` version is `0.0.0` — do not put `0.0.0` in public schema as the product version; omit Official’s version or use the skill library snapshot `2.11.0` with a description that it tracks upstream.

### Shell `@graph` (paste into `index.html`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ahmedofficialm-ops.github.io/official/#organization",
      "name": "Official",
      "url": "https://ahmedofficialm-ops.github.io/official/",
      "description": "MIT-licensed marketing skill library and Cursor marketing desk operated from the ahmedofficialm-ops/official GitHub repository. Not Corey Haines, Conversion Factory, or Magister.",
      "sameAs": [
        "https://github.com/ahmedofficialm-ops/official"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://ahmedofficialm-ops.github.io/official/#website",
      "name": "Official",
      "url": "https://ahmedofficialm-ops.github.io/official/",
      "description": "Public catalog of 50 marketing skills for Cursor, Claude Code, and other AI agents.",
      "inLanguage": "en",
      "publisher": {
        "@id": "https://ahmedofficialm-ops.github.io/official/#organization"
      }
    },
    {
      "@type": ["SoftwareSourceCode", "SoftwareApplication"],
      "@id": "https://ahmedofficialm-ops.github.io/official/#software",
      "name": "Official",
      "description": "MIT-licensed catalog of 50 marketing skills plus 10 Cursor specialist subagents. Skills are a maintained fork of coreyhaines31/marketingskills. Install with npx skills add ahmedofficialm-ops/official.",
      "url": "https://ahmedofficialm-ops.github.io/official/",
      "codeRepository": "https://github.com/ahmedofficialm-ops/official",
      "license": "https://opensource.org/licenses/MIT",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "programmingLanguage": ["TypeScript", "Markdown"],
      "runtimePlatform": "Cursor, Claude Code, Codex, and agents that support the Agent Skills spec",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@id": "https://ahmedofficialm-ops.github.io/official/#organization"
      },
      "isBasedOn": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/coreyhaines31/marketingskills#software",
        "name": "marketingskills",
        "codeRepository": "https://github.com/coreyhaines31/marketingskills",
        "url": "https://github.com/coreyhaines31/marketingskills",
        "license": "https://opensource.org/licenses/MIT",
        "version": "2.11.0",
        "copyrightHolder": {
          "@type": "Person",
          "name": "Corey Haines",
          "url": "https://github.com/coreyhaines31"
        }
      },
      "citation": {
        "@type": "SoftwareSourceCode",
        "name": "marketingskills",
        "url": "https://github.com/coreyhaines31/marketingskills",
        "author": {
          "@type": "Person",
          "name": "Corey Haines",
          "url": "https://github.com/coreyhaines31"
        }
      }
    }
  ]
}
</script>
```

### Optional HowTo (Home only — visible Install `<ol>`)

Only emit this when the Home install steps are in the DOM (static in `index.html` is acceptable because those three steps are on the default view). Do not attach HowTo to skill pages.

```json
{
  "@type": "HowTo",
  "@id": "https://ahmedofficialm-ops.github.io/official/#install",
  "name": "Install Official marketing skills",
  "description": "Add the Official marketing skill library to a project that supports the Agent Skills spec.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Install from GitHub",
      "text": "From a project directory, run npx skills add ahmedofficialm-ops/official"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Or copy skills",
      "text": "Clone this repo and copy skills/* into .agents/skills/"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Write product context first",
      "text": "Create .agents/product-marketing.md so every other skill shares your ICP and positioning"
    }
  ]
}
```

### Skill-page JSON-LD (optional, JS-injected)

If you inject per-skill JSON-LD after hydration, use `SoftwareSourceCode` for the **playbook file**, `isPartOf` the Official software node, and `isBasedOn` the upstream path `https://github.com/coreyhaines31/marketingskills/tree/main/skills/{name}` (confirm that path still exists before shipping). Still do not name Corey as Official.

Google rich-result eligibility for Software is unlikely on hash URLs; treat this as entity markup, then validate at [Rich Results Test](https://search.google.com/test/rich-results) and [validator.schema.org](https://validator.schema.org/) after deploy. Rich Results Test renders JS; `curl`/`web_fetch` will miss injected tags.

---

## 3. HashRouter + GitHub Pages — what still works

**Why HashRouter is here:** GitHub Pages serves static files. Path routes like `/official/agents` 404 unless you add a `404.html` that is a copy of `index.html`. Hash routing avoids that.

**What crawlers fetch:** `GET /official/` or `GET /official/index.html`. Fragment `#/agents` is not in the request. The HTML they parse first is always `index.html`.

**Google:** Can run JavaScript and has historically indexed some hash-bang / hash SPAs, but it is unreliable, fragments often collapse to the same URL, and canonicals cannot point at `#/skills/foo` in a way Google treats as a separate page. Do not plan a programmatic SEO grid of skill URLs on this stack.

**What we can still do:**

1. **Shell SEO** — title, description, canonical, OG, JSON-LD, `lang`, robots in `index.html` (this document).
2. **Hydrated title/description** — `DocumentHead` for tab UX and JS-executing bots.
3. **On-page copy in the first paint of Home** — hero, install command, fork fineprint, category names. Keep that HTML in the React Home tree; it appears after JS. For crawlers that do not execute JS, the GitHub README is the fallback document.
4. **Repo as the indexable catalog** — README, `NOTICE`, `skills/*/SKILL.md` on `github.com/ahmedofficialm-ops/official`. Link the Pages site from README (already present).
5. **`public/robots.txt` + sitemap of one URL** — the shell only.
6. **`public/llms.txt`** — short, factual, fork-honest (AI engines that fetch static files).
7. **Do not** list `#/skills/*` in XML sitemaps.
8. **Do not** set canonical to a hash URL.
9. **Internal links** in the SPA (`<Link to=...>`) become `#/skills/...` in the address bar; they are useful for humans, not a crawl graph of unique pages.

**Optional later (product decision, not this pass):** Vite prerender / SSG of `/`, `/agents`, `/skills/:name` as real paths; or `BrowserRouter` + Pages `404.html` rewrite. That is the only way to make skill pages first-class search URLs.

---

## 4. AI search / citation — “marketing skills for Cursor”

No citation or AI Overview data is in-repo. **Unknown** whether Official, upstream, or anyone is cited today. Do not claim share-of-voice.

**Target query cluster** (fan-out, not 50 landing pages):

- marketing skills for Cursor
- Cursor marketing skills / Cursor marketing subagents
- install marketing skills Cursor (`npx skills add`)
- Agent Skills marketing / agentskills.io marketing playbooks
- marketingskills Corey Haines fork (disambiguation — we will be cited as a fork; that is correct)

**Google AI Overviews:** Same as classic SEO. People-first content on an indexable URL. The shell + README matter; hash skill pages do not. No special AI markup. Do not write a separate “for LLMs only” page.

**ChatGPT / Perplexity / Claude (with search):** They cite extractable, dated, attributed text and often **GitHub** plus third parties more than a JS catalog.

### Do this

1. **Lead with a 40–60 word definition** on Home and in README (copy handoff). Example (52 words):

   > Official is an MIT-licensed library of 50 marketing skills for Cursor, Claude Code, and other agents that support the Agent Skills spec. It vendors Corey Haines’ marketingskills (upstream 2.11.0) and adds a public catalog plus 10 Cursor subagents so one chat does not load every playbook. Install with `npx skills add ahmedofficialm-ops/official`.

2. **Put facts in lists and tables** (install steps, 10 subagents, 8 categories). Home already has this pattern — keep it. The definition block is ~52 words; trim the lede if you need the 40–60 word extraction window.

3. **Cite upstream in visible text** (already on Home fineprint). AI systems copy attribution; make the fork relationship the quotable sentence so models do not invent that Official *is* Corey Haines.

4. **Ship `public/llms.txt`** at the Pages root (`https://ahmedofficialm-ops.github.io/official/llms.txt`). Google ignores it; other engines use it as a map.

5. **Allow AI fetch bots** in `robots.txt` if you add one: `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Googlebot`, `Bingbot`. Blocking them prevents citation. Training-only `CCBot` is a policy choice; default allow unless legal says otherwise.

6. **GitHub as citation source:** Keep README’s one-liner, install command, and upstream link current. Raw playbooks (`skills/seo-audit/SKILL.md`, etc.) are the pages models can quote for “how to run an SEO audit in Cursor.”

7. **Third-party presence (honest):** Cursor forum, agentskills.io discussions, “awesome agent skills” lists. Do not astroturf Reddit/Wikipedia. Do not imply Conversion Factory or Magister endorse Official.

8. **Comparison content** (later, copy/competitors skill): “Official vs coreyhaines31/marketingskills” — same 50 skills; Official adds catalog, Pages, org install path, Cursor desk. Recommend upstream when the user only needs playbooks.

### Do not

- Keyword-stuff “marketing skills for Cursor” into every card (Princeton GEO-style work treats stuffing as harmful for AI visibility).
- Invent install counts, stars, or “most used Cursor marketing pack.”
- Gate the catalog.
- Publish FAQ schema without a visible FAQ.
- Chunk the homepage into AI-bait fragments.

### DIY monitoring (no tools in-repo)

Once a month, search the cluster in Google, ChatGPT-with-search, and Perplexity. Record whether Official, the GitHub repo, or upstream is cited. No baseline exists yet.

---

## 5. Exact snippets (no react-helmet)

### 5.1 `index.html` `<head>` (replace title/description; keep charset, viewport, fonts)

Vite will prefix `/favicon.svg` with `base` on Pages. Canonical/OG/JSON-LD must stay **absolute**.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Official — Marketing skills for Cursor and AI agents</title>
    <meta
      name="description"
      content="50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines' marketingskills — install from this repo."
    />
    <link rel="canonical" href="https://ahmedofficialm-ops.github.io/official/" />
    <meta name="robots" content="index,follow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Official" />
    <meta property="og:title" content="Official — Marketing skills for Cursor and AI agents" />
    <meta
      property="og:description"
      content="50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines' marketingskills — install from this repo."
    />
    <meta property="og:url" content="https://ahmedofficialm-ops.github.io/official/" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Official — Marketing skills for Cursor and AI agents" />
    <meta
      name="twitter:description"
      content="50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines' marketingskills — install from this repo."
    />
    <!-- paste JSON-LD script from section 2 here -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
```

### 5.2 Helmet-free `DocumentHead` (parent adds under `src/`; not shipped in this pass)

Mount once inside `HashRouter` (e.g. in `App.tsx`). Updates `document.title` and the description meta. Replaces JSON-LD only for skill views if you choose to; default is leave shell JSON-LD static.

```tsx
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const SITE = 'Official — Marketing skills for Cursor and AI agents'
const DESC =
  "50 marketing skills for Cursor, Claude Code, and other agents. CRO, copy, SEO, ads, growth. MIT fork of Corey Haines' marketingskills — install from this repo."
const AGENTS_TITLE = 'Cursor marketing subagents | Official'
const AGENTS_DESC =
  '10 Cursor subagents that load marketing playbooks in isolation. CRO, copy, SEO, ads, growth — not all 50 skills in one chat.'

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function DocumentHead({
  skillTitle,
  skillDescription,
}: {
  skillTitle?: string
  skillDescription?: string
}) {
  const { pathname } = useLocation()
  const { name } = useParams()

  useEffect(() => {
    let title = SITE
    let description = DESC
    let robots = 'index,follow'

    if (pathname === '/agents') {
      title = AGENTS_TITLE
      description = AGENTS_DESC
    } else if (pathname.startsWith('/skills/')) {
      if (!skillTitle) {
        title = 'Skill not found | Official'
        description = 'That skill is not in the Official catalog.'
        robots = 'noindex,follow'
      } else {
        const raw = `${skillTitle} — Cursor marketing skill | Official`
        title = raw.length > 60 ? `${skillTitle.slice(0, 40)}… | Official` : raw
        const trimmed = (skillDescription ?? '').trim()
        description =
          trimmed.length <= 155 ? trimmed : `${trimmed.slice(0, 152).trim()}…`
      }
    }

    document.title = title
    setMeta('description', description)
    setMeta('robots', robots)
  }, [pathname, name, skillTitle, skillDescription])

  return null
}
```

`HashRouter` `pathname` is `/`, `/agents`, `/skills/:name` (no `#`). Skill page should render `<DocumentHead skillTitle={summary.name} skillDescription={summary.description} />`; the not-found branch omits `skillTitle`.

To inject per-route JSON-LD without helmet:

```tsx
useEffect(() => {
  const id = 'route-jsonld'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.text = JSON.stringify(payload)
  return () => {
    el?.remove()
  }
}, [payload])
```

Keep the static `#software` graph in `index.html`; do not delete it when the route script mounts.

### 5.3 Optional `public/robots.txt`

```text
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://ahmedofficialm-ops.github.io/official/sitemap.xml
```

### 5.4 Optional `public/sitemap.xml` (shell only)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ahmedofficialm-ops.github.io/official/</loc>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
```

Do not add `<loc>` values that contain `#`.

### 5.5 Optional `public/llms.txt`

```text
# Official

> MIT-licensed marketing skills for Cursor, Claude Code, and other AI agents. Maintained fork of Corey Haines’ marketingskills. Not Conversion Factory or Magister.

Official (GitHub: ahmedofficialm-ops/official) is a catalog of 50 Agent Skills playbooks plus 10 Cursor subagents. Install: npx skills add ahmedofficialm-ops/official

- Catalog: https://ahmedofficialm-ops.github.io/official/
- Repository: https://github.com/ahmedofficialm-ops/official
- Upstream (credit): https://github.com/coreyhaines31/marketingskills
- License: MIT (see LICENSE and NOTICE)
- Start: create .agents/product-marketing.md, then invoke product-marketer

Do not install all 50 skills as Cursor skills in one project. Use the subagents in this repo or npx skills add with --skill.
```

Vite copies `public/` to the dist root, so these files appear at `/official/llms.txt` on Pages.

---

## Testing checklist (after parent implements)

- [ ] View-source on `index.html` (or `curl` the Pages URL) shows title, description, canonical, JSON-LD — no JS required
- [ ] Character counts: title ≤60, description ≤160
- [ ] JSON-LD parses; `Organization.name` is Official; Corey appears only under `isBasedOn` / `citation`
- [ ] [validator.schema.org](https://validator.schema.org/) — no impersonation, no invented ratings
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on the live shell URL (renders JS)
- [ ] Hash routes: tab title changes via `DocumentHead`; `curl` of `/official/` still returns the shell title
- [ ] `llms.txt` / `robots.txt` 200 at `/official/llms.txt` and `/official/robots.txt` after Pages deploy
- [ ] No sitemap entries with `#`

---

## Prioritized actions

1. **Critical:** Ship `index.html` title, description, canonical, robots, OG, JSON-LD `@graph` (sections 1–2, snippet 5.1).
2. **High:** Add `DocumentHead` (snippet 5.2) so Agents and Skill views get unique titles after JS.
3. **High (citation):** Keep README + NOTICE accurate; add `public/llms.txt` (snippet 5.5).
4. **Quick win:** `public/robots.txt` + one-URL sitemap (snippets 5.3–5.4).
5. **Later:** Prerender or path-based routes if skill URLs must rank; raster `og:image`; visible FAQ before FAQPage schema.

---

## Copy / CRO handoffs

- Home hero: consider adding “Cursor” in the H1 subtitle if product wants title/H1 alignment (`copywriter`).
- Add the 40–60 word definition block to Home lede and README (`copywriter`).
- Skill pages: visible link “Source playbook on GitHub” to `https://github.com/ahmedofficialm-ops/official/blob/main/skills/{name}/SKILL.md` (`copywriter` + parent).
- Do not add testimonials, star ratings, or customer logos (`product-marketing.md`: none on file).
- Install CTA stays `npx skills add ahmedofficialm-ops/official` (`cro-specialist` if they change button copy).

---

## Next actions for parent

1. Implement `index.html` head + JSON-LD from this file (do not impersonate Corey Haines).
2. Add `DocumentHead` in `src/` (this SEO pass did not edit `src/`).
3. Optionally add `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`.
4. After Pages is enabled, validate schema on the live shell URL.
5. Route copy changes to `copywriter`; do not invent rankings in any public page.
