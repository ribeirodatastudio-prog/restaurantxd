## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - ARIA States and Focus Styles for Toggles and Disclosures
**Learning:** Interactive UI elements acting as toggles (like "tag buttons" for selection) or disclosures (like expand/collapse widgets) lack programmatic state for screen readers if they rely solely on visual styling. Furthermore, they are difficult to use for keyboard navigators if focus is invisible.
**Action:** Always add `aria-pressed` to toggle buttons, `aria-expanded` to disclosure buttons, and ensure all interactive elements have explicit focus styles (e.g., `focus-visible:ring-2` using the design system accent).
