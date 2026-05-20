## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2024-05-20 - Custom Interactive Element Accessibility
**Learning:** In Next.js applications using Tailwind, custom interactive elements (like tags acting as toggles or divs acting as disclosure buttons) often lack programmatic state (`aria-pressed`, `aria-expanded`) and visible keyboard focus states by default, making them inaccessible to screen readers and keyboard-only users.
**Action:** Always verify that custom buttons and toggles have explicit ARIA states (`aria-pressed`, `aria-expanded`, `aria-controls`) and use utilities like `focus-visible:ring-2` to visually indicate focus without relying exclusively on hover states or external CSS.
