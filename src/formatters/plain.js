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
    const { key, type } = node;
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    switch (type) {
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, fullKey);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;
