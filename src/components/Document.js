import { appendChild } from '../utils/appendChild';

class Document {
	constructor(root, props) {
		this.root = root;
		this.props = props;

		// docx instance for adding text nodes (Note - This text nodes are different when compared to DOM)
		this.adder = this.root.doc.createP();
	}

	appendChild(child) {
		// Platform specific API for appending child nodes
		// Note: This will vary in different host environments. For example - In browser, you might use document.appendChild(child)
		if (typeof child === 'string') {
			// Add the string and render the text node
			this.adder.addText(child);
		}
	}
}

export default Document;
