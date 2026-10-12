/**
 * Headless checks for computeDivisions/findDivision, the pure region math behind SvgPage's
 * modifier filing and lookup.  Cases D1-D17 are listed in
 * specs/027-fix-bottom-modifier-lookup/contracts/division-lookup-contract.md.
 *
 * Run with: npm run test:page-divisions
 */
import { computeDivisions, findDivision, PageDivision } from '../src/render/sui/pageDivisions';

let failures = 0;
const check = (name: string, condition: boolean, detail?: string) => {
  if (condition) {
    console.log(`PASS ${name}`);
  } else {
    failures += 1;
    console.log(`FAIL ${name}${detail ? ' -- ' + detail : ''}`);
  }
};

/** The formula SvgPage.divIndex used before this fix, kept to document the bug. */
const legacyIndex = (pos: number, start: number, extent: number) => Math.round((pos - start) / (extent / 8));

const table = computeDivisions(0, 1000, 8);

// --- D1-D3: shape of the table ---
check('D1 eight divisions', table.length === 8, `got ${table.length}`);
check('D2 first start and last end are exact', table[0].start === 0 && table[7].end === 1000,
  `${table[0].start}, ${table[7].end}`);
{
  let contiguous = true;
  for (let i = 0; i < 7; ++i) {
    contiguous = contiguous && table[i].end === table[i + 1].start;
  }
  check('D3 divisions are contiguous', contiguous);
}

// --- D4: midpoints ---
for (let i = 0; i < 8; ++i) {
  const got = findDivision(62.5 + 125 * i, table);
  check(`D4 midpoint of division ${i}`, got === i, `got ${got}`);
}

// --- D5: lower half of the last division (the original bug) ---
check('D5 legacy formula dropped 950 (index 8)', legacyIndex(950, 0, 1000) === 8);
check('D5 950 is in the last division', findDivision(950, table) === 7, `got ${findDivision(950, table)}`);

// --- D6-D7: page edges ---
check('D6 top edge is division 0', findDivision(0, table) === 0);
check('D7 bottom edge is the last division', findDivision(1000, table) === 7, `got ${findDivision(1000, table)}`);

// --- D8-D9: boundaries ---
check('D8 interior boundary belongs to the later division', findDivision(125, table) === 1);
check('D8 boundary result is stable', findDivision(125, table) === findDivision(125, table));
check('D9 just below a boundary', findDivision(124.999, table) === 0);
check('D9 just above a boundary', findDivision(125.001, table) === 1);

// --- D10-D12: outside the page ---
check('D10 before the page', findDivision(-0.001, table) === -1);
check('D11 after the page', findDivision(1000.001, table) === -1);
check('D12 NaN', findDivision(NaN, table) === -1);
check('D12 Infinity', findDivision(Infinity, table) === -1);
check('D12 -Infinity', findDivision(-Infinity, table) === -1);

// --- D13: a page that does not start at 0 ---
{
  const page3 = computeDivisions(2000, 1000, 8);
  check('D13 page start', findDivision(2000, page3) === 0);
  check('D13 just inside the bottom', findDivision(2999, page3) === 7);
  // 3000 is page 3's trailing edge (and page 4's top).  SvgPageMap routes that coordinate to
  // the next page before this lookup runs, so treating it as the last division here is harmless.
  check('D13 trailing edge is the last division', findDivision(3000, page3) === 7);
  check('D13 before the page', findDivision(1999.5, page3) === -1);
  check('D13 first start and last end are exact', page3[0].start === 2000 && page3[7].end === 3000);
}

// --- D14: other page sizes ---
for (const extent of [800, 1056, 1123]) {
  const t = computeDivisions(0, extent, 8);
  let ok = true;
  let monotonic = true;
  let prev = -1;
  let hitLast = false;
  for (let p = 0; p <= extent; p += extent / 64) {
    const ix = findDivision(p, t);
    ok = ok && ix >= 0 && ix <= 7;
    monotonic = monotonic && ix >= prev;
    prev = ix;
    hitLast = hitLast || ix === 7;
  }
  check(`D14 extent ${extent}: every position maps to a division`, ok);
  check(`D14 extent ${extent}: indices never decrease`, monotonic);
  check(`D14 extent ${extent}: last division is reached`, hitLast);
}

// --- D15: exhaustive sweep ---
{
  let noneOutside = true;
  let monotonic = true;
  let prev = 0;
  const seen = new Set<number>();
  for (let p = 0; p <= 1000; p += 0.5) {
    const ix = findDivision(p, table);
    noneOutside = noneOutside && ix >= 0 && ix <= 7;
    monotonic = monotonic && ix >= prev;
    prev = ix;
    seen.add(ix);
  }
  check('D15 no position is outside a division', noneOutside);
  check('D15 indices never decrease', monotonic);
  check('D15 all eight divisions are hit', seen.size === 8 && [0, 1, 2, 3, 4, 5, 6, 7].every((i) => seen.has(i)));
}

// --- D16: filing and lookup agree ---
{
  // Mimic SvgPage.modifierTabDivs: file a tab per sampled position, then look it up.
  const filed: Record<number, string[]> = {};
  const positions: number[] = [];
  for (let p = 0; p <= 1000; p += 1) {
    positions.push(p);
  }
  table.forEach((d: PageDivision) => positions.push(d.start, d.end));
  positions.forEach((p) => {
    const ix = findDivision(p, table);
    if (ix >= 0) {
      filed[ix] = filed[ix] ?? [];
      filed[ix].push(`tab-${p}`);
    }
  });
  const allFound = positions.every((p) => {
    const ix = findDivision(p, table);
    return ix >= 0 && !!filed[ix] && filed[ix].indexOf(`tab-${p}`) >= 0;
  });
  check('D16 a tab filed at a position is found by a lookup at that position', allFound);
}

// --- D17: nothing that could be filed before is lost ---
{
  let nothingLost = true;
  let closeToLegacy = true;
  for (let p = 0; p < 937.5; p += 1) {
    // below the old cutoff, the legacy formula produced a valid index (0-7)
    const old = legacyIndex(p, 0, 1000);
    const now = findDivision(p, table);
    nothingLost = nothingLost && now >= 0;
    closeToLegacy = closeToLegacy && Math.abs(now - old) <= 1;
  }
  check('D17 every position that was filed before is still filed', nothingLost);
  check('D17 new index is within one of the legacy index', closeToLegacy);
}

if (failures > 0) {
  console.log(`${failures} check(s) failed`);
  process.exitCode = 1;
} else {
  console.log('all checks passed');
}
