## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2025-02-18 - Explicit Focus Styles on Interactive State Toggles
**Learning:** Custom interactive elements that function as toggles (e.g., tags serving as multi-select buttons) or disclosure widgets (e.g., expand/collapse icons) are often missed by keyboard users if they lack visible focus styles, and can be completely confusing to screen-reader users without appropriate state attributes.
**Action:** Always add `aria-pressed` to toggle buttons, `aria-expanded` to disclosure buttons, and ensure explicit focus styles (like `focus-visible:ring-2`) are applied to the `className` of these interactive elements so their states are programmatically surfaced and visually apparent when navigating by keyboard.
