# Part-I

This is part one of the tutorial. In this section, we will create a React reconciler using [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) package. We are going to implement the renderer using Fiber. Earlier, React was using a **stack renderer** as it was implemented on the traditional JavaScript stack. On the other hand, Fiber is influenced by algebraic effects and functional ideas. It can be thought of as a JavaScript object that contains information about a component, its input, and its output.

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

import createElement from './utils/createElement';
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

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => {},

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
* **`ref`** - The ref last used to attach this node (parent).

* **`pendingProps`** - This property is useful when a tag is overloaded.
* **`memoizedProps`** - The props used to create the output.
* **`updateQueue`** - A queue of state updates and callbacks.
* **`memoizedState`** - The state used to create the output.

* **`internalContextTag`** - Bit field data structure. React Fiber uses bit field data structures to hold a sequence of information about the fiber and it's subtree which is stored in an adjacent computer memory locations. A bit within this set is used to determine the state of an attribute. Collection of bit fields called flags represent the outcome of an operation or some intermediate state. React Fiber uses AsyncUpdates flag which indicates whether the subtree is async is or not.
* **`effectTag`** - Effect
* **`nextEffect`** - Singly linked list fast path to the next fiber with side-effects.
* **`firstEffect`** - The first(firstEffect) and last(lastEffect) fiber with side-effect within the subtree. Reuse the work done in this fiber.

* **`expirationTime`** - This represents a time in the future by which the work should be completed.
* **`alternate`** - Pooled version of fiber which has contains information about the fiber and is ready to be used rather than allocated on use. In computer graphics, this concept is abstracted in **double buffer** pattern. It uses more memory but we can clean up the pairs.

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

**`hostContext`**

Host context is an internal object which our renderer may use based on the current location in the tree. In DOM, this object 
is required to make correct calls for example to create an element in html or in MathMl based on current context.

**`getPublicInstance`**

This is an identity relation which means that it always returns the same value that was used as its argument. It was added for the TestRenderers.

We're done with the Part One of our tutorial. I know some concepts are difficult to grok solely by looking at code. Initially it feels agitating but keep trying it and it will eventually make sense. When I first started learning about the Fiber architecture, I couldn't understand anything at all. I was frustated and dismayed but I used `console.log()` in every section of the above code and tried to understand its implementation and then there was this "Aha Aha" moment and it finally helped me to build [redocx](https://github.com/nitin42/redocx). Its a little perplexing to understand but you will get it eventually.

If you still have any doubts, DMs are open. I'm at [@NTulswani](https://twitter.com/NTulswani) on Twitter.

[More practical examples for the renderer](https://github.com/facebook/react/tree/master/packages/react-reconciler#practical-examples)

[Continue to Part-II](./part-two.md)
