import { noop } from '../utils/noop';
import { appendChild } from '../utils/appendChild';

class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.adder = this.root.doc.createP();
  }

  appendChild(child) {
    appendChild.call(this, child);
  }

  render() {
    // We already have appended the child node using `addText` in appendChild, so it's safe to return noop
    noop();
  }
}

export default Text;
