const getSpace = (depth = 0) => ' '.repeat(depth * 4);

const stylish = (diff, depth) => {
  const lines = diff.map(({
    key, type, value, oldValue, newValue,
  }) => {
    const indent = getSpace(depth);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${value}`;
      case 'deleted':
        return `${indent}- ${key}: ${oldValue}`;
      case 'changed':
        return `${indent}- ${key}: ${oldValue}\n${indent}+ ${key}: ${newValue}`;
      case 'unchanged':
        return `${indent}  ${key}: ${value}`;
      case 'nested':
        return `${indent}  ${key}: ${stylish(value, depth + 1)}`;
      default:
        return '';
    }
  });
  return `{\n${lines.join('\n')}\n${getSpace(depth - 1)}}`;
};

export default stylish;
