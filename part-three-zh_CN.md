# 第三部分

这是我们教程的最后一部分。我们已经完成了所有繁重的工作，创建了一个 React 调度器，为我们的调度器创建了一个公开方法，设计了组件的 API。

现在我们只需要创建一个 `render` 方法来将所有内容渲染到宿主环境中。

## render

```js

import fs from 'fs';
import { createElement } from '../utils/createElement';
import { WordRenderer } from './renderer';

// 渲染组件
async function render(element, filePath) {
  const container = createElement('ROOT');

  const node = WordRenderer.createContainer(container);

  WordRenderer.updateContainer(element, node, null);

  const stream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    container.doc.generate(stream, Events(filePath, resolve, reject));
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

让我们看看这里发生了什么！

**`container`**

这是根元素实例（还记得我们调度器中的 `rootContainerInstance` 吗？）。

**`WordRenderer.createContainer`**

这个方法接受一个 `root` 容器并返回当前的 Fiber（已完成的 Fiber）。记住 Fiber 是一个包含相关组件输入和输出信息的 JavaScript 对象。

**`WordRenderer.updateContainer`**

这个函数接收元素、根容器、父组件、回调函数并触发一次从最顶层开始的更新。
这是根据当前 Fiber 和优先级（取决于上下文）来调度更新实现的。

最后，我们渲染所有子节点并通过创建写入流来生成 word 文档。

仍有疑惑？查看 [常见问题](./faq.md)。

恭喜！你已成功完成本教程。本教程的完整源代码在此代码库 ([src](./src)) 中提供。如果你想阅读整个源代码，请按照以下顺序 -

[`reconciler`](./src/reconciler/index.js)  => [`components`](./src/components/)  => [`createElement`](./src/utils/createElement.js) => [`render method`](./src/render/index.js)

如果你喜欢阅读本教程，请 watch 或 star 这个代码库，并在 [Twitter](http://twitter.com/NTulswani) 上关注我以获取最新的消息。

感谢你阅读本教程！
