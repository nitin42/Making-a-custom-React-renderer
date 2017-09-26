class Text {
  children = [];
  
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'string') {
        this.adder.addText(this.children[i]);
      } // else { some_custom_method(); } here it's upto you how do you handle the nested components. For our example, we won't go into much details.
    }
  }

  render() {
    this.renderChildren();
  }
}

export default Text;
