## 2024-05-04 - Missing ARIA States on Custom Interactive Elements
**Learning:** Custom interactive elements in this app, like tags acting as toggles, custom disclosure widgets, and active navigation links, often lack the ARIA state attributes necessary to programmatically convey their active or expanded visual states to assistive technologies.
**Action:** When building or updating custom interactive elements (e.g., tag buttons, disclosures, nav links), always verify and add appropriate ARIA state attributes (`aria-pressed`, `aria-expanded`, `aria-current`) to ensure they are accessible.
