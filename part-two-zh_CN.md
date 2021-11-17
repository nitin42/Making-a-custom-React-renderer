# 第二部分

在上一节中，我们构建了一个 React 协调器，并了解了它如何管理渲染器的生命周期。

在第二部分，我们我们将为调度器创建一个公共接口。我们将设计我们组件的 API，然后将创建一个自定义版本的 `createElement` 方法。

## 组件

对于我们的例子，我们将只实现一个 `Text` 组件。`Text` 组件用于向文档添加文本。

> Text 组件并不是创建特殊的文本节点。与 DOM API 相比，它具有不同的语义。

我们将首先为我们的组件创建一个根容器（还记得协调器中的 `rootContainerInstance` 吗？）它负责用 [officegen](https://github.com/Ziv-Barber/officegen) 创建一个文档实例。

**`WordDocument.js`**

```js
import officegen from 'officegen'

// 用于创建文档实例
class WordDocument {
	constructor() {
		this.doc = officegen('docx')
	}
}

export default WordDocument
```

现在，让我们创建我们的 `Text` 组件。

**`Text.js`**

```js
class Text {
	constructor(root, props) {
		this.root = root;
		this.props = props;

		this.adder = this.root.doc.createP();
	}

	appendChild(child) {
        // 用于添加子节点的 API
        // 注意：这在不同的宿主环境中会有所不同。例如：在浏览器中，你可以使用 document.appendChild(child)
		if (typeof child === 'string') {
			// 添加字符串并渲染文本节点
			this.adder.addText(child);
		}
	}
}

export default Text;

```

让我们看看这里发生了什么！

**`constructor()`**

在 `constructor` 中，我们初始化 `root` 实例和 `props`。我们还对之前在 `WordDocument.js` 中创建的 `doc` 实例创建了一个引用。使用此引用来通过向其添加文本节点来创建段落。

例子 -

```js
this.adder.addText(__someText__)
```

**`appendChild`**

此方法使用 `docx` 的特定平台方法（即 `appendChild`）添加子节点。请记住，我们在调度器的 `appendInitialChild` 方法中检查父实例是否存在 `appendChild` 方法！？

```js
appendInitialChild(parentInstance, child) {
	if (parentInstance.appendChild) {
		parentInstance.appendChild(child);
	} else {
		parentInstance.document = child;
	}
}
```

除了 `appendChild` 方法，你还可以添加 `removeChild` 方法来删​​除子节点。由于我们的宿主目标不提供用于删除子节点的可变 API，因此我们没有使用此方法。

> 在本教程，`Text` 组件不允许嵌套其它的组件。在更实际的示例中，你可能需要验证组件的嵌套。

#### 注意

- 不要在类组件 API 中使用数组追踪子组件。相反，直接使用特定的宿主 API 添加它们，因为 React 提供了有关子节点（已删除或添加）的所有有价值的信息。

这是正确的

```js
class MyComponent {
	constructor(rootInstance, props) {
		this.props = props
		this.root = rootInstance
	}

	appendChild(child) {
		some_platform_api.add(child)
		// 在浏览器中，我们可能会使用 document.appendChild(child)
	}
}
```

这是错误的

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
			// 对 this.children[i] 进行一些操作
		}
	}

	render() {
		this.renderChildren()
	}
}
```

- 如果你的渲染目标没有提供像 `appendChild` 这样的可变方法，而是只允许你一次替换整个“场景”，你可能需要使用“持久（persistent）”渲染器模式来代替。这是一个[持久渲染器的示例宿主配置](https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactFabricHostConfig.js)。

## createElement

这类似于将 DOM 作为目标的 `React.createElement()`。

**`createElement.js`**

```js
import { Text, WordDocument } from '../components/index'

/**
 * 为文档创建一个元素
 * @param {string} type 元素类型
 * @param {Object} props 组件属性
 * @param {Object} root 根节点实例
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
我认为你可以很容易地理解在 `createElement` 方法中发生了什么。它需要传入元素类型、组件属性和根节点实例。

根据元素的类型，我们返回它的实例，否则我们返回 `undefined`。

我们完成了教程的第二部分。我们为我们的两个组件（`Document` 和 `Text`）构建了 API，并构建了一个用于创建元素的 `createElement` 方法。在下一部分中，我们将构建一个渲染方法来将所有内容渲染到宿主环境中。

[继续第三部分](./part-three.md)
