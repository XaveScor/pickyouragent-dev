---
name: documentation-cell-permalink
description: Cell permalink button and hash-based highlight restore for the comparison table
---

# Cell Permalink

## Business Goal

Let users share a direct link to a specific cell in the comparison table. When someone receives the link, the page scrolls to and highlights that exact agent+feature combination, making it easy to point others to a particular data point during discussions or reviews.

## Features

### Permalink Button

When the user hovers over any agent body cell (not the feature-name column), a small "#" button appears in the top-right corner of the cell. The button is subtle (semi-transparent) and becomes fully opaque on hover to avoid visual clutter.

### Clipboard Copy and Persistent Selection

Clicking the "#" button copies a stable URL to the clipboard **and** activates a persistent selection on that cell. The URL contains a hash fragment that encodes the agent and feature:

- Category cell: `#claude-code!planmode`
- Subfeature cell: `#claude-code!planmode/dual-mode`

The hash format is `#<agentId>!<featureSlug>` for category rows and `#<agentId>!<featureSlug>/<subfeatureSlug>` for subfeature rows. The browser URL is **not** modified when copying.

If a different cell was already selected, clicking "#" on a new cell dismisses the previous selection and activates the new one.

### Copy Feedback

After a successful copy, the "#" button turns green with a checkmark, and a "Copied to clipboard" tooltip appears above it. Both fade out after 1.5 seconds.

### Persistent Cell Selection

Both the "#" button click and loading a page with a hash activate a **persistent selection** on the target cell. The selection is visible as the full cross-highlight effect (column hover, smart row highlight, cross dimming, extra background) plus a "× Remove highlight" bar at the bottom of the cell.

The selection behaves as follows:

- **Hovering another cell**: The selection highlight is temporarily replaced by the normal hover highlight. The "× Remove highlight" bar stays visible in the selected cell.
- **Leaving the table**: The full selection highlight re-appears automatically.
- **Clicking "× Remove highlight"**: The selection is fully dismissed — all highlight classes are removed, the cell DOM is restored, and the URL hash is cleaned via `history.replaceState`.

### "× Remove highlight" Bar

The bar is absolutely positioned at the bottom edge of the selected cell. When a cell is selected:

1. The cell gains the `.has-selection` class, which adds extra bottom padding (22px) to prevent content from overlapping the bar.
2. The remove bar is appended to the cell and positioned via `position: absolute; bottom: 0; left: 0; right: 0`, spanning the full cell width edge-to-edge.

The cell stays as `display: table-cell` (no layout change), so it naturally stretches to match the row height set by taller sibling cells. The bar always sits at the very bottom of the cell regardless of how tall the row is.

### Hash-Based Highlight Restore

When the page loads with a cell permalink hash:

1. The target cell is found by matching `data-agent-id` and `data-feature` attributes on `<td>` elements.
2. `selectedCellInfo` is stored (agentId, feature, colIndex) and the persistent selection is activated.
3. The full cross-highlight effect is applied programmatically: column hover, smart row highlight (same logic as the hover system), cross dimming, an extra background on the target cell, and the "× Remove highlight" bar.
4. The page scrolls smoothly to center the target cell in the viewport.

## Data Attributes

Each agent `<td>` in the table body carries two data attributes used for cell identification:

- `data-agent-id` — the agent's stable ID (e.g., `"claude-code"`, `"cursor"`)
- `data-feature` — the feature path: just the slug for category rows (e.g., `"planmode"`), or `featureSlug/subfeatureSlug` for subfeature rows (e.g., `"planmode/dual-mode"`)

Agent `<th>` header cells also carry `data-agent-id` for column identification.

These attributes are threaded from the data layer (`StatusFeature.tsx`, `SubscriptionsFeature.tsx`) through `agentIds` props into the Astro components (`StatusFeature.astro`, `Subfeature.astro`, `SubscriptionsFeature.astro`).

## Design Decisions

- **Single shared button element**: One `<button>` is created and repositioned between cells on hover, rather than inserting a button into every cell. This avoids DOM bloat across the many table cells.
- **Single shared remove bar element**: One `<div>` is created and moved into the selected cell. Only one cell can be selected at a time.
- **URL not modified on copy**: Clicking "#" only copies to clipboard. The browser address bar stays unchanged so users don't accumulate unwanted history entries.
- **Persistent selection with hover coordination**: The selection highlight coexists with the hover system. On `mouseover`, the hash-specific classes (`.hash-highlight`, `.hash-row`) are temporarily cleared so the hover system can highlight the hovered cell. On `mouseleave`, the selection highlight is re-applied via `applySelectedHighlight()`. The "× Remove highlight" bar remains visible at all times (even during hover).
- **Absolutely positioned remove bar**: The bar uses `position: absolute; bottom: 0` inside the already-relative cell (`tbody td[data-agent-id]` has `position: relative`). The `.has-selection` class adds bottom padding to prevent content from being hidden behind the bar. This approach keeps the cell as `display: table-cell`, so it naturally stretches to match the row height — solving the bug where flex layout caused the cell to collapse to its content height when sibling cells were taller.
- **Smooth scroll to center**: `scrollIntoView({ behavior: 'smooth', block: 'center' })` positions the cell in the middle of the viewport so the user sees surrounding context.
- **Hash row class**: Since `:hover` CSS pseudo-class doesn't apply to programmatic highlights, a `.hash-row` class on the `<tr>` mirrors the `tr:hover td` background and opacity rules.
- **Static helper functions**: `getCellStatusStatic` and `statusMatchesThresholdStatic` duplicate the hover system's logic because the originals are scoped inside `initTableHover`. This keeps the two systems decoupled.
- **Module-level state**: `selectedCellInfo` is declared at module scope (outside both `initTableHover` and `initCellPermalink`) so both systems can read it. The hover system checks it on `mouseover`/`mouseleave`; the permalink system writes it on `#` click and hash restore.
