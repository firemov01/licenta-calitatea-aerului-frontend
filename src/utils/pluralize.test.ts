import { describe, test } from 'vitest';

import pluralize from './pluralize';

describe('pluralize function', () => {
  test('returns a string', () => {
    const result = pluralize('test', 0);

    expect(typeof result).toBe('string');
  });

  test('returns word if negative amount is passed', () => {
    const result = pluralize('test', -5);

    expect(result).toBe('test');
  });

  test('leaves word the same if amount passed is 1', () => {
    const result = pluralize('test', 1);

    expect(result).toBe('test');
  });

  test('adds an "s" to the end of the word when number is 0', () => {
    const result = pluralize('test', 0);

    expect(result).toBe('tests');
  });

  test('adds an "s" to the end of the word when number is greater than 1', () => {
    const amounts = [2, 3, 5, 7, 12];
    const words = ['test', 'word', 'gateway', 'dog', 'cat'];
    const result = amounts.map((amount, index) => {
      return pluralize(words[index], amount);
    });

    expect(result).toStrictEqual([
      'tests',
      'words',
      'gateways',
      'dogs',
      'cats',
    ]);
  });

  test('if word ends in -s, -ss, -sh, -ch, -x, -z, add "es" to the end of word', () => {
    const amount = 3;
    const words = ['bus', 'truss', 'marsh', 'lunch', 'tax', 'blitz', 'potato'];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual([
      'buses',
      'trusses',
      'marshes',
      'lunches',
      'taxes',
      'blitzes',
      'potatoes',
    ]);
  });

  test('if word ends in consonant + y remove y and add "ies"', () => {
    const amount = 3;
    const words = ['city', 'puppy', 'activity'];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual(['cities', 'puppies', 'activities']);
  });

  test('if word ends in consonant + o add "es"', () => {
    const amount = 3;
    const words = [
      'buffalo',
      'banjo',
      'hero',
      'mango',
      'cargo',
      'radio',
      'potato',
    ];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual([
      'buffaloes',
      'banjoes',
      'heroes',
      'mangoes',
      'cargoes',
      'radios',
      'potatoes',
    ]);
  });

  test('if word ends in f or fe remove them and add "ves"', () => {
    const amount = 0;
    const words = ['wife', 'wolf', 'shelf'];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual(['wives', 'wolves', 'shelves']);
  });

  test('if word ends in "is" remove "is" and add "es"', () => {
    const amount = 2;
    const words = ['analysis', 'ellipsis'];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual(['analyses', 'ellipses']);
  });

  test('if word ends in "on" remove "on" and add "a"', () => {
    const amount = 2;
    const words = ['phenomenon', 'criterion'];

    const result = words.map((word) => pluralize(word, amount));

    expect(result).toStrictEqual(['phenomena', 'criteria']);
  });
});
