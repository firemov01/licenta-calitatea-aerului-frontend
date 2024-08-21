import { describe, test } from 'vitest';

import toCamelCase from './toCamelCase';

describe('toCamelCase Utility Function', () => {
  test('takes and returns a string', () => {
    const response = toCamelCase('string');
    expect(typeof response).toBe('string');
  });

  test('only capitalized the first letter of each word starting with the second word when all characters were lowercase', () => {
    const data = 'mobile phone number';

    const response = toCamelCase(data);

    expect(response).toBe('mobilePhoneNumber');
  });

  test('only capitalized the first letter of each word starting with the second word when all characters were uppercase', () => {
    const data = 'MOBILE PHONE NUMBER';

    const response = toCamelCase(data);

    expect(response).toBe('mobilePhoneNumber');
  });

  test('removes all spaces from passed string', () => {
    const data = 'a sentence full of spaces ';

    const response = toCamelCase(data);

    expect(response).toBe('aSentenceFullOfSpaces');
  });

  test('removes all hyphens from passed string', () => {
    const data = 'a-sentence-full-of-hyphens-';

    const response = toCamelCase(data);

    expect(response).toBe('aSentenceFullOfHyphens');
  });

  test('removes all underscores from passed string', () => {
    const data = 'a_sentence_full_of_underscores_';

    const response = toCamelCase(data);

    expect(response).toBe('aSentenceFullOfUnderscores');
  });
});
