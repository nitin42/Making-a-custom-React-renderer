# 创建一个自定义 React 渲染器

[![Build Status](https://travis-ci.org/nitin42/Making-a-custom-React-renderer.svg?branch=master)](https://travis-ci.org/nitin42/Making-a-custom-React-renderer)

[English](./README.md) | 简体中文

> 让我们创建一个自定义的 React 渲染器 😎

<p align="center">
  <img src="https://cdn.filestackcontent.com/5KdzhvGRG61WMQhBa1Ql" width="630" height="350">
</p>

## 介绍

这是一个关于如何创建一个自定义 React 渲染器并将所有内容渲染到你的目标宿主环境中的教程。教程分为三部分 ——

* **第一部分** - 创建一个 React 调度器（使用 [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) 包）。

* **第二部分** - 我们将创建一个用于调度器的公开方法。

* **第三部分** - 创建渲染方法来将所有创建的组件实例渲染到我们的目标宿主环境中。

## 概要

### [第一部分](./part-one-zh_CN.md)

在第一部分，我们将使用 [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) 创建一个 React 调度器。我们将使用 Fiber 实现渲染器，因为它拥有优秀的用于创建自定义渲染器的 API。

### [第二部分](./part-two-zh_CN.md)

在第二部分，我们将创建一个用于调度器的公开方法。我们将创建一个自定义 `createElement` 函数，还将为我们的示例构建组件 API。

### [第三部分](./part-three-zh_CN.md)

在第三部分，我们将创建渲染方法，用于渲染我们创建的组件实例。

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

`finalize` - 在流生成成功之后触发。

`error` - 在发生异常时触发。

## 运行这个项目

```bash
git clone https://github.com/nitin42/Making-a-custom-React-renderer
cd Making-a-custom-React-renderer
yarn install
yarn example
```

运行 `yarn example` 后，会在 [demo](./demo) 文件夹下生成一个 docx 文件。

## 贡献

欢迎提出改进教程的建议😃。

**如果您已成功完成本教程，您可以 watch 或 star 此代码库或在 [twitter](https://twitter.com/NTulswani) 上关注我以获取最新的消息。**

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/FCRW65HPiwhNtebDx2tTc53E/nitin42/Making-a-custom-React-renderer'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/FCRW65HPiwhNtebDx2tTc53E/nitin42/Making-a-custom-React-renderer.svg' />
</a>
