# Contract: Page Division Lookup

Implemented in `src/render/sui/pageDivisions.ts`, used by `SvgPage` in `src/render/sui/svgPageMap.ts`, and verified by `tests/pageDivisions.ts` (`npm run test:page-divisions`). Spec references: [spec.md](../spec.md).

## Functions

```ts
export interface PageDivision { start: number; end: number; }

/** Split [pageStart, pageStart + pageExtent] into `count` contiguous divisions. */
export function computeDivisions(pageStart: number, pageExtent: number, count: number): PageDivision[];

/** Index of the division containing `position`, or -1 if it is outside the page. */
export function findDivision(position: number, divisions: PageDivision[]): number;
```

## Test cases

Unless noted, the page is `pageStart = 0`, `pageExtent = 1000`, `count = 8` (division size 125).

| ID | Case | Expected | Spec |
|----|------|----------|------|
| D1 | `computeDivisions` returns 8 entries | length 8 | FR-001 |
| D2 | First start and last end | `divisions[0].start === 0`, `divisions[7].end === 1000` exactly | FR-001 |
| D3 | Contiguity | `divisions[i].end === divisions[i+1].start` for i in 0..6 | FR-001 |
| D4 | Midpoint of each division, `62.5 + 125*i` | index `i` for all 8 | FR-002, FR-003 |
| D5 | Lower half of the last division, e.g. 950 | 7 (the former failure: old formula gave 8) | FR-004 |
| D6 | Page top edge, 0 | 0 | FR-001 |
| D7 | Page bottom edge, 1000 | 7 (last division is closed on the right) | FR-004 |
| D8 | Interior boundary, 125 | 1, the later division, and the same result on every call | FR-005 |
| D9 | Just below / above a boundary, 124.999 and 125.001 | 0 and 1 | FR-005 |
| D10 | Before the page, -0.001 | -1 | FR-006 |
| D11 | After the page, 1000.001 | -1 | FR-006 |
| D12 | Non-finite input (`NaN`, `Infinity`) | -1, no throw | FR-006 |
| D13 | Non-zero page start (page 3 of a vertical score, `pageStart = 2000`): 2000, 2999, 3000 | 0, 7, 7 (3000 is this page's bottom edge; see note) | FR-008 |
| D14 | Different page sizes (extent 1056, 1123, 800) | every position sampled at 1/64 steps maps to exactly one index, indices never decrease, and index 7 is reached | FR-008 |
| D15 | Exhaustive sweep: 0 to 1000 in steps of 0.5 | no -1, no index above 7, non-decreasing, each of 0 to 7 hit | SC-001 |
| D16 | Registration/lookup agreement: for every sampled position, `findDivision(p)` called twice and for a tab filed at `p` and a lookup at `p` gives the same index | equal | FR-003, FR-007, SC-002 |
| D17 | Old-behavior regression: positions in the upper and middle page that previously resolved still return a division, and a tab whose box contains the lookup box is found | found | FR-009, SC-004 |

**Note on D13**: The bottom edge of page N and the top edge of page N+1 are the same coordinate. Page selection is handled before division lookup by `SvgPageMap.getRendererFromPoint` (`floor(pos / pageDim)`), which assigns that coordinate to page N+1. `findDivision` is only asked about positions already routed to this page, so inclusive handling of the bottom edge is correct and harmless. The test asserts `findDivision(3000, pageTable) === 7` for the page table that starts at 2000, and documents this note beside the assertion.

## Integration behavior (verified manually; see [quickstart.md](../quickstart.md))

| ID | Behavior | Spec |
|----|----------|------|
| I1 | A footer text group in the bottom region of a page can be clicked and selected | US1 |
| I2 | Text at the top, middle and bottom of a page can all be selected | US1.2 |
| I3 | Horizontal display mode: modifiers near the right end of a page can be selected | FR-008 |
| I4 | A multi-page score: bottom-of-page text on page 2 can be selected | US1.4 |
| I5 | Dragging text partly off the bottom of the page does not throw | FR-006 |
