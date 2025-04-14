import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const testCases = [
    {
      name: 'stylish format (default)',
      file1: 'file1.json',
      file2: 'file2.json',
      format: undefined,
      expected: readFile('stylish-format.txt'),
    },
    {
      name: 'stylish format with yaml',
      file1: 'file1.yml',
      file2: 'file2.yaml',
      format: undefined,
      expected: readFile('stylish-format.txt'),
    },
    {
      name: 'plain format',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'plain',
      expected: readFile('plain-format.txt'),
    },
    {
      name: 'json format',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'json',
      expected: readFile('json-format.txt'),
    },
  ];

  test.each(testCases)('$name', ({
    file1, file2, format, expected,
  }) => {
    const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
    expect(actual.trim()).toEqual(expected.trim());
  });
});
