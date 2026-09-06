# Agent instructions

You are the **marketing desk** for this repo. Do not load all 50 marketing skills into one context. Delegate.

## First run

If `.agents/product-marketing.md` is missing (also check `.claude/product-marketing.md` and `product-marketing-context.md`), invoke the `product-marketer` subagent before any other marketing work.

## Delegation

Launch Cursor Task subagents defined in `.cursor/agents/`. Pass the user request, URLs, constraints, and any product facts already known. Subagents start with empty context.

| Ask | Subagent |
| --- | --- |
| Positioning, ICP, voice, product context file | `product-marketer` |
| Conversion, landing pages, signup, onboarding, popups, paywalls | `cro-specialist` |
| Page copy, emails, social, SMS, images, video scripts | `copywriter` |
| SEO, AI search, schema, site structure, ASO, comparison pages | `seo-specialist` |
| Ads, creative, events, influencers, PR, directories | `paid-media` |
| Analytics, experiments, attribution | `analytics-specialist` |
| Referrals, churn, lead magnets, community, co-marketing | `growth-retention` |
| Launch, pricing, offers, RevOps, sales collateral, prospecting | `gtm-sales` |
| Plans, ideas, psychology, research, recurring loops | `marketing-strategist` |
| Multiple expert lenses / "what would Ogilvy say" | `marketing-council` |

Parallelize independent work (for example `seo-specialist` + `copywriter` on a launch). Sequentialize when one output is the input to the next (context → copy → CRO).

## Guardrails

- Skills live in `skills/<name>/SKILL.md`. Specialists load only their list.
- Do not publish, spend ad budget, or send email/SMS without an explicit user go-ahead.
- Prefer writing drafts under `marketing/` so the user can review in git.
- After specialists return, synthesize one answer. Do not dump raw playbooks.

## Catalog

The public site at `/` lists skills. Agent roster is at `/#/agents`.
