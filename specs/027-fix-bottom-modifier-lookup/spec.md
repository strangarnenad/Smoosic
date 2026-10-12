# Feature Specification: Fix Bottom-of-Page Modifier Lookup

**Feature Branch**: `027-fix-bottom-modifier-lookup`

**Created**: 2026-10-12

**Status**: Draft

**Input**: User description: "Fix a long-existing fencepost bug with text/modifiers near the bottom of the page. SvgPage addModifierTab finds the vertical division (modifier tab row) based on the y-coordinate by dividing the y coordinate by the number of divisions and rounding down, but this cuts the last division out. It should instead determine the division from the start/end y of each division. The same issue exists in SvgPage findModifierTabs: the y division should be determined by where the y falls within the start/end of each division, not by dividing and rounding down."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select text and modifiers near the bottom of the page (Priority: P1)

A user clicks on a text block, annotation, footer, or other score modifier that sits in the lower part of a page. The click should select it, exactly as it does for items higher on the page. Today, items near the bottom edge of the page can be impossible to click or select, because the page's lookup of "what is at this vertical position" has no entry for the bottom-most region.

**Why this priority**: This is the visible, long-standing defect. Footers, copyright lines, and bottom-of-page annotations are common, and a user who cannot select them cannot edit, move, or delete them.

**Independent Test**: Place a footer text block (or any modifier) in the bottom region of a page, click on it, and confirm it is selected. Repeat with items at several heights down the page, including the very lowest position the item can occupy.

**Acceptance Scenarios**:

1. **Given** a modifier or text block whose top edge lies within the last vertical region of a page, **When** the user clicks on it, **Then** it is found and selected.
2. **Given** modifiers placed at the top, middle, and bottom of a page, **When** the user clicks each one, **Then** every one is found, with no region of the page that cannot be hit.
3. **Given** a modifier near the boundary between two vertical regions, **When** the user clicks on it, **Then** it is found regardless of which side of the boundary its top edge falls on.
4. **Given** a multi-page score, **When** the user clicks a modifier near the bottom of any page, **Then** it is found on that page, and the lookup on other pages is unaffected.

---

### User Story 2 - Registering and looking up use the same vertical regions (Priority: P1)

When the score is drawn, each modifier is filed under the vertical region of the page it occupies. When the user clicks, the click location is looked up using the same regions. The two steps must always agree: an item filed at a given height must be found by a click at that same height, for every height on the page.

**Why this priority**: The bug exists because filing and lookup are not consistent with the actual region boundaries. Correct behavior depends on both steps using the same, boundary-based definition of a region. The bottom-of-page failure in Story 1 is not fully fixed unless both agree.

