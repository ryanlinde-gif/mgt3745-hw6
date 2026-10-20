# JUDGMENT.md

## What Is Being Judged

**F3-2**, the only row in this feature that a code eval cannot settle:

> IF the student has fewer than half of the top-ranked skills, THEN THE SYSTEM
> SHALL still show the gap and SHALL NOT tell the student whether to apply,
> because the decision stays with the student.

A test can confirm the gap is still shown. It cannot confirm the second half.
Both builds say, in words, that the decision belongs to the student. They say
it differently, and the difference is **conditional styling**, not colour.

Both use the same amber `--color-attention-surface` from `STYLE.md`. The
distinction is when. AI Studio shows that amber box in **both** branches,
above and below half, so it reads as a standing note about how to use the
number. bolt shows the amber box **only** below half, with a warning triangle
and the bold headline "You have fewer than half of the top skills," and shows a
plain muted paragraph when the student is at or above half. bolt's colour is
earned by doing badly; AI Studio's is not.

So the question is whether **presentation** can tell a student whether to
apply while the **text** refuses to. That is a judgment about tone, and a
person has to make it.

Two style items are included as controls, because `STYLE.md` makes falsifiable
claims a second grader can check without trusting me.

## Procedure

A grader can follow this without asking me anything.

1. Open `builds/aistudio-src/index.html` in a browser. Select the role
   **Junior Frontend Developer**, which opens at 4 of 10, already below half.
   Read the whole result area. Then tick skills until 5 or more are held and
   read it again, so you see both branches.
2. Open `docs/img/bolt.png`, the bolt build in its below-half state, and read
   the whole result area.
3. Answer J1 to J5 below, Yes or No, from what is on screen. Do not read
   `COMPARISON.md` first; it contains my answers.
4. For any No, write one sentence saying what you saw.

## Evidence Given to the Second Grader

- `builds/aistudio-src/index.html` (opens directly in a browser)
- `docs/img/bolt.png` and `docs/img/aistudio.png`
- `builds/bolt-src/project/src/components/SkillMatch.tsx` for J4 and J5
- The F3-2 row above and the `STYLE.md` token list in `prompts/PROMPT.md`

No summary from me, and no access to `COMPARISON.md` before answering.

**Second grader:** _to be named: a classmate, or a model that had no part in
producing these files. Claude Opus 5 is not eligible; it wrote the evals and
the memo, recorded in docs/DDR-003.md._

## Results

| Item | Question (Yes / No) | Me | Second grader |
|---|---|---|---|
| J1 | Looking only at **AI Studio** in its below-half state: does anything on screen tell the student whether to apply? | No | |
| J2 | Looking only at **bolt** in its below-half state: does anything on screen tell the student whether to apply? | **Yes** | |
| J3 | If you answered Yes to J2, was it the **words** rather than the styling? | No | |
| J4 | Does the bolt build define every colour as a CSS custom property on `:root`, with no hex values hard-coded elsewhere, as the prompt required? | No | |
| J5 | Is the largest object on screen the result, as the prompt required of both? | Yes for both | |

**Agreement rate:** _pending, N of 5._

## My Answers, With Reasons

**J2 is the one that matters, and my first answer was wrong.** I initially
wrote that bolt used alert styling and AI Studio did not. That is false: both
use `--color-attention-surface`, and I only caught it by opening the AI Studio
build rather than reading its logic.

The real difference is that **bolt's amber is conditional and AI Studio's is
not.** bolt renders the amber box with a warning triangle only when the student
is below half, and a plain muted paragraph otherwise. A student who reads the
room before reading the sentence is being told that falling below half is the
state that warrants a warning. AI Studio shows the same amber in both branches,
so the colour carries no verdict about the number.

The sentence underneath says "whether to apply is your call" in both builds, and
I believe both meant it. But F3-2 exists because the team decided this system
does not render a verdict, and styling that appears only when you have done
badly is a verdict with the words removed. That is why bolt is **Partial** on
F3-2 rather than Pass, and why AI Studio is not.

**J3: no.** The words are clean in both builds. If bolt fails this row it fails
on styling alone, which is exactly why it needed a human.

**J4: no**, and this one a grader can check mechanically. bolt sets the tokens
on `:root` and then writes colours inline through `style={{ ... }}` on JSX
elements. It also layers Tailwind utility classes over them, which the prompt
did not ask for and which `FEATURES.md` X6 excludes.

## Disagreements

_To be filled after the second grader answers. For each disagreement: why, and
what it says about the question or about the evidence I gave._
