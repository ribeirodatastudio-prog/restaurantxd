## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Semantic HTML Forms for Keyboard Submissions
**Learning:** In a data-entry heavy app, wrapping inputs with standard `<div>` wrappers instead of semantic `<form>` tags breaks expected keyboard functionality (like pressing "Enter" to submit), and fields that only define a `placeholder` without an `aria-label` or `<label>` are practically invisible to screen-readers.
**Action:** When building inline forms, always use a semantic `<form>` element with an `onSubmit` handler. Ensure any `<button>` tags specify the correct `type` attribute (`"submit"` or `"button"`) to prevent accidental submissions. Always provide `aria-label` for inputs relying exclusively on placeholder text for visual context.