**Independent Test**: For a page, register items at a range of heights spanning the entire page height (including exactly at region boundaries and the page's top and bottom edges), then look each one up by a click at that height; every item must be returned.

**Acceptance Scenarios**:

1. **Given** an item registered at any height within the page, **When** a lookup is performed at that same height, **Then** the item is returned.
2. **Given** a height that lies exactly on the boundary between two regions, **When** an item is registered or looked up there, **Then** it is assigned to exactly one region, the same one for both operations.
3. **Given** a height at the very top or very bottom edge of the page, **When** an item is registered or looked up there, **Then** it falls in the first or last region respectively, not outside the page.

---

### User Story 3 - Redraw and measure clearing stay consistent (Priority: P2)

When a measure is redrawn, the page removes the modifiers it had filed for that measure. This must locate the same region that the modifiers were originally filed under, including in the lower part of the page. Otherwise stale entries linger (or fresh ones are lost) for measures near the bottom.

**Why this priority**: It uses the same region lookup. It is a secondary symptom of the same defect, and is lower priority only because the user-visible effect is subtler than being unable to click an item.

**Independent Test**: Edit a measure in the lowest system on a page that has modifiers attached, and confirm the old entries are replaced rather than duplicated, and that clicking the modifier still works after the edit.

**Acceptance Scenarios**:

1. **Given** a measure in the lower part of the page with attached modifiers, **When** that measure is redrawn, **Then** the previous entries for that measure are removed from the region they were filed under, and the redrawn entries are found by clicks.

---

### Edge Cases

- What happens when an item's top edge is exactly at the page's bottom edge? It belongs to the last region.
- What happens when an item's top edge is above the page's top or below its bottom (for example, text dragged partially off the page)? It is not assigned to a region on that page, and the lookup must not fail or error.
- What happens when a click lies exactly on the boundary between two regions? The item and the click resolve to the same single region.
- What happens when a page is shorter or taller than the standard sizes (custom page height, landscape orientation, a part with its own page size)? Region boundaries are derived from that page's own height, and every part of the page is covered.
- What happens on pages after the first, whose positions are measured from the top of the whole score? Region assignment is relative to that page, so the last region of every page is reachable.
- What happens to items near the top of the page? They keep working as before.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST divide its full height into a fixed number of contiguous vertical regions, each with a defined start and end, such that every vertical position from the top edge to the bottom edge of the page falls in exactly one region.
- **FR-002**: When a modifier is registered with the page, the system MUST choose its region by finding the region whose start/end range contains the modifier's top position, rather than by a rounding calculation on the position.
- **FR-003**: When looking up modifiers at a click position, the system MUST choose the region by finding the region whose start/end range contains the click's position, using exactly the same definition of regions as FR-002.
- **FR-004**: The last region of the page MUST be usable: a modifier or click in the bottom-most part of the page (up to and including the bottom edge) MUST resolve to the last region.
- **FR-005**: A position lying exactly on the boundary between two regions MUST resolve to exactly one of them, consistently for registration, lookup and clearing.
- **FR-006**: Positions outside the page's vertical range MUST NOT be assigned to any region and MUST NOT cause errors during registration or lookup.
- **FR-007**: Clearing the modifiers belonging to a measure MUST use the same region selection as registration, so the entries removed are those that were filed for that measure.
- **FR-008**: Regions MUST be determined per page, from that page's own position and height, so the behavior is correct for every page of a multi-page score, for custom page sizes, and for parts with their own page layout.
- **FR-009**: Existing behavior for modifiers in the upper and middle parts of the page MUST be unchanged: anything that could be clicked before can still be clicked, and nothing is returned that does not contain the click.

### Key Entities

- **Page**: One rendered page of the score or part, with a position within the whole score, a height, and a set of vertical regions.
- **Vertical region**: One of a fixed number of contiguous bands covering the page's full height, each with a start and end position. Modifiers are filed under the region containing their top edge, and lookups search only the region containing the click.
- **Modifier tab**: A clickable record for a modifier or text group on the page, holding its bounding box. It is filed under a vertical region and returned by lookups whose click falls inside its box.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of modifiers and text blocks on a page can be found by a click on them, including those in the lowest region of the page; none of the page height is unreachable.
- **SC-002**: For heights sampled across the full page (top edge, every region boundary, every region midpoint, and bottom edge), an item registered at a height is found by a lookup at that height in 100% of cases.
- **SC-003**: A footer or other bottom-of-page text block that previously could not be selected can be selected on the first click.
- **SC-004**: Regression check: modifiers in the upper and middle parts of the page behave identically before and after the change (no modifier that was found before is lost, and no extra modifiers are returned).

## Assumptions

- The number of vertical regions per page stays as it is today; this feature changes how a position is matched to a region, not how many regions exist.
- A modifier is filed under the region containing its top edge, as today. Making a tall modifier findable from every region it overlaps is out of scope.
- The current calculation rounds to the nearest region index, which both shifts every region boundary by half a region and drops the lower half of the last region. The fix replaces it with boundary-based matching for registration, lookup and measure clearing alike.
- Page-relative positions come from the existing layout information for the page. The coordinate system and page sizing are unchanged.
- Positions outside the page are rare (an item dragged partly off the page) and are handled by being left unfiled, not by being forced into the nearest region.
- The headless regression test pattern used by earlier features applies: the region matching logic is testable without rendering.
