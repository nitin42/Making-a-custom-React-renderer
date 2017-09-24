# Part-I

This is part one of the tutorial. In this section, we will create a React reconciler for the current targeted version of 
`React 16.0.0-alpha.4`. We are going to implement the renderer using Fiber. Earlier, React was using a **stack renderer** because it is implemented on the
traditional JavaScript stack. On the other hand, Fiber is influenced by algebraic effects and functional ideas. It can thought of a 
JavaScript object that contains information about a component, its input, and its output.

Before you proceed further, I'll recommend you to read [this](https://github.com/acdlite/react-fiber-architecture) documentation on Fiber architecture by [Andrew Clark](https://twitter.com/acdlite?lang=en). This will make things
easier for you.

Let's get started!

We will first install the dependencies.

```
npm install react-dom@16.0.0-alpha.4 fbjs@0.8.4
```

Let's import `ReactFiberReconciler` from `react-dom` and other modules also.

```js
import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import createElement from './utils/createElement';
```

Notice we have also imported `createElement` function. Don't worry, we will implement it afterwards.

We will create a reconciler instance using `ReactFiberReconciler` which accepts a **host config** object. In this object we will define
some methods which can be thought of as lifecycle of a renderer (update, append children, remove children, commit). React will manage
all the non-host components, stateless and composites.

```js
const WordRenderer = ReactFiberReconciler({

  // Creates component instance
  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return createElement(type, props, rootContainerInstance);
  },
  
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    // noob
  },

  // This is the final method which is called before flushing the root component to the host environment.
  finalizeInitialChildren(testElement, type, props, rootContainerInstance) {
    return false;
  },

  prepareUpdate(testElement, type, oldProps, newProps, hostContext) {
    return true;
  },

  commitUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    internalInstanceHandle,
  ) {
    // noop
  },
  
  // This is called after initializeFinalChildren
  commitMount(
    instance,
    type,
    newProps,
    rootContainerInstance,
    internalInstanceHandle,
  ) {
    // noop
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },
  
  getPublicInstance(inst) {
    return inst;
  },

  // These are necessary for any global side-effects that you need to produce in the host environment
  
  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },
  
  // The following methods are for the specific text nodes. In our example, we don't have any specific text nodes so we return false or noop them
  
  shouldSetTextContent(props) {
    return false;
  },

  resetTextContent(testElement) {
    // noop
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return text;
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.chidren = newText;
  },
  
  useSyncScheduling: true,
});
```

Let's break down our host config -

**`createInstance`**

This method creates a component instance with `type`, `props`, `rootContainerInstance`, `hostContext` and `internalInstanceHandle`.

Example - Let's say we render,

```js
<Document>
  <Text>Hello World</Text>
</Document>
```  

`createInstance` will then return the information about the `type` of element (' TEXT '), props ( { children: 'Hello World' } ), rootContainerInstance(`WordDocument`),
hostContext (`{}`) and internalInstanceHandle. 

`internalInstanceHandle` contains information about the `tag`, `type`, `key`, `stateNode`, and the return fiber. This object (fiber) further contains information about -

* `tag`
* `key`
* `type`
* `stateNode`
* `return`
* `child`
* `sibling`
* `index`
* `ref`
* `pendingProps`
* `memoizedProps`
* `updateQueue`
* `memoizedState`
* `effectTag`
* `nextEffect`
* `firstEffect`
* `pendingWorkPriority`
* `progressedPriority`
* `progressedChild`
* `progressedFirstDeletion`
* `progressedLastDeletion`
* `alternate`

**`appendInitialChild`**

It appends the children. If children are wrapped inside a parent component (eg: `Document`), then add all the children to it else we 
create a property called `document` on a parent node and append all the children to it. This will be helpful when we will parse the input component
and make a call to the render method of our component.

Example - 

```js
const data = document.render(); // returns the output
```

**`prepareUpdate`**

It computes the diff for an instance. Fiber can reuse this work even if it pauses or abort rendering a part of the tree.

**`commitUpdate`**

Commit the update or apply the diff calculated to the our host environment's node (WordDocument).

**`hostContext`**

Host context is an internal object which our renderer may use based on the current location in the tree. In DOM, this object 
is required to make correct calls for example to create an element in html or in MathMl based on current context.

**`getPublicInstance`**

This is an identity relation which means that it always returns the same value that was used as its argument. It was added for TestRenderers.

We're done with the part one of our tutorial. I know some concepts are difficult to grok solely by looking at code. Initially it feels agitating but keep trying it and it will eventually make sense. When I first started learning about the Fiber architecture, I couldn't understand anything at all. I was frustated and dismayed but I used `console.log()` 😆😆 in every section of the above code to understand what was going on and then there was this "Aha Aha" moment and it finally helped me to build [redocx]().

If you still have any doubts, please DM me. I'm at @NTulswani on Twitter.
