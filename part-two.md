# Part-II

So in the [last section](./part-one.md) we built a React reconciler and saw how it manages the lifecycle of our renderer.

In part two, we'll create a public interface to the reconciler. We will design our component API and will also build a custom version
of `createElement` method.

## Components

For our example, we'll only implement one component `Text`. A `Text` component is the main component for adding the text to our document.

> Text component, however, doesn't create specific text node. It has different semantics when compared to the DOM APIs.

We will first create a root container (remember `rootContainerInstance` in our reconciler ?) for our components. This is responsible
for creating a document instance for [officegen](https://github.com/Ziv-Barber/officegen).

**`WordDocument.js`**

```js
import officegen from 'officegen'

// This creates the document instance
class WordDocument {
	constructor() {
		this.doc = officegen('docx')
	}
}

export default WordDocument
```

Now let's create our `Text` component.

**`Text.js`**

```js
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

```

Let's see what's going on here!

**`constructor()`**

In our `constructor`, we initialise the `root` instance and `props`. We also create a reference to our `doc` instance which we created earlier in `WordDocument.js`. This reference is then
use to create paragraph by adding text nodes to it.

Example -

```
this.adder.addText(__someText__)
```

**`appendChild`**

This method appends the child nodes using the platform specific function for `docx` i.e `appendChild`. Remember we used this in our reconciler's `appendInitialChild` method to check whether the
parent instance has a method called `appendChild` or not !?

```js
appendInitialChild(parentInstance, child) {
	if (parentInstance.appendChild) {
		parentInstance.appendChild(child);
	} else {
		parentInstance.document = child;
	}
}
```

Along with `appendChild` method, you can also add `removeChild` method to remove child nodes. Since our host target does not provide a mutative API for removing child nodes, we are not using this method.

> For this tutorial, the scope is kept limited for `Text` component. In a more practical example, you might want to validate the nesting of components too.

#### Note

- Do not track the children inside an array in your class component API. Instead, directly append them using specific host API, as React provides all the valuable information about the child (which was removed or added)

This is correct

```js
class MyComponent {
	constructor(rootInstance, props) {
		this.props = props
		this.root = rootInstance
	}

	appendChild(child) {
		some_platform_api.add(child)
		// In browser, you may use something like: document.appendChild(child)
	}
}
```

This is incorrect

```js
class MyComponent {
	children = []

	constructor(rootInstance, props) {
		this.props = props
		this.root = rootInstance
	}

	appendChild(child) {
		this.children.push(child)
	}

	renderChildren() {
		for (let i = 0; i < this.children.length; i++) {
			// do something with this.children[i]
		}
	}

	render() {
		this.renderChildren()
	}
}
```

- If you're rendering target does not provide a mutate method like `appendChild` and instead only lets you replace the whole "scene" at once, you might want to use the "persistent" renderer mode instead. Here's an [example host config for persistent renderer](https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactFabricHostConfig.js).

## createElement

This is similar to the `React.createElement()` for DOM as a target.

**`createElement.js`**

```js
import { Text, WordDocument } from '../components/index'

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
	const COMPONENTS = {
		ROOT: () => new WordDocument(),
		TEXT: () => new Text(root, props),
		default: undefined
	}

	return COMPONENTS[type]() || COMPONENTS.default
}

export { createElement }
```

I think you can easily understand what's happening inside the `createElement` method. It takes an element, props, and the root instance.

Depending upon the type of element, we return an instance based on it else we return `undefined`.

We're done with the part two of our tutorial. We created the API for our two components (`Document` and `Text`) and a `createElement` method to create an element. In the next part, we will create a render method to flush everything to the host environment.

[Continue to Part-III](./part-three.md)
