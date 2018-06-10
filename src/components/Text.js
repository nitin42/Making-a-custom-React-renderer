import { noop } from '../utils/noop';

class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    this.adder.addText(child);
  }

  render() {
    // We already have appended the child node using `addText` in appendChild, so it's safe to return noop
    noop();
  }
}

export default Text;
