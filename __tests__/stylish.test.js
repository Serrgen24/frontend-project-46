import stylish from '../src/formatters/stylish.js';

test('stylish', () => {
  const diff = [
    { key: 'key1', type: 'added', value: 'value1' },
    { key: 'key2', type: 'deleted', oldValue: 'oldValue2' },
    { key: 'key3', type: 'changed', oldValue: 'oldValue3', newValue: 'newValue3' },
    { key: 'key4', type: 'unchanged', value: 'value4' },
    { key: 'key5', type: 'nested', value: [
      { key: 'nestedKey1', type: 'added', value: 'nestedValue1' },
    ] },
  ];
  const expected = `{
    + key1: value1
    - key2: oldValue2
    - key3: oldValue3
    + key3: newValue3
      key4: value4
      key5: {q
        + nestedKey1: nestedValue1
    }
}`;

  expect(stylish(diff, 1)).toBe(expected);
});
