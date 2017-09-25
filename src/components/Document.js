class Document {
  // Stores all the children
  children = [];

  constructor(root, props) {
    this.root = root;
    this.props = props;

    // docx instance for adding text nodes (Note - This text nodes are different when compared to DOM)
    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }

  renderChildNode() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'string') {
        this.adder.addText(this.children[i]);
      } else if (typeof this.children[i] === 'object') {
        this.children[i].render();
      }
    }
  }

  render() {
    this.renderChildNode();
  }
}

export default Document;
