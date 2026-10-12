# Quickstart: Validating the Bottom-of-Page Lookup Fix

Contract cases are in [contracts/division-lookup-contract.md](./contracts/division-lookup-contract.md); the structures are in [data-model.md](./data-model.md).

## 1. Headless regression test

From the repository root:

```bash
npm run test:page-divisions
```

Expected: every case prints `PASS`, the run ends with `all checks passed`, and the exit code is 0. Before the fix is applied, cases D5 and D15 are expected to fail against the old arithmetic (which is how to confirm the test detects the bug).

## 2. Type check

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: no errors (in particular, no remaining references to the removed `modifierYKeys` or `getDiv`).

## 3. Manual check in the app

Prerequisite: build and run the app as usual (`npm run build`, then open the app).

1. Open a new score. Add a text annotation or footer and position it near the bottom of the first page (drag it, or use the text dialog's position controls).
2. Click on the text. Expected: it is selected (outline shown). Before the fix, text whose top edge lies in the lower half of the last eighth of the page could not be selected.
3. Move the text up through the page in steps (bottom, lower third, middle, upper third, top) and click it at each position. Expected: selected every time.
4. Add a second page (long score) and repeat step 2 at the bottom of page 2.
5. Switch to horizontal display mode (Global Layout dialog) and place text near the right end of a page. Expected: selectable.
6. Drag text partly below the bottom edge of the page. Expected: no error in the browser console.

## 4. Regression spot check

Click existing modifiers in the upper and middle part of a score (slurs, dynamics, titles). Expected: selection behaves exactly as before.
