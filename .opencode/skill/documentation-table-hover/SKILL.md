---
name: documentation-table-hover
description: Business purpose of the comparison table hover interactions including column highlight, smart row highlight, cross dimming, and badge contrast mode
---

# Table Hover Interactions

## Business Goal

Help users compare AI coding agents by making the comparison table interactive. When a user hovers over any agent cell, the table highlights relevant information and dims the rest, creating a focused comparison experience.

## Features

### Column Highlight

When the user hovers over any cell in an agent column, the entire column gets a subtle background tint and the column header is highlighted. This helps the user track which agent they're looking at vertically.

### Badge Contrast Mode

Badges for "supported" and "partially-supported" statuses receive a bold colored border (green for supported, amber for partial) when they are in the hovered column or in a highlighted row cell. "Not-supported" and "not-verified" badges are intentionally left unchanged — the contrast draws attention to positive statuses.

### Smart Row Highlight (Borders Only)

When hovering a cell, the row highlight logic selectively applies badge contrast borders based on the hovered badge's status:

- Hovering "supported" → only other "supported" badges in the row get contrast borders
- Hovering "no", "partial", or "not verified" → both "partially-supported" and "supported" badges get contrast borders

This lets the user instantly see which other agents do the same or better for that feature. The row background always highlights all cells (not selective) — only the border logic is smart.

Subscription cells with links are treated as "supported" for this logic.

### Cross Dimming

When hovering any agent cell, all cells outside the cross (hovered row + hovered column) fade to reduced opacity. The first column (feature/subfeature names) always stays fully visible since feature context is always important. This creates a visual crosshair that focuses attention on the relevant row and column.

### Coordination with Persistent Cell Selection

The hover system is aware of the persistent cell selection state (managed by the cell-permalink system via `selectedCellInfo`). When a cell is selected (via "#" click or page load with hash):

- **On `mouseover`**: The hover system calls `clearSelectedHighlight()` to temporarily remove the hash-specific visual classes (`.hash-highlight`, `.hash-row`), then applies its own hover highlight as normal. The "× Remove highlight" bar in the selected cell stays visible.
- **On `mouseleave`**: After clearing hover classes, the hover system calls `applySelectedHighlight()` to re-apply the full selection highlight (column hover, row highlight, cross-active, hash-highlight, hash-row, and the remove bar).

This means the hover system always takes priority while the user is hovering, and the selection automatically restores when the mouse leaves.

## Design Decisions

- **Background is always full-row**: The background tint applies to every cell in the hovered row, not just the smart-selected ones. Only borders are selective. This avoids a jarring "holes in the row" effect.
- **First column never dims**: Feature and subfeature names are always readable regardless of hover state.
- **Transparent border by default**: All badges have a 2px transparent border to prevent layout shift when the visible border appears on hover.
- **Subscription cells as "supported"**: Cells with subscription links (no badge) are treated as "supported" for the smart highlight logic since having links means the agent supports subscriptions.
- **Selection-aware cleanup**: The `mouseleave` handler checks `selectedCellInfo` before deciding whether to leave the table in a neutral state (no selection) or re-apply the selection highlight.
