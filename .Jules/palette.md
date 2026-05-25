## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2024-05-25 - Nav Component Mobile Accessibility
**Learning:** In responsive designs where text labels are hidden using utility classes (e.g., `hidden sm:block`) alongside icons, screen readers cannot access the navigation names unless explicit `aria-label`s are applied to the wrapper links. Furthermore, decorative icons must be explicitly hidden (`aria-hidden="true"`) to prevent redundant announcements. Focus states (`focus-visible:ring-2`) are crucial for keyboard users to navigate these lists.
**Action:** Always provide an `aria-label` to interactive elements when their visible text is conditionally hidden by responsive utility classes, and ensure decorative child elements have `aria-hidden="true"`.
