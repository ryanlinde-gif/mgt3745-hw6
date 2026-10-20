# COMPARISON.md

Feature F3, Share of Top Skills Held. Both builders received
[prompts/PROMPT.md](prompts/PROMPT.md), unchanged, once each. No follow-up
prompts and no retries.

## Row-by-Row Evidence

| EARS row | bolt.new | Evidence | AI Studio | Evidence |
|---|---|---|---|---|
| F3-1 show how many of the 10 top-ranked skills the student has | **Pass** | `SkillMatch.tsx:67` slices to `MAX_TOP_SKILLS = 10`, renders "You already have 3 of the 10 most important skills" | **Partial** | `updateDisplay()` uses `role.skills.length` with no cap. Correct for every role it shipped, wrong for any role with more than ten. `npm test` fails this case |
| F3-2 below half: still show the gap, SHALL NOT say whether to apply | **Partial** | `SkillMatch.tsx:338` branches on `belowHalf`, shows the gap, text says "Whether to apply is your call". But it renders the below-half case **only** in an amber alert box with a warning triangle, while the at-or-above-half case is a plain muted paragraph. The styling is conditional on doing badly, which signals a verdict the words refuse to give. Judged in [JUDGMENT.md](JUDGMENT.md) | **Pass** | `updateDisplay()` branches on `heldCount < halfCount`, shows the gap, and says "the choice of whether to submit an application stays with you". It uses the same amber `--color-attention-surface` as bolt, but shows that box in **both** branches, so the colour is persistent framing rather than a signal that the student did badly |
| F3-3 role with fewer than 10 ranked skills: count against what it has, show the total used | **Pass** | `totalUsed = topSkills.length` after the slice, so a six-skill role reports 6. `npm test` passes | **Pass** | `if (totalRanked < 10)` prints "All calculations count against this total of 7". Shipped two roles with 7 and 6 skills to exercise it. `npm test` passes |

**Code eval.** `npm test` runs one file, `evals/shared.test.js`, against both
builds' extracted arithmetic. Four identical checks per build.
**bolt 4 of 4. AI Studio 3 of 4.** The failure is the twelve-skill case
described under F3-1.

## Scope Creep

