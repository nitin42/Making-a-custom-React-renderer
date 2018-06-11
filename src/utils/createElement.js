import { Text, WordDocument } from '../components/';

let ROOT_NODE_INSTANCE = null;

function getHostContextNode(rootNode) {
	if (typeof rootNode !== undefined) {
		return (ROOT_NODE_INSTANCE = rootNode);
	} else {
		console.warn(`${rootNode} is not an instance of officegen docx constructor.`);

		return (ROOT_NODE_INSTANCE = new WordDocument());
	}
}

// Creates an element with an element type, props and a root instance
function createElement(type, props) {
	const COMPONENTS = {
		ROOT: () => new WordDocument(),
		TEXT: () => new Text(ROOT_NODE_INSTANCE, props),
		default: undefined,
	};

	return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };
