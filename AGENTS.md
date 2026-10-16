# AGENTS.md

## Writing or modifying blogs

All blog posts live in `src/pages/blogs/*.md`. Use `_template.md` for frontmatter and structure.

Always load these two skills before touching a blog file:

1. **`i-have-adhd`** (built-in skill) — apply its ruleset to every response during the session: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give concrete time estimates, and make completed work visible.
2. **`blog-writing-guide`** (installed at `~/.agents/skills/blog-writing-guide`, from `getsentry/skills@blog-writing-guide`) — apply it to the blog content itself.

### Rules from blog-writing-guide to enforce

- Opening states the problem or the conclusion in the first 2–3 sentences. Never background or hype.
- Include a short "What is X?" definition for the post's head term.
- Headings must carry information and keywords. No generic headings like "Approach", "Conclusion", "Background".
- No banned language: "seamless", "empower", "leverage", "unlock", "robust", "streamline", "we're excited to announce", filler transitions.
- No em dashes. Use commas, periods, or line breaks.
- Numbers over adjectives for any performance or scale claim.
- Add a 3–4 question FAQ at the bottom for long-tail SEO.
- End with something concrete: docs links, resources, or a real next step. No generic closing hype.
- Author byline must stay `Md Mehedi Hasan`.

### Workflow

1. Load both skills (see above).
2. Read the target post and `_template.md`.
3. Edit the post against the checklist in this file and in the skill.
4. Verify: `grep -nE '—|seamless|empower|leverage|unlock|robust|streamline' <post>.md` returns nothing.
5. Do not change frontmatter fields (`layout`, `slug`-relevant title, `status`, `date`) unless asked.
