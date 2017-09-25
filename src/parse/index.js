const parse = (input) => {
  function parseComponent(inputComponent) {
    const document = inputComponent.document;

    // Render all the children and props
    document.render();
    
    return inputComponent;
  }

  async function toBuffer() {
    return parseComponent(input);
  }

  return {
    toBuffer,
  };
};

export default parse;
