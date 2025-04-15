import _ from 'lodash';

const getSpace = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => {
    const currentIndent = ' '.repeat(depth * 4);
    return `${currentIndent}${key}: ${stringify(val, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

const stylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const indent = getSpace(depth);
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${key}: ${stringify(oldValue, depth + 1)}`;
      case 'changed': {
        const oldStr = `${indent}- ${key}: ${stringify(oldValue, depth + 1)}`;
        const newStr = `${indent}+ ${key}: ${stringify(newValue, depth + 1)}`;
        return `${oldStr}\n${newStr}`;
      }
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
      case 'nested':
        return `${indent}  ${key}: ${stylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default stylish;
