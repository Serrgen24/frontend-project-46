import path from 'path';
import genDiff from '../src/gendiff.js';

const __dirname = path.resolve();

const getFixturePath = (filename) => path.join(__dirname, '', '__fixtures__', filename);

test('emptyfile', () => {
  const expectedData = '';
  const filePath1 = getFixturePath('emptyfile1.json');
  const filePath2 = getFixturePath('emptyfile2.json');
  const actualData = genDiff(filePath1, filePath2);
  expect(actualData.trim()).toBe(expectedData.trim());
});
