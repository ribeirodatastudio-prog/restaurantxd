## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2024-05-16 - Semantic Navigation State & Hidden Labels
**Learning:** Responsive utility classes like Tailwind's `hidden sm:block` remove text from the accessibility tree, rendering icon+text buttons completely inaccessible to screen readers on smaller screens if they don't have explicit labels. Additionally, current navigation links lack programmatic active states and keyboard focus rings.
**Action:** Always add `aria-label` to components where labels may be visually hidden responsively, explicitly define `aria-current="page"` on the active navigational element, and include explicit focus ring styles (e.g., `focus-visible:ring-2`) on all interactive custom links.
