# Part-I

This is part one of the tutorial. This is the most important section of the tutorial where you'll learn about the Fiber, detailed description of its structure and fields, creating host configuration for your renderer and injecting the renderer into devtools.

In this section, we will create a React reconciler using [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) package. We are going to implement the renderer using Fiber. Earlier, React was using a **stack renderer** as it was implemented on the traditional JavaScript stack. On the other hand, Fiber is influenced by algebraic effects and functional ideas. It can be thought of as a JavaScript object that contains information about a component, its input, and its output.

Before we proceed further, I'll recommend you to read [this](https://github.com/acdlite/react-fiber-architecture) documentation on Fiber architecture by [Andrew Clark](https://twitter.com/acdlite?lang=en). This will make things
easier for you.

Let's get started!

We will first install the dependencies.

```
npm install react-reconciler@0.2.0 fbjs@0.8.16
```

Let's import the `Reconciler` from `react-reconciler` and also the other modules.

```js
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';

import { createElement } from './utils/createElement';
```

Notice we have also imported `createElement` function. Don't worry, we will implement it afterwards.

We will create a reconciler instance using `Reconciler` which accepts a **host config** object. In this object we will define
some methods which can be thought of as lifecycle of a renderer (update, append children, remove children, commit). React will manage all the non-host components, stateless and composites.

```js
const WordRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => performance.now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },
    
    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },
  
    insertBefore(parentInstance, child, beforeChild) {
      // noob
    },
  
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
  
    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
  
    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText;
    },
  }
})
```

Let's break down our host config -

**`createInstance`**

This method creates a component instance with `type`, `props` and `internalInstanceHandle`.

Example - Let's say we render,

```js
<Text>Hello World</Text>
```  

`createInstance` will then return the information about the `type` of an element (' TEXT '), props ( { children: 'Hello World' } ), and the root instance (`WordDocument`). 

**Fiber**

A fiber is work on a component that needs to be done or was done. Atmost, a component instance has two fibers, flushed fiber and work in progress fiber.

`internalInstanceHandle` contains information about the `tag`, `type`, `key`, `stateNode`, and the return fiber. This object (fiber) further contains information about -

* **`tag`** - Type of fiber.
* **`key`** - Unique identifier of the child.
* **`type`** - function/class/module associated with this fiber.
* **`stateNode`** - The local state associated with this fiber.

* **`return`** - The fiber to return to after finishing processing this one (parent fiber).
* **`child`** - `child`, `sibling` and `index` represents the **singly linked list data structure**.
* **`sibling`**
* **`index`**
* **`ref`** - The ref last used to attach this (parent) node.

* **`pendingProps`** - This property is useful when a tag is overloaded.
* **`memoizedProps`** - The props used to create the output.
* **`updateQueue`** - A queue of state updates and callbacks.
* **`memoizedState`** - The state used to create the output.

* **`internalContextTag`** - Bit field data structure. React Fiber uses bit field data structures to hold a sequence of information about the fiber and it's subtree which is stored in an adjacent computer memory locations. A bit within this set is used to determine the state of an attribute. Collection of bit fields called flags represent the outcome of an operation or some intermediate state. React Fiber uses AsyncUpdates flag which indicates whether the subtree is async is or not.
* **`effectTag`** - Effect
* **`nextEffect`** - Singly linked list fast path to the next fiber with side-effects.
* **`firstEffect`** - The first(firstEffect) and last(lastEffect) fiber with side-effect within the subtree. Reuse the work done in this fiber.

* **`expirationTime`** - This represents a time in the future by which the work should be completed.
* **`alternate`** - Pooled version of fiber which contains information about the fiber and is ready to be used rather than allocated on use. In computer graphics, this concept is abstracted in **double buffer** pattern. It uses more memory but we can clean up the pairs.

* `pendingWorkPriority`
* `progressedPriority`
* `progressedChild`
* `progressedFirstDeletion`
* `progressedLastDeletion`

**`appendInitialChild`**

It appends the children. If children are wrapped inside a parent component (eg: `Document`), then we will add all the children to it else we 
will create a property called `document` on a parent node and append all the children to it. This will be helpful when we will parse the input component
and make a call to the render method of our component.

Example - 

```js
const data = document.render(); // returns the output
```

**`prepareUpdate`**

It computes the diff for an instance. Fiber can reuse this work even if it pauses or abort rendering a part of the tree.

