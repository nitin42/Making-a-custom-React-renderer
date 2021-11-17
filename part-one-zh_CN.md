# 第一部分

这是教程的第一部分。这是教程中最重要的部分，你将在其中了解 Fiber 及其结构与字段的详细说明，为渲染器创建与宿主环境相关的配置并将渲染器注入开发者工具中。

在这个部分，我们将使用 [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) 包创建一个 React 调度器。我们将使用 Fiber 实现渲染器。初期，React 使用 **栈渲染器**，它是在传统的 JavaScript 栈上实现。另一方面，Fiber 受代数效应和函数式思维的影响。它可以被认为是一个 JavaScript 对象，其中包含组件、输入和输出的信息。

在我们继续之前，我建议你阅读 [这个](https://github.com/acdlite/react-fiber-architecture) 文档 [Andrew Clark](https://twitter.com/ acdlite？lang=en）。这会让你容易些。

让我们开始！

我们将首先安装这些依赖。

```bash
npm install react-reconciler fbjs
```

让我们从 `react-reconciler` 导入 `Reconciler`，然后导入其它模块。

```js
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';

import { createElement } from './utils/createElement';
```

注意我们还导入了 `createElement` 函数。别担心，我们稍后会实现它。

我们将传入 **host config** 对象到 `Reconciler` 创建一个实例。在这个对象中，我们将定义一些可以被认为是渲染器生命周期的方法（更新、添加子组件、删除子组件、提交）。 React 将管理所有非宿主组件。

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
    // 你可以使用此 'rootInstance' 从根传递数据。
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => {}

  supportsMutation: false
});
```

让我们分析一下我们的 host config -

**`createInstance`**

这个方法根据 `type`、`props` 和 `internalInstanceHandle` 创建一个组件实例。

例子 - 假设我们渲染如下内容，

```js
<Text>Hello World</Text>
```

`createInstance` 将返回元素的 `type` （' TEXT '）、`props` （ { children: 'Hello World' } ）和根元素的实例（`WordDocument`）信息。

**Fiber**

Fiber 是组件需要完成或已经完成的工作。最多，一个组件实例有两个 Fiber，已完成的 Fiber 和进行中的 Fiber。

`internalInstanceHandle` 包含的信息有 `tag`、`type`、`key`、`stateNode` 和工作完成后退回的 Fiber。这个对象（Fiber）未来包含的信息有 -

* **`tag`** - Fiber 的类型。
* **`key`** - 子元素的唯一标识。
* **`type`** - 该 Fiber 关联的方法、类、模块。
* **`stateNode`** - 该 Fiber 关联的本地状态。

* **`return`** - 当前 Fiber 执行完毕后将要退回的 Fiber（父 Fiber）。
* **`child`** - `child`、`sibling` 和 `index` 表达 **单向列表数据结构**。
* **`sibling`**
* **`index`**
* **`ref`** - ref 最终用于关联这个节点。

* **`pendingProps`** - 该属性用于标签重载时。
* **`memoizedProps`** - 该属性用于创建输出。
* **`updateQueue`** - 用于状态更新和回调的队列。
* **`memoizedState`** - 该状态用于创建输出。

* **`internalContextTag`** - 位运算数据结构。Fiber 使用位运算数据结构来保存有关 Fiber 及其子树的信息序列，该子树存储在相邻的计算机内存位置。该属性中的位用于确定属性的状态。称为标志的位域集合表示操作的结果或某些中间状态。React Fiber 使用 AsyncUpdates 标志来指示子树是否是异步的。
* **`effectTag`** - 副作用标记。
* **`nextEffect`** - 在单向链表中快速到下一个具有副作用的 Fiber。
* **`firstEffect`** - 子树中有副作用的第一个（firstEffect）和最后一个（lastEffect）Fiber。重用此 Fiber 中已经完成的工作。

* **`expirationTime`** - 该属性表示工作在未来应该已经完成的时间点。
* **`alternate`** - Fiber 的历史版本，包含随时可用的 Fiber，而非使用时分配。在计算机图形学中，这个概念被抽象为 **双缓冲** 模式。它使用更多内存，但我们可以清理它。

* `pendingWorkPriority`
* `progressedPriority`
* `progressedChild`
* `progressedFirstDeletion`
* `progressedLastDeletion`

**`appendInitialChild`**

它用于添加子组件。如果子组件包含在父组件中（例如：`Document`），那么我们将添加所有子组件到父组件中，否则我们将在父节点上创建一个名为 `document` 的属性并将所有子节点添加给它。

例子 -

```js
const data = document.render(); // 返回输出
```

**`prepareUpdate`**

它计算实例的差异。即使 Fiber 暂停或中止对树的一部分渲染，也可以重用这项工作。

**`commitUpdate`**

提交更新或将计算的差异应用到宿主环境的节点 (WordDocument)。

**`commitMount`**

渲染器挂载宿主组件，但可能会在表单自动获得焦点之后进行一些工作。仅当没有当前或备用（alternate） Fiber 时才挂载宿主组件。

**`hostContext`**

宿主上下文是一个内部对象，我们的渲染器可以根据树中的位置使用它。在 DOM 中，这个对象需要被正确调用，例如根据当前上下文在 html 或 MathMl 中创建元素。

**`getPublicInstance`**

这用来关联标识，这意味着它始终返回用作其参数的相同值。它是为 TestRenderers 添加的。

**`resetTextContent`**

在进行任何插入（将宿主节点插入到父节点）之前重置父节点的文本内容。这类似于 OpenGl 中的双缓冲技术，在向其写入新像素并执行光栅化之前先清除缓冲区。

**`commitTextUpdate`**

与 `commitUpdate` 类似，但它为文本节点提交更新内容。

**`removeChild and removeChildFromContainer`**

当我们在一个被移除的宿主组件中时，现在可以从树中移除节点。如果返回的 Fiber 是容器，那么我们使用 `removeChildFromContainer` 从容器中删除节点，否则我们使用 `removeChild`。

**`insertBefore`**

它是一个 `commitPlacement` 钩子，在所有节点递归插入父节点时调用。这被抽象为 `getHostSibling` 的函数，该函数会持续搜索树，直到找到同级宿主节点（React 可能会在下一个版本中改变这种方法，因为它不是一种高效的方法，因为它会导致指数级的搜索复杂性）。

**`appendChildToContainer`**

如果 Fiber 的类型是 `HostRoot` 或 `HostPortal`，则将子节点添加到该容器中。

**`appendChild`**

添加子节点到父节点中。

**`shouldSetTextContent`**

如果它返回 false，则重置文本内容。

**`getHostContext`**

它用于标记当前的宿主上下文（根节点实例），用于发送更的内容，从而更新正在进行的 Fiber 队列（可能表示存在变化）。

**`createTextInstance`**

创建文本节点的实例。

**`supportsMutation`**

`True` 用于 **可变渲染器**，其中宿主目标具有像 DOM 中的 `appendChild` 这样的可变 API。

### Note

* 你 **不应该** 依赖 Fiber 的数据结构。将其字段视为私有。
* 将 'internalInstanceHandle' 对象视为一个黑盒。
* 使用宿主上下文方法从根节点获取数据。

> 在与 [Dan Abramov](https://twitter.com/dan_abramov) 讨论宿主配置方法和 Fiber 属性后，将上述要点添加到教程中。

## 将第三方渲染器注入开发工具中

你还可以将渲染器注入 react-devtools 以调试环境的宿主组件。早期，注入第三方渲染器是不可能的，但现在使用返回的 `reconciler` 实例，可以将渲染器注入 react-devtools。

**使用**

安装 react-devtools 的独立应用程序。

```bash
yarn add --dev react-devtools
```

Run

```bash
yarn react-devtools
```

或者使用 npm，

```bash
npm install --save-dev react-devtools
```

然后运行它

```bash
npx react-devtools
```

```js
const Reconciler = require('react-reconciler');

