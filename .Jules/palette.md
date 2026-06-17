## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - ARIA Labels on Responsively Hidden Text
**Learning:** Using responsive utility classes like Tailwind's `hidden sm:block` to visually hide text on smaller screens also hides that text from screen readers. This makes interactive elements like navigation links completely inaccessible on mobile if they don't have explicit labels.
**Action:** Always add an `aria-label` attribute to interactive parent elements (like `<Link>` or `<button>`) when their text content might be visually hidden using responsive utility classes, and mark child decorative icons with `aria-hidden="true"`.
