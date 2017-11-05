# Building a custom React renderer

[![Build Status](https://travis-ci.org/nitin42/Making-a-custom-React-renderer.svg?branch=master)](https://travis-ci.org/nitin42/Making-a-custom-React-renderer)

> Let's make a custom React renderer 😎

<p align="center">
  <img src="https://cdn.filestackcontent.com/5KdzhvGRG61WMQhBa1Ql" width="630" height="350">
</p>

## Introduction

This is a small tutorial on how to build your custom React renderer and render the components to the host environment you need. The tutorial is divided into four parts - 

* **Part 1** - Creating a React reconciler (using [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) package).

* **Part 2** - Creating a public interface to the reconciler i.e "Renderer".

* **Part 3** - Parsing the input component (call the render() method on our main document).

* **Part 4** - Creating a render method to flush everything to the host environment we need.

## Brief

### [Part-I](./part-one.md)

In part one, we will create a React reconciler using the [`react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler) package. We will implement the renderer using Fiber as it has a first-class renderer API for creating custom renderer.

### [Part-II](./part-two.md)

In part two, we will create a public interface to the reconciler i.e a renderer. We will create a custom method for `createElement` and will also architect the component API for our example. 

### [Part-III](./part-three.md)

In part three, we will build a function that will parse the input component and will return the output (rendered children and props).

### [Part-IV](./part-four.md)

In part four, we will create a render method which will render our input component.


## What we will build?

We will create a custom renderer that will render a React component to a word document. I've already made one. Full source code and the documentation for that is available [here](https://github.com/nitin42/redocx).

We will use [officegen](https://github.com/Ziv-Barber/officegen) for this. I'll explain some of it's basic concepts here.

Officegen can generate Open Office XML files for Microsoft Office 2007 and later. It generates a output stream and not a file.
It is independent of any output tool.

**Creating a document object**

```js
let doc = officegen('docx', { __someOptions__ });
```

**Generating output stream**

```js
let output = fs.createWriteStream (__filePath__);

doc.generate(output);
```

**Events**

`finalize` - It is fired after a stream has been generated successfully.

`error` - Fired when there are any errors

## Running the project

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
