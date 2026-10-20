# EVALS.md

Feature under test: **F3, Share of Top Skills Held**, from the team
`FEATURES.md`. Three EARS rows, two of them IF rows, one of which is a
prohibition.

## Prediction Stake

Committed before either builder was opened. The commit timestamp on this file
is the evidence. These predictions are not edited; they are resolved beneath.

### Tight (a count)

**bolt.new will satisfy 1 of my 3 EARS rows; AI Studio will satisfy 1 of 3.**

Both should satisfy **F3-1**, showing how many of the ten top-ranked skills the
student already has, because it is the visible point of the feature and nothing
looks finished without it.

I expect both to violate **F3-2**, which says the system SHALL NOT tell the
student whether to apply. F3-2 is a prohibition. A builder optimising for a
product that feels helpful will add a verdict: a percentage match, a "strong
candidate" banner, a recommendation to build skills before applying. The row
does not ask for a feature, it asks for restraint, and restraint is not the
default behaviour of a tool trained to produce something impressive.

I expect both to miss **F3-3**, the case where the role has fewer than ten
ranked skills, because it is an edge case that never fires on whatever sample
data the builder invents for itself.

**Resolution (2026-10-20): wrong, and wrong in the same direction for both.**
**bolt satisfied 2 of 3 rows fully, AI Studio satisfied 2 of 3.** I predicted 1
and 1.

Each has one Partial rather than a Fail, and they are not the same row. bolt is
Partial on F3-2, for rendering the below-half case as an amber alert; AI Studio
is Partial on F3-1, for never capping the list at ten. On the code eval, bolt
passed 4 of 4 and AI Studio 3 of 4.

**The reasoning behind the prediction was wrong, not just the number.** I argued
a tool trained to produce something impressive would not respect a prohibition.
Both builders wrote a comment naming F3-2 and both wrote a sentence handing the
decision back to the student. An explicit SHALL NOT, with its rationale attached,
is a requirement these builders take seriously. What they do not take seriously
is everything the spec leaves unsaid.

### Loose (a direction with a reason)

**bolt.new will touch more files and add more dependencies than the feature
needs; AI Studio will stay closer to plain files.** In HW5 bolt.new shipped
nineteen dependencies nobody asked for and a hidden instruction file that
contradicted our standards. X6 in our own `FEATURES.md` excludes front-end
frameworks and build steps, and that exclusion is deliberately not in the
prompt, so bolt has no reason to respect it.

**Resolution (2026-10-20): confirmed, by a wider margin than I expected.**

| | bolt.new | AI Studio |
|---|---|---|
| Files, excluding `node_modules` | **20** | **1** |
| Direct dependencies | **18** | **0** |
| Hosted services provisioned | 1 (Supabase Postgres, with a migration and seed rows) | 0 |
| Hidden instruction files | 1 (`.bolt/prompt`) | 0 |
| Credentials in the download | 1 (`.env`, live Supabase URL and anon key) | 0 |

bolt stood up a Postgres database to answer how many of ten strings a student
already has. That breaks X5 and X6 in our own `FEATURES.md`, neither of which
was in the prompt, which is the point: it is what a builder does when nobody
tells it not to.

### Open (a question the builds can answer)

**F3 never says where "the 10 top-ranked skills" come from.** The ranking is F2
and the gap computation is F1, and neither is in the prompt. Will either builder
stop and ask, or will both silently invent their own ranking? If both invent
one, will they invent the same one?

If both builders guess, and guess differently, that is not a weakness in either
builder. It is a hole in our specification, and closing it is my team's work.

**Resolution (2026-10-20): neither asked. Both invented. They invented
differently.**

bolt created four roles and seeded them into a Supabase table through a
migration. AI Studio created four different roles and hardcoded them in a
`ROLES_DATA` object. Different roles, different skills, different rankings, and
neither builder paused to ask where the ranking was supposed to come from.

**That is the answer, and it is a finding about my team rather than about either
builder.** F3 is scored against a ranking F3 does not define. Every member of
this team is about to hand a builder one feature's rows in Phase 2, and the
silence I found here is in every one of those prompts.

The proposed fix is F3-0 in COMPARISON.md, and more importantly the last row of
the Spec Gaps table: **our exclusions are invisible to anyone working feature by
feature**, because X1 to X6 live in a section no feature-scoped prompt carries.

## Error Log

Most frequent first. The top row is the first finding in COMPARISON.md.

| Error | Builder | Frequency | EARS row | Evidence |
|---|---|---|---|---|
| Invented the ranked-skill data instead of asking where it comes from | **both** | 2 of 2 builders | F3-1 | `supabase/migrations/20261020220628_*.sql`; `index.html` `ROLES_DATA` |
| Broke an exclusion the prompt did not carry | bolt | 2 (X5 and X6) | n/a | `package.json` 18 deps; the Supabase migration |
| Never caps the ranked list at ten | AI Studio | 1 | F3-1 | `npm test`, twelve-skill case fails: 12 !== 10 |
| Delivers a verdict by styling that the text refuses to give | bolt | 1 | F3-2 | `SkillMatch.tsx:338`, amber alert and warning triangle |
| Shipped a live credential in the download | bolt | 1 | n/a | `project/.env`, removed before committing; see docs/DDR-001.md |
| Hard-codes colours outside `:root` despite the prompt | bolt | many | n/a | inline `style={{ }}` plus Tailwind classes throughout `SkillMatch.tsx` |

The top row is the first finding in [COMPARISON.md](COMPARISON.md): both
builders filled the same silence, and filled it differently.
