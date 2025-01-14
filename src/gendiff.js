import _ from 'lodash';
import getParsedData from './parsers.js';

const getSortedObjectByKeys = (object) => _.fromPairs(_.sortBy(_.toPairs(object), 0));

const genDiff = (filepath1, filepath2) => {
  const [data1, data2] = getParsedData(filepath1, filepath2);
  const sortedData1 = getSortedObjectByKeys(data1);
  const sortedData2 = getSortedObjectByKeys(data2);
  const keys = _.sortBy(_.union(Object.keys(sortedData1), Object.keys(sortedData2)));
  const diff = keys.map((key) => {
    if (!_.has(sortedData1, key)) {
      return `  + ${key}: ${sortedData2[key]}`;
    }
    if (!_.has(sortedData2, key)) {
      return `  - ${key}: ${sortedData1[key]}`;
    }
    if (sortedData1[key] !== sortedData2[key]) {
      return `  - ${key}: ${sortedData1[key]}\n  + ${key}: ${sortedData2[key]}`;
    }
    return `    ${key}: ${sortedData1[key]}`;
  }).join('\n');
  console.log(diff);
  return diff;
};

export default genDiff;
