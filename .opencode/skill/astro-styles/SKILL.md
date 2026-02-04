---
name: astro-styles
description: How to write styles in Astro
---

# Astro Styles

## Styles location

We want to generate optimized styles for the project.

You need to write scoped styles for the components everywhere.

## Example

```astro
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>

// component
```

Avoid using global styles in css files

## Colors

All colors should be declared as CSS variables in `src/styles/global.css`.

Other properties like font sizes, spacing, etc. should be inlined in component `<style>` blocks.
