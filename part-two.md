# Part-II

So in the [last section](./part-one.md) we built a React reconciler and saw how it manages the lifecycle of our renderer.

In part two, we'll create a public interface to the reconciler. We will design our component API and will also build a custom version
of `createElement` method.

## Components

For our example, we'll only implement two components, `Document` and `Text`. A `Document` component is a wrapper or say parent
component (like `div`) and `Text` component is the main component for adding the text to our document.

> Text component, however, doesn't create specific text node. It works differently when compared to the DOM APIs.

We will first create a root container (remember `rootContainerInstance` in our reconciler ?) for our components. This is responsible
for creating a document instance for [officegen](https://github.com/Ziv-Barber/officegen).

**`WordDocument.js`**

```js
import officegen from 'officegen';

// This creates the document instance
class WordDocument {
  constructor() {
    this.doc = officegen('docx');
  }
}

export default WordDocument;
```

Now let's create our `Document` component.

**`Document.js`**

```js
import { noop } from '../utils/noop';
import { appendChild } from '../utils/appendChild';

class Document {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    // docx instance for adding text nodes (Note - This text nodes are different when compared to DOM)
    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    appendChild.call(this, child);
  }

  render() {
    noop();
  }
}

export default Document;
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

**`removeChild`**

This method removes a child node. Again we used this in our reconciler.

**`render`**

As we already have appended the child node using `appendChild`, so it's safe to return noop. However, this may vary in your host environment where you might want to render something initially.

Let's create the `Text` component

`Text.js`

```js
import { noop } from '../utils/noop';

class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    this.adder.addText(child);
  }

  render() {
    // We already have appended the child node using `addText` in appendChild, so it's safe to return noop
    noop();
  }
}

export default Text;
```

Implementation for `Text` is similar to the `Document` component except we just render the text string using `addText`.

For this tutorial, the scope is kept limited for both the components, `Document` and `Text`. In a more practical example, you might want to validate the nesting of components too.

```js
// noop.js

export const noop = () => {};
```

```js
// appendChild.js

// Platform specific API for appending child nodes in docx environment.
// Note: This will vary in different host environments. For example - In browser, you will use document.appendChild(child)

export function appendChild(child) {
  if (typeof child === 'string') {
    // Add the string and render the text node
    this.adder.addText(child);
  } else if (typeof child === 'object') {
    // It's a component
    child.render();
  }
}
```

In `appendChild`, we also check whether the `child` is a component or not. If it's a component, then we simply call its render method. This covers both the cases,

```js
<Document>Hello</Document>
```

```js
<Document>
  <Text>Hello</Text>
</Document>
```

## createElement

This is similar to the `React.createElement()` for DOM as a target.

**`createElement.js`**

```js
import { Document, Text, WordDocument } from '../components/index';

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
    DOCUMENT: () => new Document(root, props),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement };
```

I think you can easily understand what's happening inside the `createElement` method. It takes an element, props, and the root instance.

Depending upon the type of element, we return an instance based on it else we return `undefined`.

We're done with the part two of our tutorial. We created the API for our two components (`Document` and `Text`) and a `createElement` method to create an element. Now we will create a function that will parse the input component (input to `render` method) and will return the output (rendered children and props).

[Continue to Part-III](./part-three.md)
