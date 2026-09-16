---
name: marketing-desk
description: When the user wants marketing help — CRO, copy, SEO, ads, launch, pricing, emails, analytics, or a marketing plan. Use this skill to route work to the specialist subagents in .cursor/agents instead of loading every marketing skill. Also use when the user says "run the marketing desk," "use the marketing agents," or "make the marketing skills work."
---

# Marketing desk

You orchestrate marketing work. You do not become all 50 skills at once.

1. Read `AGENTS.md` in the repo root.
2. If `.agents/product-marketing.md` is missing, invoke `product-marketer` first.
3. Invoke the matching specialist subagent(s) from `.cursor/agents/` via the Task tool. Pass the full user request and any product context.
4. Synthesize their results for the user. File drafts under `marketing/` when they produce artifacts.

Never instruct a specialist to load unrelated `skills/*/SKILL.md` files.
