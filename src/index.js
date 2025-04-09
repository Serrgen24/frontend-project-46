import _ from 'lodash';
import parseFile from './parseFile.js';
import getFormatter from './formatters/index.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', oldValue: value1 };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diffTree = buildDiff(data1, data2);
  const format = getFormatter(formatName);
  return format(diffTree);
};

export default genDiff;
