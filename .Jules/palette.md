## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.

## 2024-05-01 - Conditional Form Focus and Explicit Labels
**Learning:** In interactive UI elements that conditionally reveal forms (like inline 'add' forms), the user's primary action is usually immediate typing. Furthermore, unassociated `<label>` elements are a critical accessibility issue.
**Action:** Always add an `autoFocus` property to the first text input of conditionally rendered inline forms to allow immediate interaction. Furthermore, if using `<label>` tags, ensure they are explicitly associated with their input using `htmlFor` and an `id`, or wrap the input with the label. Finally, provide descriptive `aria-label`s for single inputs that lack a visible `<label>` text.
