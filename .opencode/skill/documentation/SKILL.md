---
name: documentation
description: Describes different areas of the code and how business-purpose documentation is embedded via DOCUMENTATION-SKILL tags
---

# Documentation System

## How It Works

Business-purpose documentation is stored in dedicated skills and linked to code regions using tagged comments.

When you encounter a comment like:

```css
/* <DOCUMENTATION-SKILL:some-tag> */
...code...
/* </DOCUMENTATION-SKILL:some-tag> */
```

Extract the tag name and load the skill `documentation-<tag>` to understand the business purpose of the marked code region.

## Tag Format

Inside CSS blocks:

```css
/* <DOCUMENTATION-SKILL:tag> */
/* </DOCUMENTATION-SKILL:tag> */
```

Inside JS/TS blocks:

```js
// <DOCUMENTATION-SKILL:tag>
// </DOCUMENTATION-SKILL:tag>
```

## When to Load

- When you read a file and encounter a `DOCUMENTATION-SKILL` tag, load the corresponding `documentation-<tag>` skill **before** making changes to the tagged region.
- This ensures you understand the business purpose and constraints before modifying the code.

## Known Tags

| Tag              | Skill                          | Description                                                                                               |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `table-hover`    | `documentation-table-hover`    | Comparison table hover interactions: column highlight, smart row highlight, cross dimming, badge contrast |
| `cell-permalink` | `documentation-cell-permalink` | Cell permalink button, clipboard copy, hash-based highlight restore with scroll                           |
