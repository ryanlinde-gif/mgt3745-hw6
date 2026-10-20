# HW6: Two Builders, One Specification

> Replace every line in angle brackets. A README that still carries template placeholders loses points.

## Feature

**Team repository:** https://github.com/aaronsarasota04/mgt3745-team-gamma
**Spec provenance:** copied from commit `5abbc1c5509800ce9898e9935eafdf94cf694cc0` on 2026-10-20

The team's `context/STYLE.md` and `context/SKILLS.md` are still Phase 2 preview
stubs on `main`, so this repository carries my own HW5 versions of those two
files, as the assignment allows. Every other file in `context/` is the team's,
unchanged, at the hash above.

**Feature:** F3, Share of Top Skills Held (J-Devon). Performance class.

EARS rows, copied unchanged from the team's `FEATURES.md`:

- F3-1. THE SYSTEM SHALL show how many of the 10 top-ranked skills for the role the student already has.
- F3-2. IF the student has fewer than half of the top-ranked skills, THEN THE SYSTEM SHALL still show the gap and SHALL NOT tell the student whether to apply, because the decision stays with the student.
- F3-3. IF the role has fewer than 10 ranked skills, THEN THE SYSTEM SHALL count against the skills it has and show the total used.

Teammates took the other features: Aaron F1, Prince F2.

## See It Work

| bolt.new | AI Studio |
|---|---|
| ![bolt build, blank preview](docs/img/bolt.png) | ![AI Studio build](docs/img/aistudio.png) |

**The bolt image is not a mistake.** That is bolt's own preview pane, in bolt,
after the build. It renders nothing. The page is backed by a Supabase Postgres
database bolt provisioned for itself, and with that database unreachable the
application has no fallback and shows white.

What makes it worth looking at is what bolt said about the same build:

> "Build and typecheck pass. The page is complete and meets every acceptance
> criterion."

It then described how each of F3-1, F3-2 and F3-3 was satisfied. The build and
the typecheck did pass. The page meets nothing, because the page does not
render.

The AI Studio build on the right opens from a local file with no network, no
server and no credentials, and is the screenshot you see.

This is the clearest single statement of the difference between the two builds.
bolt scored **4 of 4** on the shared code eval and AI Studio **3 of 4**: bolt's
arithmetic is genuinely the more correct of the two. But correctness lives in
`SkillMatch.tsx`, and what a teammate actually receives is a project that does
not start, under a summary saying it does.

A third image, [docs/img/bolt-log.png](docs/img/bolt-log.png), shows bolt
announcing "I'll use Bolt Database to persist role and student skill data"
before writing any feature code. Nothing in the prompt asked for persistence.
That decision and this blank pane are the same event, forty minutes apart.

## Status

**bolt satisfied 2 of 3 EARS rows fully and 1 partially; AI Studio the same, on
a different row.** On the shared code eval bolt passed 4 of 4 and AI Studio 3 of
4, so bolt is the more correct build. **I recommend AI Studio anyway, 93 to 36
on the weighted table**, because ADR-001 already chose our stack and AI Studio's
output is that stack, while bolt's has to be dismantled before any of it can be
used.

## How to Run the Evals

```bash
npm test
```

`evals/shared.test.js` runs four identical checks against each build's extracted
arithmetic, so the two face the same test: the ten-skill case (F3-1), a
six-skill role (F3-3), the below-half branch (F3-2), and a twelve-skill role
that F3-1 says must still count out of ten.

Expect **8 tests, 7 pass, 1 fail.** The failure is deliberate and is the point:

```
✖ aistudio: F3-1 a role with twelve ranked skills still counts out of ten
  12 !== 10
```

AI Studio never caps the list at ten. Every role it invented has ten or fewer
skills, so the defect is invisible in its own build and its own screenshots. It
surfaces only when both builds are handed the same input by a test neither of
them wrote. The bug is preserved rather than fixed, because fixing it during
extraction would have hidden the most useful thing this comparison found.

## Links

- [EVALS.md](EVALS.md): Prediction Stake and error log
- [COMPARISON.md](COMPARISON.md): evidence, spec gaps, and recommendation
- [JUDGMENT.md](JUDGMENT.md): judgment eval and agreement rate
- [prompts/PROMPT.md](prompts/PROMPT.md): the exact input both builders received
- [builds/](builds/): bolt.zip and aistudio.zip
- [docs/DDR-001.md](docs/DDR-001.md) (bolt.new), [docs/DDR-002.md](docs/DDR-002.md) (AI Studio)
- Team pull request proposing the FEATURES.md change: [mgt3745-team-gamma#16](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/16)
- Deployed Worker: not applicable. F3 is arithmetic over a ranked list and has no AI behaviour, so the Gemini proxy step was skipped, as the assignment allows.

## Hours

**Total 3.5.** Setup and spec provenance 0.4; writing the prompt and the
Prediction Stake 0.5; the two builder runs 0.4; evaluation, the shared test and
the row-by-row table 1.3; the memo, the judgment eval and the three DDRs 0.9.

## AI Use

| Tool | What it wrote | Record |
|---|---|---|
| bolt.new | The first build of F3, under test here | [docs/DDR-001.md](docs/DDR-001.md) |
| Google AI Studio | The second build of F3, under test here | [docs/DDR-002.md](docs/DDR-002.md) |
| Claude Opus 5 | The shared test and both adapters, the prose of COMPARISON.md, EVALS.md and these DDRs | [docs/DDR-003.md](docs/DDR-003.md) |

The feature choice, the three predictions, the five criteria, all five weights
and all ten scores are mine. DDR-003 records that split, and records the two
places I overrode the tool, including splitting COMPARISON.md into two commits
so the weights land in the history before the scores.

Claude Opus 5 is deliberately **not** the second grader in
[JUDGMENT.md](JUDGMENT.md), having helped produce the thing being judged.
