import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const getParsedData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const extention = path.extname(absolutePath).slice(1);
  const parsedData = _.sortBy(_.toPairs(parsers(data, extention)), 0);
  const sortedData = _.fromPairs(_.sortBy(_.toPairs(parsedData), 0));
  return sortedData;
};

export default getParsedData;
