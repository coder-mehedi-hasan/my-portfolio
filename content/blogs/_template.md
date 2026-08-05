---
# ─────────────────────────────────────────────
# Blog Frontmatter (YAML)
# All fields marked with * are REQUIRED
# author and feature_image are FIXED — do not change
# ─────────────────────────────────────────────
title: "Your Blog Title Here"
excerpt: "One or two sentence summary shown on the /blogs listing page."
author: "Md Mehedi Hasan"
date: "YYYY-MM-DD"
feature_image: "/me2.png"
tags:
  - tag-one
  - tag-two
---

## Introduction

Start with a short introduction. Explain what the post covers and who it is for.

## Section Heading

Write the main body content here. Use the Markdown elements below as needed.

### Sub-heading

Use sub-headings to break long sections into smaller, readable chunks.

- Use bullet lists for quick, scannable points.
- Keep paragraphs short (2-3 sentences max).
- **Bold** important keywords so they stand out.

1. Use numbered lists for steps or sequences.
2. Each step should be actionable and concise.

> Use blockquotes for key takeaways, tips, or memorable quotes.

Inline `code` for small snippets, or fenced blocks for longer examples:

```javascript
const greeting = "Hello, world!";
console.log(greeting);
```

## Another Section

Continue writing with the same pattern: heading, short paragraphs, and lists.

## Conclusion

Wrap up with a brief summary and, if relevant, a call to action or what's next.

---

# ─────────────────────────────────────────────
# RULES
# ─────────────────────────────────────────────
# 1. Save the file as content/blogs/<kebab-case-slug>.md
#    e.g. content/blogs/understanding-react-server-components.md
# 2. The slug (filename) must be kebab-case and unique.
# 3. date must be a valid YYYY-MM-DD value.
# 4. author and feature_image are FIXED:
#    author: "Md Mehedi Hasan", feature_image: "/me.png"
#    Do not change them in any post.
# 5. Only these Markdown features are styled:
#    headings, paragraphs, bold/italic, lists, blockquotes,
#    inline code, and fenced code blocks.
# 6. Every post must include a ## Introduction and a ## Conclusion.
# 7. Do NOT add a top-level "# " title heading; the page already
#    renders the title from frontmatter.
