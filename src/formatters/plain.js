const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, parentKey = '') => {
  const lines = diff.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    switch (type) {
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      case 'nested':
        return formatPlain(children, fullKey);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
