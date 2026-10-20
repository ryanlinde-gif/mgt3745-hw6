# PROMPT.md

The exact text both builders received, unchanged between them.

---

Build a single web page that shows a student how many of the top-ranked skills for their target role they already have, meeting every acceptance criterion below exactly.

## Acceptance criteria (F3, Share of Top Skills Held)

- F3-1. THE SYSTEM SHALL show how many of the 10 top-ranked skills for the role the student already has.
- F3-2. IF the student has fewer than half of the top-ranked skills, THEN THE SYSTEM SHALL still show the gap and SHALL NOT tell the student whether to apply, because the decision stays with the student.
- F3-3. IF the role has fewer than 10 ranked skills, THEN THE SYSTEM SHALL count against the skills it has and show the total used.

## Who this is for

Devon Carter, a student deciding whether to apply.

Job statement: "When I search for a tech position, I want to know whether I should apply even if I do not meet every listed requirement, so I can improve my chances without assuming I have to be the employer's ideal candidate."

Context: Devon applies for entry-level tech roles, relies on personal projects and existing experience, and was told by a recruiter that a job description describes the employer's preferred candidate rather than a strict checklist. Success looks like applying with confidence about fit.

## Visual style

Use these exact values as CSS custom properties on `:root`, and do not hard-code any colour outside that block:

```
--color-text: #172b40
--color-text-muted: #45586b
--color-background: #f7f9fb
--color-surface: #fafafa
--color-primary: #123552
--color-on-primary: #ffffff
--color-border: #526578
--color-divider: #b8c5d0
--color-focus: #b16d00
--color-danger: #922020
--color-attention: #7a3d00
--color-attention-surface: #ffe8c2
--font-body: system-ui
--font-size-min: 14px
--space-unit: 8px
--radius: 4px
```

Restraint over decoration: the result is the largest object on screen and the chrome stays out of the way. Body text must meet a 4.5:1 contrast ratio and interface components 3:1.

---

## Retries

None yet. Any retry is recorded here and in that builder's DDR.
