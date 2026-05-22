## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Added ARIA Labels to Placeholder-Only Inputs
**Learning:** Input fields, textareas, and select elements that rely exclusively on `placeholder` attributes (without explicit `<label>` elements) are inaccessible to screen reader users, as the placeholder text is not always reliably announced as the input's label. This pattern was found across forms in `NewVisitForm.tsx`, `WishlistActions.tsx`, and `PeopleManager.tsx`.
**Action:** Always provide an `aria-label` attribute on inputs, selects, and textareas when there is no visible `<label>` element associated via `htmlFor`. When a visible label *does* exist, always connect it to the input using `htmlFor` and `id`.
