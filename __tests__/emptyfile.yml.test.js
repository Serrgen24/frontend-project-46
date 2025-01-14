import path from 'path';
import genDiff from '../bin/gendiff.js';

const __dirname = path.resolve();

const getFixturePath = (filename) => path.join(__dirname, '', '__fixtures__', filename);

test('genDiff', () => {
  const expectedData = '';
  const filePath1 = getFixturePath('emptyfile1.yml');
  const filePath2 = getFixturePath('emptyfile2.yaml');
  const actualData = genDiff(filePath1, filePath2);
  expect(actualData.trim()).toBe(expectedData.trim());
});
