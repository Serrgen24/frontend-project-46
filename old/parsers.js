import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parse from './parse.js';

const getJsonOrYamlData = (data, extention) => (path.extname(extention) === 'json' ? JSON.parse(data) : yaml.load(data));

const getParsedData = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');
  const ext1 = path.extname(absolutePath1).startsWith('.') ? path.extname(absolutePath1).slice(1) : path.extname(absolutePath1);
  const ext2 = path.extname(absolutePath2).startsWith('.') ? path.extname(absolutePath2).slice(1) : path.extname(absolutePath2);
  const parsedData1 = parse(data1, ext1);
  const parsedData2 = parse(data2, ext2);
  console.log(path.extname(absolutePath1));
  return [parsedData1, parsedData2];
};

export default getParsedData;
