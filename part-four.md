# Part-IV

This is the last section of our tutorial. We've done all the heavy work, created a React reconciler, created a public interface to
our reconciler, designed the component API and also created a function to parse the input component.

Now we just need to create a `render` method to flush everything to the host environment.

## render

```js

import fs from 'fs';
import createElement from '../utils/createElement';
import { WordRenderer } from './renderer';
import parse from './parse';

// renders the component
async function render(element, filePath) {
  const container = createElement('ROOT');

  const node = WordRenderer.createContainer(container);

  WordRenderer.updateContainer(element, node, null);

  const output = parse(container).toBuffer();
  
  const stream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    output.doc.generate(stream, Events(filePath, resolve, reject));
  });
}

function Events(filePath, resolve, reject) {
  return {
    finalize: () => {
      console.log(`✨  Word document created at ${path.resolve(filePath)}.`);
      resolve();
    },
    error: () => {
      console.log('An error occurred while generating the document.');
      reject();
    },
  };
}

export default render;

```

Let's see what's going on here!

**`container`**

This is the root instance (remember `rootContainerInstance` in our reconciler ?).

**`WordRenderer.createContainer`**

This function takes a `root` container and returns the current fiber (flushed fiber). Remember a fiber is a JavaScript object
that contains information about a component, it's input and output.

**`WordRenderer.updateContainer`**

This function takes an element, a root container, a parent component, a callback function and schedules a top level update.
This is done by scheduling an update with the current fiber and a priority level (depends on the context)

Finally we parse our input component to render all the children and props and generate the word document by creating a write stream.

Still having some doubts? Check out the [FAQs](./faq.md).

Congrats! You've have successfully completed the tutorial. Full source code for the tutorial is already available in this repository ([src](./src)). If you want to read the whole source code then follow this order - 

[`reconciler`](./src/reconciler/index.js)  => [`components`](./src/components/)  => [`createElement`](./src/utils/createElement) => [`parse the input component`](./src/parse/index.js) => [`render method`](./src/render/index.js)

If you've enjoyed reading the tutorial then watch/star this repo and follow me on [Twitter](http://twitter.com/NTulswani) for updates.

Thanks for reading the tutorial!

