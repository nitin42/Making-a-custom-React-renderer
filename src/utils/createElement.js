import { Document, Text, WordDocument } from '../components/';

// Creates an element with an element type, props and a root instance
function createElement(type, props, root) {
  const COMPONENTS = {
    ROOT: () => new WordDocument(),
    TEXT: () => new Text(root, props),
    DOCUMENT: () => new Document(root, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export default createElement;
