import path from 'path';
import genDiff from '../src/gendiff.js';

const __dirname = path.resolve();

const getFixturePath = (filename) => path.join(__dirname, '', '__fixtures__', filename);

test('genDiff', () => {
  const expectedData = `
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
  `;
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const actualData = genDiff(filePath1, filePath2);
  expect(actualData.trim()).toBe(expectedData.trim());
});
