## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-05-03 - Convey State with Accessible Attributes
**Learning:** Custom interactive elements, like tag buttons acting as toggles or visual navigation indicators, do not automatically convey their active or pressed states to screen readers. Relying solely on visual cues (like background colors or `tag-accent` classes) leaves assistive technology users without context.
**Action:** Always add appropriate ARIA state attributes (`aria-pressed="true|false"` for toggles, `aria-expanded="true|false"` for disclosures, `aria-current="page"` for active navigation links) to programmatically communicate the visual state to assistive technologies.
