## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2024-04-27 - Global focus-visible overrides

**Learning:** Global CSS resets for inputs/textareas can conflict with generic `:focus-visible` styles, leading to double outlines or messy focus states when both are triggered.
**Action:** Always ensure you add a specific `input:focus-visible, textarea:focus-visible, select:focus-visible { outline: none; }` override when setting a global `*:focus-visible` to prevent conflicts with custom component border-color focus states.