let hostConfig = {
  // 根据上面的解释在这里添加方法
};

const CustomRenderer = Reconciler(hostConfig);

module.exports = CustomRenderer;
```

然后在你的 `render` 方法中，

```js
const CustomRenderer = require('./reconciler')

function render(element, target, callback) {
  ... // 在这里，使用 CustomRenderer.updateContainer() 进行顶层更新，有关更多详细信息，请参阅 Part-IV。
  CustomRenderer.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0', // version for your renderer
    rendererPackageName: 'custom-renderer', // package name
    findHostInstanceByFiber: CustomRenderer.findHostInstance // host instance (root)
  }))
}
```

我们完成了教程的第一部分。我知道仅通过阅读代码很难理解其中的某些概念。开始的时候感觉很混沌，但是继续尝试，最终它会变得清晰。刚开始学习 Fiber 架构的时候，我什么都不懂。我感到极为沮丧，但我在上述代码的每一部分都使用了 `console.log()` 并试图理解它的实现，然后出现了“芜湖 芜湖”的时刻，它最终帮助我构建了 [redocx](https://github.com/nitin42/redocx）。它是有点难以理解，但你终将会明白。

如果你仍然有任何疑问，我在 Twitter 上的 [@NTulswani](https://twitter.com/NTulswani)。

[更多渲染器的实际示例](https://github.com/facebook/react/tree/master/packages/react-reconciler#practical-examples)

[继续第二部分]](./part-two.md)
