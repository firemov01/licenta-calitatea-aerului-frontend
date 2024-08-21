function toCamelCase(change: string): string {
  const hyphensToSpaces = change.replaceAll('-', ' ');
  const underscoresToSpaces = hyphensToSpaces.replaceAll('_', ' ');

  const trimmed = underscoresToSpaces.trim();

  const allLower = trimmed.toLowerCase();
  const split = allLower.split(' ');

  const camelCase = split.map((word, index) => {
    if (index === 0) return word;
    return word[0].toUpperCase() + word.slice(1);
  });

  const joinedCamelCase = camelCase.join('');

  return joinedCamelCase;
}

export default toCamelCase;
