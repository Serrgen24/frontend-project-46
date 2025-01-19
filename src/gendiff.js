import _ from 'lodash';
import getParsedData from './getParsedData.js';
import stylish from './formatters/stylish.js';

const getSortedObjectByKeys = (object) => _.fromPairs(_.sortBy(_.toPairs(object), 0));

const genDiff = (filepath1, filepath2) => {
  const [data1, data2] = getParsedData(filepath1, filepath2);
  const sortedData1 = getSortedObjectByKeys(data1);
  const sortedData2 = getSortedObjectByKeys(data2);
  const keys = _.sortBy(_.union(Object.keys(sortedData1), Object.keys(sortedData2)));

  const diff = keys.map((key) => {
    if (_.isPlainObject(sortedData1[key]) && _.isPlainObject(sortedData2[key])) {
      return { key, type: 'nested', children: genDiff(sortedData1[key], sortedData2[key]) };
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

  const formattedDiff = stylish(diff, 1);

  return formattedDiff;
};

export default genDiff;
