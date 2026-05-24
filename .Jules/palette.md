## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Semantic Forms for Inline Creation Widgets
**Learning:** Inline creation widgets with multiple inputs (like those in `WishlistActions` and `PeopleManager`) were implemented using generic `<div>` wrappers instead of semantic `<form>` elements. This meant users couldn't submit data by simply pressing the 'Enter' key while typing, requiring an extra manual click on the "Salvar" button and hurting workflow efficiency.
**Action:** Always wrap inline forms with a semantic `<form>` element, attaching the submission logic to the `onSubmit` handler (and calling `e.preventDefault()`), and explicitly set `type="button"` on Cancel buttons to prevent accidental submissions. Add descriptive `aria-label`s to placeholder-only inputs.
