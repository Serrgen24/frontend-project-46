import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getJsonOrYamlData = (data, extention) => (path.extname(extention) === 'json' ? JSON.parse(data) : yaml.load(data));

const getParsedData = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');
  const parsedData1 = data1 ? getJsonOrYamlData(data1, absolutePath1) : '';
  const parsedData2 = data2 ? getJsonOrYamlData(data2, absolutePath2) : '';
  return [parsedData1, parsedData2];
};

export default getParsedData;
