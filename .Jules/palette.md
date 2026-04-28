## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2024-04-28 - Missing ARIA Labels on Mobile Navigation
**Learning:** Using `hidden sm:block` on navigation labels hides them visually but also removes them from the accessibility tree, making the links effectively unlabeled for screen reader users on mobile devices.
**Action:** Always provide an `aria-label` on navigation links that rely on icons or visually hidden text on certain breakpoints.
