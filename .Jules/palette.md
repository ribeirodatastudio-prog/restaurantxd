## 2025-02-18 - Added ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in interactive forms and modals (like the ones used in `NewVisitForm.tsx`, `PeopleManager.tsx`, and `WishlistActions.tsx`) are completely invisible to screen readers without proper aria-labels.
**Action:** Always add an `aria-label` attribute describing the action of the button when a button contains only an icon and no visible text.
## 2025-02-18 - Fix Keyboard Accessibility & ARIA in StarRating
**Learning:** The interactive half-star rating inputs in `components/StarRating.tsx` were structurally implemented using clickable `<span>` elements without ARIA labels or focus ring handling, making them completely inaccessible to keyboard and screen-reader users.
**Action:** Use native interactive elements like `<button>` tags with proper `aria-label` definitions. Use existing design system styling classes (`focus-visible:ring-2` etc.) combined with React `onFocus`/`onBlur` event listeners to provide reliable, visually consistent focus states.
## 2025-02-18 - Added ARIA States and Focus Styles to Custom Toggle Buttons
**Learning:** Custom interactive elements like tag buttons acting as toggles (e.g., selecting people or "would order again" options) are inaccessible to keyboard and screen reader users if they only rely on visual class changes (like `tag-accent`) for state, and lack explicit focus styles.
**Action:** When creating custom toggle buttons using generic classes, always add the `aria-pressed` attribute to programmatically convey the active state to assistive technologies, and include explicit focus styles (e.g., Tailwind's `focus-visible:ring-2 focus-visible:ring-[#c9a96e]`) to ensure keyboard navigability.
