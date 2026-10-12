---

description: "Task list for Fix Bottom-of-Page Modifier Lookup"
---

# Tasks: Fix Bottom-of-Page Modifier Lookup

**Input**: Design documents from `/specs/027-fix-bottom-modifier-lookup/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/division-lookup-contract.md](./contracts/division-lookup-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Included. The plan commits to a headless `tests/pageDivisions.ts` regression script (same pattern as `tests/textDragPlacement.ts`); the contract case IDs (D1 to D17) are the test cases.

**Organization**: Tasks are grouped by user story. All three stories share one small pure module (Phase 2), so that module is the blocking foundation; each story then wires or verifies one part of `SvgPage`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

## Path Conventions

Single project (per plan.md): `src/render/sui/`, `tests/`, repo root `package.json`.

---

## Phase 1: Setup

**Purpose**: Register the test so later phases only add cases.

- [X] T001 Add the script `"test:page-divisions": "ts-node -P tests/tsconfig.json tests/pageDivisions.ts"` to `package.json`, next to the existing `test:text-drag-placement` entry.
- [X] T002 Create `tests/pageDivisions.ts` with the scaffold only: a header comment pointing at `specs/027-fix-bottom-modifier-lookup/contracts/division-lookup-contract.md`, the `failures` counter and `check(name, condition, detail?)` helper copied from `tests/textDragPlacement.ts`, and a final summary block that prints `all checks passed` or sets `process.exitCode = 1`. Do not import any module under test yet. Do not import anything from `src/` other than `src/render/sui/pageDivisions.ts` (added in T003); the test must stay free of DOM and VexFlow imports.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The pure, import-free division logic that US1, US2 and US3 all call.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 Create `src/render/sui/pageDivisions.ts` with no imports. Export `interface PageDivision { start: number; end: number; }`; `computeDivisions(pageStart, pageExtent, count)`, which returns `count` contiguous divisions where `start_i = pageStart + (pageExtent * i) / count`, `end_i = start_{i+1}` (the same expression, so no gaps or drift), and the last `end` is exactly `pageStart + pageExtent`; and `findDivision(position, divisions)`, which returns the index `i` with `start_i <= position < end_i`, treats the last division as closed on the right, and returns `-1` for positions before the first start, after the last end, or non-finite. Per [data-model.md](./data-model.md) and research.md section 4.
- [X] T004 In `tests/pageDivisions.ts`, add cases D1 to D12 from the contract (division count, exact first start and last end, contiguity, midpoints, lower half of the last division, top and bottom edges, interior boundary and its neighbours, out-of-page and non-finite inputs). Add a local `legacyIndex = (pos, start, extent) => Math.round((pos - start) / (extent / 8))` and a check that `legacyIndex(950, 0, 1000) === 8` (documents the old failure that `findDivision(950) === 7` now fixes).
- [X] T005 In `tests/pageDivisions.ts`, add cases D13 to D15 (non-zero page start and the bottom-edge note, other page sizes 1056/1123/800, and the exhaustive 0.5-step sweep over a page asserting no `-1`, no index above 7, non-decreasing indices, and that every index 0 to 7 is hit).
- [X] T006 Run `npm run test:page-divisions` and fix `pageDivisions.ts` until every case passes.

**Checkpoint**: The division math is correct and covered; nothing in the app uses it yet.

---

## Phase 3: User Story 1 - Select text and modifiers near the bottom of the page (Priority: P1) MVP

**Goal**: Modifiers whose top edge is in the bottom region of a page are filed under, and found from, the last division.

**Independent Test**: Place a footer in the lowest part of a page and click it; it is selected. Repeat at several heights and on page 2 (quickstart.md section 3, steps 1 to 4).

### Implementation for User Story 1

- [X] T007 [US1] In `src/render/sui/svgPageMap.ts`, import `PageDivision`, `computeDivisions` and `findDivision` from `./pageDivisions`. Add a `divisions: PageDivision[]` field to `SvgPage` and build it once at the end of the constructor with `computeDivisions(this.layoutSource.getFlowDimensionPosition(this.box), this.layoutSource.getFlowDimensionExtent(this.box), SvgPage.modifierDivs)`. Replace the old `modifierYKeys` loop in the constructor and remove the `modifierYKeys` field.
- [X] T008 [US1] In `src/render/sui/svgPageMap.ts`, change `SvgPage.divIndex(dim)` to `return findDivision(dim, this.divisions);` (documenting that it returns `-1` for positions outside the page), and keep `divSize` as is.
- [X] T009 [US1] In `src/render/sui/svgPageMap.ts`, update `addModifierTab` and `findModifierTabs` to guard with `div >= 0` instead of `div < this.modifierYKeys.length`. Leave the rest of each method unchanged.
- [X] T010 [US1] Run `npx tsc --noEmit -p tsconfig.json` and fix any remaining references to `modifierYKeys`.
- [ ] T011 [US1] Manual validation: follow quickstart.md section 3 steps 1 to 4 in the running app (bottom-of-page text on page 1 and page 2 is selectable).

**Checkpoint**: User Story 1 works. Bottom-of-page text is selectable.

---

## Phase 4: User Story 2 - Registering and looking up use the same vertical regions (Priority: P1)

**Goal**: Prove filing and lookup agree at every height, and that behavior in the upper and middle page is unchanged.

**Independent Test**: `npm run test:page-divisions` passes cases D16 and D17; manual horizontal-mode check (quickstart.md section 3 step 5).

### Tests for User Story 2

- [X] T012 [P] [US2] In `tests/pageDivisions.ts`, add case D16: for positions sampled across the page (every 1 unit including all division boundaries and both edges), build a table once, and assert that a tab filed at `findDivision(p, table)` is returned by a lookup at the same `p`, using a small in-test `Record<number, string[]>` that mimics `modifierTabDivs`.
- [X] T013 [P] [US2] In `tests/pageDivisions.ts`, add case D17: for positions in the upper and middle page (before the last division), assert that the new index is within one of the old `legacyIndex` and that every position still resolves to a division (no `-1`), so nothing that could be filed before is lost.

### Implementation for User Story 2

- [X] T014 [US2] Run `npm run test:page-divisions` and confirm all cases D1 to D17 pass.
- [ ] T015 [US2] Manual validation: quickstart.md section 3 step 5 (horizontal display mode, text near the right end of a page is selectable) and section 4 (existing upper and middle modifiers behave as before).

**Checkpoint**: Filing and lookup are shown to agree, in vertical and horizontal flow.

---

## Phase 5: User Story 3 - Redraw and measure clearing stay consistent (Priority: P2)

**Goal**: Clearing a measure's modifiers uses the same division selection and cannot fail on an empty division.

**Independent Test**: `SvgPage.clearMeasure` resolves the same division as `addModifierTab`, and does not throw when that division holds no modifiers.

### Implementation for User Story 3

- [X] T016 [US3] In `src/render/sui/svgPageMap.ts` `SvgPage.clearMeasure`, replace the `div < this.modifierYKeys.length` guard with `div >= 0 && this.modifierTabDivs[div]` so a position outside the page or a division with no modifiers is skipped instead of dereferencing `undefined`. Keep the filtering logic otherwise unchanged (research.md section 6).
- [X] T017 [US3] In `src/render/sui/svgPageMap.ts`, remove the unused exported `getDiv` function (and the `layoutProvider` import only if nothing else uses it). First confirm with a search of `src/` and `tests/` that `getDiv` has no references.
- [X] T018 [US3] Run `npx tsc --noEmit -p tsconfig.json` and confirm no errors.

**Checkpoint**: All three entry points (`addModifierTab`, `findModifierTabs`, `clearMeasure`) use the same division selection.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T019 Run `npm run test:page-divisions`, `npm run test:global-layout-reposition` and `npm run test:text-drag-placement` to confirm no existing headless test regressed.
- [X] T020 Run `npm run build` and confirm the build succeeds.
- [ ] T021 Run through all of quickstart.md (sections 1 to 4) and note the result.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup; blocks all user stories.
- **US1 (Phase 3)**: depends on Phase 2. This is the MVP.
- **US2 (Phase 4)**: tests T012 and T013 depend only on Phase 2; the manual check T015 depends on US1.
- **US3 (Phase 5)**: depends on US1 (T007, T008 define `divisions` and the new `divIndex`).
- **Polish (Phase 6)**: depends on all stories.

### Within Each Story

- T007 to T009 all edit `src/render/sui/svgPageMap.ts`, so they run in order (no [P]).
- T016 and T017 also edit `svgPageMap.ts`; run them after T009.
- T012 and T013 edit the same test file as T004/T005 but add independent cases; they are marked [P] against each other only if written in separate blocks, otherwise run in order.

### Parallel Opportunities

- After T006, US2's tests (T012, T013) can be written while US1's `svgPageMap.ts` edits (T007 to T009) are made, since they touch different files.
- Everything else is sequential because the work centres on two files.

---

## Parallel Example: after Phase 2

```text
Task: "Add case D16 to tests/pageDivisions.ts"                      (T012)
Task: "Add case D17 to tests/pageDivisions.ts"                      (T013)
Task: "Wire divisions into SvgPage in src/render/sui/svgPageMap.ts" (T007 to T009)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phases 1 and 2 (test registered, division module written and passing).
2. Phase 3: wire `SvgPage` to the module.
3. Stop and validate: click bottom-of-page text in the app.

### Incremental Delivery

1. MVP above fixes the user-visible bug.
2. US2 adds the agreement and no-regression evidence.
3. US3 makes `clearMeasure` consistent and removes the dead `getDiv`.

---

## Notes

- The whole fix is one new 30-line module plus about a dozen changed lines in `SvgPage`.
- Removing `modifierYKeys` and `getDiv` is intentional (research.md sections 2 and 6); neither is read anywhere except for `.length`.
- Commit after each phase.