**`commitUpdate`**

Commit the update or apply the diff calculated to the host environment's node (WordDocument).

**`commitMount`**

Renderer mounts the host component but may schedule some work to done after like auto-focus on forms. The host components are only mounted when there is no current/alternate fiber.

**`hostContext`**

Host context is an internal object which our renderer may use based on the current location in the tree. In DOM, this object 
is required to make correct calls for example to create an element in html or in MathMl based on current context.

**`getPublicInstance`**

This is an identity relation which means that it always returns the same value that was used as its argument. It was added for the TestRenderers.

**`useSyncScheduling`**
This property is used to down prioritize the children by checking whether the children are offscreen or not. In other words, if this property is true then the work in progress fiber has no expiration time

**`resetTextContent`**
Reset the text content of the parent before doing any insertions (inserting host nodes into the parent). This is similar to double buffering technique in OpenGl where the buffer is cleared before writing new pixels to it and perform rasterization.

**`commitTextUpdate`**
Similar to `commitUpdate` but it commits the update payload for the text nodes.

**`removeChild and removeChildFromContainer`**
When we're inside a host component that was removed, it is now ok to remove the node from the tree. If the return fiber (parent) is container, then we remove the node from container using `removeChildFromContainer` else we simply use `removeChild`.

**`insertBefore`**
It is a `commitPlacement` hook and is called when all the nodes are recursively inserted into parent. This is abstracted into a function named `getHostSibling` which continues to search the tree until it finds a sibling host node (React will change this methodology may be in next release because it's not an efficient way as it leads to exponential search complexity)

**`appendChildToContainer`**
If type of fiber is a `HostRoot` or `HostPortal` then the child is added to that container.

**`appendChild`**
Child is added to the parent.

**`shouldSetTextContent`**
If it returns false then schedule the text content to be reset.

**`getHostContext`**
It is used to mark the current host context (root instance) which is sent to update the payload and therefore update the queue of work in progress fiber (may indicate there is a change).

**`createTextInstance`**
Creates an instance of a text node.

### Note

* You should **NOT** rely on Fiber data structure itself. Consider its fields private.
* Treat 'internalInstanceHandle' as an opaque object itself.
* Use host context methods for getting data from roots.

> The above points were added to the tutorial after a discussion with [Dan Abramov](https://twitter.com/dan_abramov) regarding the host config methods and Fiber properties.

## Injecting third party renderers into devtools

You can also inject your renderer into react-devtools to debug the host components of your environment. Earlier, it wasn't possible for third party renderers but now using the return value of `reconciler` instance, it is possible to inject the renderer into react-devtools.

> Note - This wasn't supported in `react-reconciler` version 0.2.0. So you'll need to update it to the current beta version 0.3.0-beta.1

**Usage**

Install standalone app for react-devtools

```
yarn add --dev react-devtools
```

Run

```
yarn react-devtools
```

or if you use npm,

```
npm install -g react-devtools
```

then run it with

```
react-devtools
```

```js
const Reconciler = require('react-reconciler')

let hostConfig = {
  // See the above notes for adding methods here
}

const CustomRenderer = Reconciler(hostConfig)

module.exports = CustomRenderer
```

Then in your `render` method,

```js
const CustomRenderer = require('./reconciler')

function render(element, target, callback) {
  ... // Here, schedule a top level update using CustomRenderer.updateContainer(), see Part-IV for more details.
  CustomRenderer.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0', // version for your renderer
    rendererPackageName: 'custom-renderer', // package name
    findHostInstanceByFiber: CustomRenderer.findHostInstance // host instance (root)
  }))
}
```

We're done with the Part One of our tutorial. I know some concepts are difficult to grok solely by looking at code. Initially it feels agitating but keep trying it and it will eventually make sense. When I first started learning about the Fiber architecture, I couldn't understand anything at all. I was frustated and dismayed but I used `console.log()` in every section of the above code and tried to understand its implementation and then there was this "Aha Aha" moment and it finally helped me to build [redocx](https://github.com/nitin42/redocx). Its a little perplexing to understand but you will get it eventually.

If you still have any doubts, DMs are open. I'm at [@NTulswani](https://twitter.com/NTulswani) on Twitter.

[More practical examples for the renderer](https://github.com/facebook/react/tree/master/packages/react-reconciler#practical-examples)

[Continue to Part-II](./part-two.md)
