## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Added ARIA Labels to Placeholder-Only Inputs
**Learning:** Inputs, selects, and textareas that rely solely on `placeholder` attributes without explicit `<label>` elements are inaccessible to screen readers, leaving users unaware of the expected input.
**Action:** Always add an `aria-label` attribute to form controls that lack a visible, programmatically associated `<label>`. If a visible `<label>` exists, always connect it to the input using `htmlFor` and `id`.
