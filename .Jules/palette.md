## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2024-05-28 - Accessible Responsive Navigation Links
**Learning:** When using responsive utility classes (like `hidden sm:block`) to visually hide text labels on smaller screens, the text also becomes hidden from screen readers, rendering icon-only links inaccessible to assistive technologies.
**Action:** Always provide an explicit `aria-label` on the interactive parent element (like `<Link>`) and use `aria-hidden="true"` on child decorative icons and text elements to maintain consistent accessibility across all device sizes while avoiding redundant announcements.
