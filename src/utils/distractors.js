// Builds safe "distractor" players for multiple-choice / speed-round mode.
// Rules:
//  - Never include the target player.
//  - Never include another player with the same nationality as the target.
//  - Try to prefer players from different positions for visual variety.
//  - Falls back gracefully if the dataset is small.

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomDistractors(targetPlayer, allPlayers, count = 3) {
  if (!targetPlayer) return [];
  const pool = allPlayers.filter((p) => p.id !== targetPlayer.id);

  const differentCountry = shuffle(
    pool.filter((p) => p.nationality !== targetPlayer.nationality)
  );

  const sameCountry = shuffle(
    pool.filter((p) => p.nationality === targetPlayer.nationality)
  );

  const picks = [...differentCountry];
  while (picks.length < count && sameCountry.length > 0) {
    picks.push(sameCountry.shift());
  }
  return picks.slice(0, count);
}

export function buildMultipleChoiceOptions(targetPlayer, allPlayers, count = 4) {
  if (!targetPlayer) return [];
  const distractors = getRandomDistractors(targetPlayer, allPlayers, count - 1);
  return shuffle([targetPlayer, ...distractors]);
}
