## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2024-02-18 - Added ARIA states and focus rings to toggle buttons
**Learning:** Custom interactive elements like tag toggles (e.g. "Quem foi" and "Pediria de novo" tags) are not natively treated as accessible toggle buttons. They lack focus styling and ARIA states to convey their selected status to screen readers.
**Action:** Always add appropriate `aria-pressed` states and explicit focus styles (`focus-visible:ring-2` etc.) to programmatically convey active states and ensure keyboard accessibility.
