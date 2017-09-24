# Part-III

In the last section we created a `createElement` method and also designed the component API for our example. In this part, we will
create a function for parsing the input component (input to the `render` method) and return the output.

## Parse

```js
/**
 * Parse the input component by calling the render() method (passed to docx generator instance)
 * @param {Object} input Input component
 */
const parse = (input) => {
  function parseComponent(inputComponent) {
    const document = inputComponent.document;
    
    document.render();

    return inputComponent;
  }

  function toBuffer() {
    return parseComponent(input);
  }

  return {
    toBuffer,
  };
};

export default parse;
```

Let's see what's going on here!

**`parseComponent`**

```js
function parseComponent(inputComponent) {
  const document = inputComponent.document;

  document.render();

  return inputComponent;
}
```

In the above function, we create a variable `document` that represents a parentInstance or a component we want to render.
This property is accessible only because of - 

```js
appendInitialChild(parentInstance, child) {
  // if (parentInstance.appendChild) {
    // parentInstance.appendChild(child);
  // } 
  else {
    parentInstance.document = child; 👈
  }
}
```

**`document.render()`**

Here we are calling the render method of the input component. This will append all the children to `children` array. Thus we will use
this data (child nodes) to flush to the host environment.

Finally we return our input component and use `toBuffer method to return the output`.
