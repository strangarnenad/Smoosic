# Data Model: Fix Bottom-of-Page Modifier Lookup

All structures are in-memory render state. Nothing here is serialized, and no existing serialized shape changes (constitution Principle #1).

## PageDivision

One vertical (or, in horizontal layout, horizontal) band of a page.

| Field | Type | Meaning |
|-------|------|---------|
| `start` | number | Absolute score-coordinate position of the band's leading edge (inclusive) |
| `end` | number | Absolute position of the trailing edge (exclusive, except for the last band, where it is inclusive) |

**Invariants**

- A page has exactly `SvgPage.modifierDivs` (8) divisions, in increasing order.
- `divisions[0].start === pageStart` and `divisions[n-1].end === pageStart + pageExtent`, exactly (no accumulated float drift).
- `divisions[i].end === divisions[i+1].start` for every interior pair (contiguous, no overlap, no gap).
- Every position in `[pageStart, pageStart + pageExtent]` belongs to exactly one division.

## Division lookup

`findDivision(position, divisions) -> number`

- Returns the index `i` such that `divisions[i].start <= position < divisions[i].end`.
- For the last division the upper bound is inclusive: `position === divisions[n-1].end` returns `n-1`.
- Returns `-1` when `position < divisions[0].start` or `position > divisions[n-1].end`, or when `position` is not a finite number.
- A position on an interior boundary returns the later division.

## SvgPage (changed fields)

| Member | Before | After |
|--------|--------|-------|
| `modifierYKeys: number[]` | Page-relative division ends, used only for `.length` | Removed |
| `divisions: PageDivision[]` | n/a | Built once in the constructor from `box`, the layout's flow dimension, and `modifierDivs` |
| `divIndex(dim)` | `Math.round((dim - pageTop) / divSize)` | `findDivision(dim, divisions)`; returns -1 when outside the page |
| `modifierTabDivs: Record<number, ModifierTab[]>` | Keyed by the rounded index | Unchanged in shape; keyed by the new division index (0 to 7) |

**State transitions**: `clearMap()` and `clearModifiers()` reset `modifierTabDivs` as before. The `divisions` table does not change for the life of the page.

## ModifierTab

Unchanged. A tab is filed under `divIndex` of the flow-dimension position of its `box` (its top edge in vertical layout), and returned by `findModifierTabs` when its box contains the lookup box.
