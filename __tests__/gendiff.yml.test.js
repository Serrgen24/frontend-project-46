import path from 'path';
import genDiff from '../src/index.js';

const __dirname = path.resolve();

const getFixturePath = (filename) => path.join(__dirname, '', '__fixtures__', filename);

test('genDiff', () => {
  const expectedData = `
{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}
`.trim();

  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yaml');
  const actualData = genDiff(filePath1, filePath2);
  const normalize = (str) => str.replace(/\s+/g, ' ').trim();
  expect(normalize(actualData)).toBe(normalize(expectedData));
});
