import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const getParsedData = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');
  const ext1 = path.extname(absolutePath1).slice(1);
  const ext2 = path.extname(absolutePath2).slice(1);
  const parsedData1 = parsers(data1, ext1);
  const parsedData2 = parsers(data2, ext2);
  return [parsedData1, parsedData2];
};

export default getParsedData;
