import _ from 'lodash';
import getParsedData from './getParsedData.js';
import stylish from './formatters/stylish.js';

/* перенес в getParsedData.
const getData = (filepath) => {
  const data = getParsedData(filepath);
  const sortedData = _.fromPairs(_.sortBy(_.toPairs(data), 0));
  return sortedData;
};
*/

const getDiff = (sortedData1, sortedData2) => {
  const keys = _.sortBy(_.union(Object.keys(sortedData1), Object.keys(sortedData2)));

  const diff = keys.map((key) => {
    if (_.isPlainObject(sortedData1[key]) && _.isPlainObject(sortedData2[key])) {
      return { key, type: 'nested', children: getDiff(sortedData1[key], sortedData2[key]) };
    }
    if (!_.has(sortedData1, key)) {
      return { key, type: 'added', value: sortedData2[key] };
    }
    if (!_.has(sortedData2, key)) {
      return { key, type: 'deleted', oldValue: sortedData1[key] };
    }
    if (sortedData1[key] !== sortedData2[key]) {
      return {
        key, type: 'changed', oldValue: sortedData1[key], newValue: sortedData2[key],
      };
    }
    return { key, type: 'unchanged', value: sortedData1[key] };
  });
  return diff;
};

const genDiff = (filepath1, filepath2) => {
  const a = getDiff(getParsedData(filepath1), getParsedData(filepath2));
  const result = stylish(a);
  return result;
};

export default genDiff;
