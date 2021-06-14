# Building a custom React renderer

[![Build Status](https://travis-ci.org/nitin42/Making-a-custom-React-renderer.svg?branch=master)](https://travis-ci.org/nitin42/Making-a-custom-React-renderer)

> 让我们创建一个自定义的 React 渲染器 😎

<p align="center">
  <img src="https://cdn.filestackcontent.com/5KdzhvGRG61WMQhBa1Ql" width="630" height="350">
</p>

## Introduction

这是一个关于如何创建自定义 React 渲染器并将组件渲染到你需要的宿主环境的教程。教程分为三部分 ——

* **第一部分** - 创建一个 React 调度器（使用 [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) 包）。

* **第二部分** - Creating a public interface to the reconciler i.e "Renderer".

* **第三部分** - Creating a render method to flush everything to the host environment we need.

## Brief

### [第一部分](./part-one.md)

在第一部分，我们将使用 [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) 创建一个 React 调度器。我们将使用 Fiber 实现渲染器，因为它拥有优秀的用于创建自定义渲染器的 API。

### [第二部分](./part-two.md)

In part two, we will create a public interface to the reconciler i.e a renderer. We will create a custom method for `createElement` and will also architect the component API for our example.

### [第三部分](./part-three.md)

In part three, we will create a render method which will render our input component.

## 我们将创建什么？

我们将创建一个自定义渲染器，将 React 组件渲染到 word 文档中。我已经做了一个。完整的源代码和文档在[这里](https://github.com/nitin42/redocx)。

我们将使用 [officegen](https://github.com/Ziv-Barber/officegen)。我将在这里解释一些基本概念。

Officegen 可以为 Microsoft Office 2007 及更高版本生成 Open Office XML 文件。它生成一个输出流而不是文件。它独立于任何输出工具。

**创建一个文档对象**

```js
let doc = officegen('docx', { __someOptions__ });
```

**生成输出流**

```js
let output = fs.createWriteStream (__filePath__);

doc.generate(output);
```

**事件**

`finalize` - It is fired after a stream has been generated successfully.

`error` - Fired when there are any errors

## 运行这个项目

```
git clone https://github.com/nitin42/Making-a-custom-React-renderer
cd Making-a-custom-React-renderer
yarn install
yarn example
```

After you run `yarn example`, a docx file will be generated in the [demo](./demo) folder.

## Contributing

Suggestions to improve the tutorial are welcome 😃.

**If you've completed the tutorial successfully, you can either watch/star this repo or follow me on [twitter](https://twitter.com/NTulswani) for more updates.**

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/FCRW65HPiwhNtebDx2tTc53E/nitin42/Making-a-custom-React-renderer'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/FCRW65HPiwhNtebDx2tTc53E/nitin42/Making-a-custom-React-renderer.svg' />
</a>
