## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Fixed Navigation Accessibility
**Learning:** Using responsive utility classes like Tailwind's `hidden sm:block` to visually hide text inside navigation links removes the text from screen readers as well, making the link inaccessible if there isn't a fallback.
**Action:** When hiding text inside interactive components for smaller screens, ensure the parent element (like `<Link>`) explicitly defines an `aria-label` attribute. Also, remember to add `aria-current="page"` to active links and provide keyboard focus styles (`focus-visible:ring-2`) to convey interactive and active states effectively.
