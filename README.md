# Building a custom React renderer

[WIP] come back when its done

> Let's make a custom React renderer

<p align="center">
  <img src="https://cdn.filestackcontent.com/5KdzhvGRG61WMQhBa1Ql" width="630" height="350">
</p>

## Introduction

This is a small tutorial on how to build your custom React renderer and render the components to the host environment you need. The tutorial is divided into four parts - 

* **Part 1** - Creating a React reconciler (current targeted version React 16.0.0-alpha.4).

* **Part 2** - Creating a public interface to the reconciler i.e "Renderer".

* **Part 3** - Parsing the input component (call the render() method on our main document).

* **Part 4** - Creating a render method to flush everything to the host environment we need.

## Brief

### [Part-I](./part-one.md)

In part one, we will create a React reconciler for the current targeted version of React 16.0.0-alpha.4. We will implement the renderer using Fiber as it has a first-class renderer API for creating custom renderer.

### [Part-II](./part-two.md)

In part two, we will create a public interface to the reconciler i.e a renderer. We will create a custom method for `createElement` and will also architect the component API for our example. 

### [Part-III](./part-three.md)

In part three, we will build a function that will parse the input component and will return the output (rendered children and props).

### [Part-IV](./part-four.md)

In part four, we will create a render method which will render our input component.


## Example

We will create a custom renderer that will render a React component to a word document. I've already made one for the community. Full source code and the documentation is available [here](https://github.com/nitin42/redocx).

