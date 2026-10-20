// One test file, run against both builds, so they face an identical check.
// Feature F3, Share of Top Skills Held.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as bolt from "./impl/bolt.js";
import * as aistudio from "./impl/aistudio.js";

const builds = { bolt, aistudio };

const skills = (names) => names.map((name, i) => ({ name, rank: i + 1 }));

// A role with exactly ten ranked skills.
const TEN = skills([
  "JavaScript", "React", "Git", "HTML", "CSS",
  "Testing", "TypeScript", "Accessibility", "SQL", "CI/CD",
]);

// A role with six ranked skills, for F3-3.
const SIX = skills(["SQL", "Excel", "Python", "Tableau", "Statistics", "ETL"]);

// A role with twelve ranked skills. F3-1 says the count is against the
// TOP TEN, so a correct build must still use 10 here, not 12.
const TWELVE = skills([
  "JavaScript", "React", "Git", "HTML", "CSS",
  "Testing", "TypeScript", "Accessibility", "SQL", "CI/CD",
  "Docker", "GraphQL",
]);

for (const [name, impl] of Object.entries(builds)) {
  test(`${name}: F3-1 counts held skills against the ten top-ranked`, () => {
    const r = impl.shareOfTopSkills(TEN, ["JavaScript", "React", "Git"]);
    assert.equal(r.heldCount, 3);
    assert.equal(r.totalUsed, 10);
  });

  test(`${name}: F3-3 a role with six ranked skills counts out of six`, () => {
    const r = impl.shareOfTopSkills(SIX, ["SQL", "Excel", "Python", "Tableau"]);
    assert.equal(r.totalUsed, 6, "total used must be the skills the role has");
    assert.equal(r.heldCount, 4);
    assert.equal(r.belowHalf, false, "4 of 6 is not below half");
  });

  test(`${name}: F3-2 below-half is computed, not asserted as advice`, () => {
    const r = impl.shareOfTopSkills(TEN, ["JavaScript", "React"]);
    assert.equal(r.heldCount, 2);
    assert.equal(r.belowHalf, true);
    assert.equal(r.gapCount, 8, "the gap is still reported when below half");
  });

  test(`${name}: F3-1 a role with twelve ranked skills still counts out of ten`, () => {
    const r = impl.shareOfTopSkills(TWELVE, ["Docker", "GraphQL"]);
    assert.equal(
      r.totalUsed,
      10,
      "F3-1 says the 10 top-ranked skills; a role with 12 must not count out of 12",
    );
    assert.equal(
      r.heldCount,
      0,
      "Docker and GraphQL are ranked 11 and 12, outside the top ten",
    );
  });
}