| | bolt.new | AI Studio |
|---|---|---|
| Files created that the feature did not need | **20** | **1** (the whole build) |
| Direct dependencies added | **18** | **0** |
| Additions the spec excludes | React, TypeScript, Vite, Tailwind, ESLint, PostCSS (**X6**, no front-end framework and no build step); a hosted Supabase Postgres database with a migration and seed data (**X5**, no third-party backend or hosted database) | None |
| Credentials shipped in the download | **Yes.** `.env` containing a live `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Removed before committing `builds/bolt.zip`; recorded in [docs/DDR-001.md](docs/DDR-001.md) | None |
| Hidden instruction files | **Yes.** `.bolt/prompt`, which I did not write, instructing it to make designs "beautiful, not cookie cutter" and "fully featured and worthy for production" | None |

X5 and X6 were deliberately **not** in the prompt. The prompt carried the three
F3 rows, the Devon persona, and the style tokens, exactly as the assignment
specifies. A builder cannot be blamed for breaking a rule it was never shown.
What the counts measure is what each builder does when the spec is silent.

## Judgment Eval

Agreement rate with the second grader: _pending_. Details in
[JUDGMENT.md](JUDGMENT.md).

## Findings

**1. The prohibition was the row both builders handled best, not worst.** My
Tight prediction was that both would violate F3-2, because a tool trained to
produce something impressive would add a verdict. Both did the opposite. Both
wrote a comment naming F3-2 and both wrote a sentence handing the decision back
to the student. The prediction was wrong and the reasoning behind it was wrong:
an explicit SHALL NOT, stated with its rationale attached, is a requirement
these builders take seriously.

**2. Where they diverged was everything the spec did not say.** Three EARS rows
produced a 20-file React application with a Postgres database from one builder
and a single 494-line HTML file from the other. Both satisfy the rows. The
difference is not correctness, it is what each builder assumes when nobody tells
it otherwise, and that difference is 18 dependencies wide.

**3. The code eval found a defect that neither build could show.** AI Studio
never caps the list at ten. Every role it invented has ten or fewer skills, so
the bug is invisible in its own build, in its own screenshots, and to any
reviewer reading its output rather than its logic. It only appears when both
builds are handed the same twelve-skill role by a test they did not write. That
is the argument for code evals over screenshots in one example.

**4. bolt put a credential in a file it handed me.** Not in the page, in a
`.env` in the project root, which would have gone into this public repository
inside `builds/bolt.zip` had I committed the download unchanged. The key is a
Supabase anon key rather than a service key, so the blast radius is small, but
`STANDARDS.md` rule 9 says no credentials in repositories, ever, and I co-own
that file.

## Spec Gaps

Every place where both builders guessed, or guessed differently.

| Gap | What each builder assumed | EARS change or exclusion that closes it |
|---|---|---|
| **F3 never says where the ten top-ranked skills come from.** The ranking is F2 and the gap is F1; neither is in F3 | bolt invented four roles and seeded them into a Supabase table. AI Studio invented four different roles and hardcoded them in a JS object. Neither asked. Different data, different rankings, same silence | Add **F3-0**: "THE SYSTEM SHALL take the ranked skill list for the role from F2 and SHALL NOT generate, seed, or invent ranked skills of its own." |
| **F3-1 says "the 10 top-ranked skills" but never says what to do when there are more than ten** | bolt capped at 10. AI Studio counted against all of them. Both readings are defensible from the text | Amend **F3-1**: "...SHALL count against the ten highest-ranked skills for the role, and SHALL ignore any skill ranked below tenth." |
| **"fewer than half" does not say whether exactly half counts as below** | Both used strict less-than, so both agree, but by luck rather than instruction | Amend **F3-2**: "...fewer than half, where exactly half is not fewer than half..." |
| **F3 never says what counts as the student "having" a skill** | Both used exact string matching. F1-3 requires case-and-whitespace-insensitive matching, but F1-3 is in F1, and a builder given only F3 never sees it | Add to **F3-1**: "...matching skills as F1-3 requires, without regard to capitalization or extra spaces." |
| **Nothing in F3 tells a builder the system has no backend** | bolt built a hosted Postgres database. X5 and X6 exist in `FEATURES.md` but live in the Exclusions section, which a feature-scoped prompt never carries | Reference the exclusions from the feature: add to F3 "Subject to X5 and X6," or move the binding exclusions into each feature's rows |

The last one is the finding my team can act on tonight: **our exclusions are
invisible to anyone working feature by feature.** Every member of this team is
about to hand a builder one feature's rows in Phase 2, and none of those prompts
will carry X1 through X6 unless the rows themselves point at them.

## Recommendation

### Criteria and Weights (committed before scoring)

| Criterion | Weight (1 to 5) | Why |
|---|---|---|
| Fits the stack ADR-001 commits us to | 5 | ADR-001 is decided: a Cloudflare Worker, D1, and a static page of plain HTML, CSS, and JavaScript. A build that does not fit that is not a head start, it is a rewrite. Heaviest weight because it is the only criterion that can make a build worth zero. |
| Respects the exclusions in FEATURES.md | 5 | X5 and X6 are team decisions with reasons behind them. A builder that breaks them produces work we have to undo, and undoing is slower than writing. Equal heaviest for the same reason. |
| Correctness against the EARS rows | 4 | Measured, not asserted: the row-by-row table and `npm test`. High, but below the two above, because a correct build on the wrong stack still cannot ship and a small defect on the right stack is an afternoon. |
| Review and integration cost | 3 | How much of my week disappears into making the output ours. Real but recoverable. |
| Trust boundary behaviour | 3 | What the builder sends out, what it brings back, and what it leaves lying around. Phase 2 will hold a student's self-assessed skills, so this stops being hypothetical. |

Maximum possible: 100.

### Scores (committed after the weights)

| Criterion | Weight | bolt.new | AI Studio |
|---|---|---|---|
| Fits the stack ADR-001 commits us to | 5 | 1 | 5 |
| Respects the exclusions in FEATURES.md | 5 | 1 | 5 |
| Correctness against the EARS rows | 4 | 5 | 4 |
| Review and integration cost | 3 | 1 | 4 |
| Trust boundary behaviour | 3 | 1 | 5 |
| **Weighted total (max 100)** | | **36** | **93** |

**Notes on the scores.**

- **bolt scores 5 on correctness and still loses by 57 points.** It is the more
  correct build. It passed all four code-eval checks and AI Studio did not. It
  loses on everything that is not correctness, and the weights say that is the
  right way to lose, because correctness on the wrong stack is work we throw away.
- **bolt scores 1, not 2, on fitting the stack.** React, TypeScript, Vite,
  Tailwind and Supabase. Not one of those survives contact with ADR-001. There is
  no partial credit available: the arithmetic in `SkillMatch.tsx` is three lines
  and I could retype it from the EARS rows faster than I could strip the project
  around it.
- **AI Studio scores 4, not 5, on correctness** because of the twelve-skill
  defect. It is a real bug, the test proves it, and it is a two-line fix.
- **bolt scores 1 on trust boundary** for the `.env`, not for using Supabase.
  Choosing a database when the spec is silent is a judgment I disagree with.
  Writing a live key into a file it hands back is a different kind of problem.

### Decision

**Use Google AI Studio for F3 in Phase 2. 93 to 36.**

The reason is not that AI Studio is the better builder in general. On the only
criterion that measures whether the thing works, bolt beat it. The reason is
that ADR-001 already decided our stack, and AI Studio's output is that stack:
one file of plain HTML, CSS and JavaScript, no build step, no dependencies,
`createElement` and `textContent` throughout, which happens to satisfy
`STANDARDS.md` rules 2 and 5 without ever having been shown them. It drops into
a Cloudflare Worker and a static page with no translation. bolt's output has to
be dismantled first.

**What gets harder with this choice, named.** Three things.

First, **AI Studio hands back one 494-line file with no structure.** No
components, no modules, no types, no tests. F3 is small enough that this does
not hurt. F1 is ten rows and will not be. Whoever takes AI Studio into a larger
feature inherits a file that gets worse every time it grows, and nothing in the
tool pushes back.

Second, **AI Studio gave no scaffolding at all.** bolt produced a runnable
project with a dev server, a migration, and seeded data. AI Studio produced a
page with its data hardcoded in a JS object. Wiring F3 to the real Worker and
D1 is manual work that bolt would have half-done, badly, in the wrong place.

Third, and most honestly, **this recommendation rests on one feature and one
prompt each.** F3 is three rows of arithmetic. It is the smallest feature we
have. A result from the smallest feature is the weakest evidence for the
largest one, and F1 is what Phase 2 actually needs.

**The recommendation I would defend harder than the builder choice:** put the
exclusions inside the feature rows. Both builders were handed a silent spec and
both filled the silence, and the 57-point gap between them is almost entirely
made of guesses neither was asked to make.

## Handoff to the Team

Pull request proposing a FEATURES.md change: **[mgt3745-team-gamma#16](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/16)**

It adds **F3-0** (take the ranking from F2, do not invent one), tightens F3-1
with the ten-skill cap and the F1-3 matching rule, settles "exactly half" in
F3-2 and forbids warning styling that appears only below half, marks F3 subject
to X5 and X6, and adds a note at the top of the Exclusions section explaining
why a feature-scoped prompt never carries them.

The team decides whether to merge it. My job was to put the evidence in front
of them.
