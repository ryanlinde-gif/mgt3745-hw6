// Extracted from the bolt.new build: project/src/components/SkillMatch.tsx,
// lines 5 and 65-75. The arithmetic is copied unchanged; only the React
// wrapper (useMemo, props) was removed so the function can be called directly.
// Recorded in docs/DDR-001.md.

const MAX_TOP_SKILLS = 10;

export function shareOfTopSkills(rankedSkills, studentSkills) {
  const studentSkillSet = new Set(studentSkills);
  const ranked = [...rankedSkills].sort((a, b) => a.rank - b.rank);
  const used = ranked.slice(0, MAX_TOP_SKILLS);
  const topSkills = used.map((s) => ({ ...s, held: studentSkillSet.has(s.name) }));

  const totalUsed = topSkills.length;
  const heldCount = topSkills.filter((s) => s.held).length;
  const gapCount = totalUsed - heldCount;
  const belowHalf = totalUsed > 0 && heldCount < totalUsed / 2;

  return { heldCount, totalUsed, gapCount, belowHalf };
}
