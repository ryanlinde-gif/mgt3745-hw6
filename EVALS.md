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

**Resolution (YYYY-MM-DD):** to be written after both builds exist.

### Loose (a direction with a reason)

**bolt.new will touch more files and add more dependencies than the feature
needs; AI Studio will stay closer to plain files.** In HW5 bolt.new shipped
nineteen dependencies nobody asked for and a hidden instruction file that
contradicted our standards. X6 in our own `FEATURES.md` excludes front-end
frameworks and build steps, and that exclusion is deliberately not in the
prompt, so bolt has no reason to respect it.

**Resolution (YYYY-MM-DD):** to be written after both builds exist.

### Open (a question the builds can answer)

**F3 never says where "the 10 top-ranked skills" come from.** The ranking is F2
and the gap computation is F1, and neither is in the prompt. Will either builder
stop and ask, or will both silently invent their own ranking? If both invent
one, will they invent the same one?

If both builders guess, and guess differently, that is not a weakness in either
builder. It is a hole in our specification, and closing it is my team's work.

**Resolution (YYYY-MM-DD):** to be written after both builds exist.

## Error Log

Most frequent first. The top row is the first finding in COMPARISON.md.

| Error | Builder | Frequency | EARS row | Evidence |
|---|---|---|---|---|

Filled after both builds are evaluated.
