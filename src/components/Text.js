class Text {
	constructor(root, props) {
		this.root = root;
		this.props = props;

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

export default Text;
