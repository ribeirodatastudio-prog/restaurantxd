## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2026-05-10 - Added ARIA State Attributes & Focus Styles to Custom Toggles
**Learning:** Custom interactive elements (like tag buttons functioning as toggles or simple disclosure widgets) are missing intrinsic accessible states (like `aria-pressed` or `aria-expanded`) and visual focus rings by default. This makes their functionality opaque to screen readers and difficult to navigate with a keyboard.
**Action:** Always add appropriate ARIA state attributes (`aria-pressed={state}` or `aria-expanded={state}`) to custom UI controls. Apply explicit focus styles (e.g., `focus-visible:ring-2`) to ensure proper keyboard navigation visibility.
