## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Added ARIA Label and Focus States to Nav Links
**Learning:** Navigation `<Link>` elements that use responsive utilities (like `hidden sm:block`) for text labels lose their accessibility text on smaller screens. Screen readers receive no context for these links, seeing only an empty icon. Additionally, navigation links often lack explicit focus indicators, making keyboard navigation difficult.
**Action:** Always add an `aria-label` attribute to navigation elements that hide their text visually using CSS. Always include visual focus indicators (e.g., `focus-visible:ring-2`) and convey the active navigation link state using `aria-current="page"`.
