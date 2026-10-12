# Implementation Plan: Fix Bottom-of-Page Modifier Lookup

**Branch**: `027-fix-bottom-modifier-lookup` | **Date**: 2026-10-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/027-fix-bottom-modifier-lookup/spec.md`

## Summary

`SvgPage` files each modifier tab (text groups, annotations, etc.) under one of 8 vertical divisions of the page, and `findModifierTabs` searches only the division containing the click. Both use `SvgPage.divIndex`, which computes `Math.round((pos - pageTop) / divSize)`. Rounding to the nearest index shifts every division boundary by half a division and produces index 8 for the lower half of the last division; the `div < modifierYKeys.length` guard then silently drops the item, so footers and other bottom-of-page text cannot be selected. The fix replaces the arithmetic with a boundary-based lookup: the page precomputes the absolute start/end of each division once, and `divIndex` returns the division whose range contains the position (or -1 when outside the page). The matching logic lives in a small dependency-free module so it can be regression-tested headlessly. `addModifierTab`, `findModifierTabs` and `clearMeasure` all go through the same function, so filing, lookup and clearing always agree.

## Technical Context

**Language/Version**: TypeScript (compiled by the project's `build/build.js`).

**Primary Dependencies**: None new. `SvgPage` (`src/render/sui/svgPageMap.ts`) already depends on the `layoutProvider` interface for horizontal vs. vertical flow (`getFlowDimensionPosition` / `getFlowDimensionExtent`); the new helper takes plain numbers and has no imports.

**Storage**: N/A. The division table is ephemeral render state, never serialized.

**Testing**: Headless `ts-node` script `tests/pageDivisions.ts` (`npm run test:page-divisions`), following `tests/textDragPlacement.ts`: a local `check()` helper, no DOM, no VexFlow. Contract cases are listed in [contracts/division-lookup-contract.md](./contracts/division-lookup-contract.md). No rendering test is added (constitution: rendering regression is lower priority).

**Target Platform**: Browser SVG application; tests run under Node.

**Project Type**: Single project (library + application), existing `src/` and `tests/` layout.

**Performance Goals**: No regression. Division bounds are computed once per page in the constructor; each lookup is a scan of 8 numeric ranges, run once per modifier per render and once per mouse hit-test.

**Constraints**: The number of divisions stays 8 (`SvgPage.modifierDivs`). Behavior for the upper and middle page is unchanged (FR-009). Must work for horizontal layouts, where the flow dimension is x and the page extent is its width. No change to serialized data.

**Scale/Scope**: One module added, one class (`SvgPage`) modified, one unused export removed.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle #1 (Serialization)**: PASS. No persisted field or serialized shape changes; the division table is runtime-only render state.
- **Principle #2 (Non-UI transformation logic testing)**: PASS. The region math is pure and ships with a headless regression script and a contract case list, matching the pattern of specs 019, 022 and 023, even though the code lives in the render layer rather than `src/smo`.
- **Principle #3 (Rendering performance)**: PASS. Bounds are precomputed once per page; per-call cost is a scan of 8 numbers. No DOM measurement is added and the render pipeline (`scoreRender.ts`, `renderState.ts`, Vex) is untouched.
- **Principle #4 (Logical dependencies)**: PASS. The helper is a pure numeric module with no UI, DOM or `smo` imports; `SvgPage` remains the only caller. `src/smo` is not touched.

No violations; Complexity Tracking is not needed. Re-check after Phase 1 design: unchanged, still PASS.

## Project Structure

### Documentation (this feature)

```text
specs/027-fix-bottom-modifier-lookup/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── division-lookup-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md             # created later by /speckit-tasks
```

### Source Code (repository root)

```text
src/render/sui/
├── pageDivisions.ts     # NEW: pure functions: computeDivisions(start, extent, count), findDivision(pos, divisions)
└── svgPageMap.ts        # SvgPage: build divisions in constructor, divIndex uses findDivision, guards use div >= 0,
                         #   clearMeasure tolerates an empty division; remove the unused getDiv export

tests/
└── pageDivisions.ts     # NEW: headless regression script

package.json             # add "test:page-divisions" script
```

**Structure Decision**: Keep the fix inside the existing render layer. A separate import-free module is used instead of putting the logic in `svgPageMap.ts` so that the test does not have to load VexFlow and DOM-dependent code (`svgPageMap.ts` imports the Vex renderer and declares jQuery).

## Complexity Tracking

*No Constitution Check violations; table not needed.*
