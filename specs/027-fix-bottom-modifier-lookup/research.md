# Research: Fix Bottom-of-Page Modifier Lookup

No NEEDS CLARIFICATION items remained after the spec. The items below record what was verified in the code and the design decisions that follow from it.

## 1. What the current code actually does

**Finding**: `SvgPage.divIndex(dim)` in `src/render/sui/svgPageMap.ts` is `Math.round((dim - pageTop) / divSize)` with `divSize = pageExtent / 8`. It rounds to nearest, not down. Consequences for a page of extent H:

- Division 0 effectively covers `[0, H/16)`; division k covers `[(k-0.5)H/8, (k+0.5)H/8)`, i.e. all boundaries are shifted half a division.
- Positions in `[(7.5)H/8, H]` give index 8, which fails `div < modifierYKeys.length` (length 8) and is dropped in `addModifierTab` and `findModifierTabs`. Only the lower half of the last division is lost, not the whole last division.
- Because filing and lookup use the same shifted function, items in the surviving divisions are still found (the bug does not break the upper and middle page), which is why it went unnoticed.

**Decision**: Treat the user's "rounding down" description as the same defect; the spec's Assumptions note the actual rounding.

## 2. `modifierYKeys` holds relative ends and is only used for its length

**Finding**: The constructor pushes `divSize, 2*divSize, ...` (page-relative, not absolute) into `modifierYKeys`; nothing compares a position against these values, only `.length` is read.

**Decision**: Replace it with a table of absolute `{ start, end }` ranges built from the page's `box` and the layout's flow dimension. Remove `modifierYKeys`.

**Alternatives considered**: Keep `modifierYKeys` and fix `divIndex` with `Math.floor` plus clamping. Rejected: it still compares against nothing real, would leave the intent ("start/end of each division") unrepresented, and clamping would hide out-of-page positions rather than rejecting them (FR-006).

## 3. Division bounds are stable per page

**Finding**: `SvgPage.box` is assigned only in the constructor, created in `SvgPageMap.addPage` as `(topX, topY, pageWidth, pageHeight)` in absolute score coordinates. `divSize` is already derived from it at construction time.

**Decision**: Compute the division table once in the constructor. If a future change makes the box mutable, the table must be rebuilt at the same point.

## 4. Boundary and edge semantics

**Decision**:

- Division `i` is the half-open range `[start_i, end_i)`, with `end_i` equal to `start_{i+1}` computed by the same expression, so there are no gaps or overlaps from floating-point drift.
- The last division is closed on the right, so a position exactly at the page's bottom edge belongs to it (FR-004).
- A position exactly on an interior boundary belongs to the later division (FR-005). Registration, lookup and clearing all use the same function so they always agree.
- A position before the first start or after the last end returns -1; callers skip it (FR-006). This replaces the old implicit guard.

**Alternatives considered**: Clamping out-of-page positions to the first/last division. Rejected: text dragged far off the page would become hit-testable on an unrelated division, and the spec asks for such items to be left unfiled.

## 5. Where to put the logic

**Finding**: `svgPageMap.ts` imports the Vex renderer (`../../common/vex`) and uses a global jQuery `$`, so a headless test importing it would need DOM and font setup. Existing headless tests import only `src/smo` modules.

**Decision**: New module `src/render/sui/pageDivisions.ts` with two pure functions and no imports. `SvgPage` calls them; the test imports only this module.

**Alternatives considered**: (a) Put the functions in `src/smo/data/common.ts`: rejected, it is render-layer geometry and Principle #4 keeps `smo` free of rendering concerns. (b) Test `SvgPage` directly with stubs: rejected as heavier than the problem.

## 6. Related code that shares the defect

- **`SvgPage.clearMeasure`** calls `divIndex` and then dereferences `this.modifierTabDivs[div]` without checking it exists, so it throws for an empty division. A search of `src/` finds no callers of `SvgPage.clearMeasure` (only `MappedSystems.clearMeasure` exists alongside it), so the defect is latent. **Decision**: switch it to the shared lookup and tolerate a missing or empty division, so FR-007 holds if it is called.
- **`getDiv`** (exported from `svgPageMap.ts`) also rounds, takes a different and odd argument form, and has no references in `src/`. **Decision**: remove it rather than leave a second, wrong implementation. Its removal is called out in tasks and the final report.
- **`SvgPageMap.getRendererFromPoint`** chooses the page with `Math.floor(pointDim / pageDim)`. That is a correct page split (a position on a page boundary belongs to the next page) and is out of scope.

## 7. Out of scope

- Filing a tall modifier under every division it overlaps (spec Assumptions).
- Changing the number of divisions.
- Any change to `MappedSystems` (measure/system lookup) or to page selection.
