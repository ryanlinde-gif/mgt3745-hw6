// Extracted from the Google AI Studio build: builds/aistudio-src/index.html,
// function updateDisplay(). The arithmetic is copied unchanged; only the DOM
// writes were removed so the function can be called directly.
// Recorded in docs/DDR-002.md.
//
// Note for the reader: AI Studio never caps the list at ten. It counts against
// however many ranked skills the role supplies. That is invisible in its own
// build, because every role it invented has ten or fewer.

export function shareOfTopSkills(rankedSkills, studentSkills) {
  const studentSkillSet = new Set(studentSkills);
  const ranked = [...rankedSkills].sort((a, b) => a.rank - b.rank);

  const totalRanked = ranked.length;
  const heldCount = ranked.filter((s) => studentSkillSet.has(s.name)).length;
  const gapCount = totalRanked - heldCount;
  const halfCount = totalRanked / 2;
  const belowHalf = heldCount < halfCount;

  return { heldCount, totalUsed: totalRanked, gapCount, belowHalf };
}
