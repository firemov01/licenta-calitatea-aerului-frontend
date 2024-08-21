import pluralMap from './pluralizeMap';
/**
 * @note - This function handles general plural rules. Will not work for irregular nouns or any words whose plural is a exception to a general rule. Its recommended to test the specific word in this function to ensure it works for your use case. Failing cases can either be handled with a ternary statement for that specific word or with a more robust pluralizing library if needed.
 *
 * You can find many of the basic rules followed at this link here:
 * https://www.teflcourse.net/english-grammar-corner/changing-nouns-from-singular-to-plural/
 *
 * @param word - the noun you are want pluralized
 * @param amount - the amount of that object that you have
 * @returns - pluralized string
 */
function pluralize(word: string, amount: number): string {
  const lastLetter = word[word.length - 1];
  const lastTwoLetters = `${word[word.length - 2]}${lastLetter}`;

  const pluralUsed = pluralMap.get(lastTwoLetters) || pluralMap.get(lastLetter);

  let modifiedWord: string | undefined;

  if (['is', 'on'].includes(lastTwoLetters)) {
    modifiedWord = word.replace(lastTwoLetters, '');
  } else if (pluralUsed === 'ies') {
    modifiedWord = word.replace(lastLetter, '');
  } else if (pluralUsed === 'ves') {
    const matchedTwoLetters = pluralMap.get(lastTwoLetters) !== undefined;
    const lettersToRemove = matchedTwoLetters ? lastTwoLetters : lastLetter;

    modifiedWord = word.replace(lettersToRemove, '');
  }

  if (amount === 0 || amount > 1) {
    return `${modifiedWord || word}${pluralUsed || 's'}`;
  }

  return word;
}

export default pluralize;
