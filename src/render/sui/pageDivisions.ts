// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
/**
 * Pure helpers that split a page into contiguous divisions along its flow dimension, and find
 * the division that contains a position.  SvgPage uses them to file and look up modifiers.
 * This module has no imports so it can be tested without a DOM or VexFlow.
 * @module /render/sui/pageDivisions
 */

/**
 * A band of a page.  A division contains positions from `start` (inclusive) to `end`
 * (exclusive), except the last division of a page, which also contains `end`.
 * @category SuiRender
 */
export interface PageDivision {
  start: number,
  end: number
}

/**
 * Split `[pageStart, pageStart + pageExtent]` into `count` contiguous divisions.  Each division
 * ends exactly where the next begins, and the last ends exactly at the page edge.
 * @param pageStart position of the leading edge of the page
 * @param pageExtent size of the page along the flow dimension
 * @param count number of divisions
 * @returns the divisions, in increasing order
 */
export function computeDivisions(pageStart: number, pageExtent: number, count: number): PageDivision[] {
  const rv: PageDivision[] = [];
  const edge = (i: number) => (i === count ? pageStart + pageExtent : pageStart + (pageExtent * i) / count);
  for (let i = 0; i < count; ++i) {
    rv.push({ start: edge(i), end: edge(i + 1) });
  }
  return rv;
}

/**
 * Find the division containing `position`.  A position on a boundary between two divisions
 * belongs to the later one; the page's trailing edge belongs to the last division.
 * @param position position along the flow dimension
 * @param divisions the page's divisions, from {@link computeDivisions}
 * @returns the index of the division, or -1 if the position is outside the page
 */
export function findDivision(position: number, divisions: PageDivision[]): number {
  if (!Number.isFinite(position) || divisions.length === 0) {
    return -1;
  }
  const last = divisions.length - 1;
  if (position < divisions[0].start || position > divisions[last].end) {
    return -1;
  }
  for (let i = 0; i < last; ++i) {
    if (position < divisions[i].end) {
      return i;
    }
  }
  return last;
}
