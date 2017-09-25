# Part-II

So in the [last section](./part-one.md) we built a React reconciler and saw how it manages the lifecycle of our renderer.

In part two, we'll create a public interface to the reconciler. We will design our component API and will also build a custom version
of `createElement` method.

## Component API

For our example we just need to implement two components, `Document` and `Text`. A `Document` component is a wrapper or say parent
component (like `div`) and `Text` component is the main component for adding the text to our document.

We will first create a root container (remember `rootContainerInstance` in our reconciler ?) for our components. This is responsible
for creating a document instance for [officegen]().

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
class Document {
  // Store all the children here
  children = [];

  constructor(root, props) {
    this.root = root;
    this.props = props;
    
    // Create a new paragraph
    this.adder = this.root.doc.createP();
  }
  
  // Add children
  appendChild(child) {
    this.children.push(child);
  }
  
  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'string') {
        // If not a component, render it as a paragraph
        this.adder.addText(this.children[i]);
      } else if (typeof this.children[i] === 'object') {
        // We know it's a component so just call the render() method
        this.children[i].render();
      }
    }
  }

  render() {
    this.renderChildren();
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

This method appends the children to our `children` array. Remember we used this in our reconciler's `appendInitialChild` method to check whether the
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

This method removes a child node from our `children` array. Again we used this in our reconciler.

```js
removeChild(parentInstance, child) {
  parentInstance.removeChild(child);
}
```

**`renderChildren`**

This method renders all the children of our `Document` component. If we find that the type of `children` is a string, we use it to
render a paragraph or if it's an object (containing information about the `root`, `type`, `key`, `ref`) then we know it's a
component and we just call it's render method.

**`render`**

Finally we render all the children by calling `this.renderChildren()`.

Let's create the `Text` component

`Text.js`

```js
class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    
    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'string') {
        this.adder.addText(this.children[i]);
      } // else { some_custom_method(); } here it's upto you how do you handle the nested components. For our example, we won't go into much details.
    }
  }

  render() {
    this.renderChildren();
  }
}

export default Text;

```

Again, everything is similar to the `Document` component except that we pass each child node to `addText()` to render a paragraph.

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
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export default createElement;
```

I think you can easily understand what's happening inside the function. `createElement` takes a type of element, props, and the root instance.

Depending upon the type of element, we return an instance based on it else we return `undefined`.

We're done with the part two of our tutorial. We created the API for our two components (`Document` and `Text`) and a `createElement` method to create an element. Now we will create a function that will parse the input component (input to `render` method) and will return the output (rendered children and props).

[Continue to Part-III](./part-three.md)
