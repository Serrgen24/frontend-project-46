import yaml from 'js-yaml';

const parse = (data, extention) => {
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return parsers[extention](data);
};

export default parse;
