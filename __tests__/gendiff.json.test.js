import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);

describe('genDiff', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  test('json format output', () => {
    const result = genDiff(file1, file2, 'json');

    expect(() => JSON.parse(result)).not.toThrow();

    const parsed = JSON.parse(result);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);

    const commonNode = parsed.find((node) => node.key === 'common');
    expect(commonNode).toEqual({
      key: 'common',
      type: 'nested',
      children: expect.arrayContaining([
        {
          key: 'follow',
          type: 'added',
          value: false,
        },
        {
          key: 'setting3',
          type: 'changed',
          oldValue: true,
          newValue: null,
        },
      ]),
    });

    expect(parsed).toContainEqual({
      key: 'group2',
      type: 'deleted',
      oldValue: expect.any(Object),
    });
  });
});
