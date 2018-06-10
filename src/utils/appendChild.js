// Platform specific API for appending child nodes
// Note: This will vary in different host environments. For example - In browser, you might use document.appendChild(child)
export function appendChild(child) {
	if (typeof child === 'string') {
		// Add the string and render the text node
		this.adder.addText(child)
	} else if (typeof child === 'object') {
		// It's a component
		child.render()
	}
}
