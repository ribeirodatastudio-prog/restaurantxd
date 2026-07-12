## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Missing ARIA Labels for Placeholder-Only Inputs
**Learning:** Many forms in the app (`NewVisitForm.tsx`, `WishlistActions.tsx`, `PeopleManager.tsx`) rely exclusively on placeholder text for layout efficiency. These input, select, and textarea elements lack explicit `<label>` tags, making them unidentifiable for screen reader users.
**Action:** When a visible `<label>` is intentionally omitted in favor of a placeholder, always add a descriptive `aria-label` attribute to the form control to ensure accessibility without breaking the visual design. When a visible `<label>` is present, ensure it is linked to the input via `htmlFor` and `id`.
