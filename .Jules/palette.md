## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2026-05-30 - Added ARIA attributes and focus styles to responsive Nav links
**Learning:** When using responsive utility classes (like Tailwind's 'hidden sm:block') to visually hide text labels on smaller screens, it also hides the text from screen readers. Interactive parent elements like navigation links must explicitly define an aria-label and aria-current for state to maintain accessibility.
**Action:** Always add aria-label, aria-current='page' (if active), and aria-hidden='true' on decorative icons for navigation links that visually hide their text on mobile screens. Additionally, provide clear focus states (e.g., focus-visible:ring-2).
