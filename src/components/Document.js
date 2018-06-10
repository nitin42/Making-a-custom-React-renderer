import { noop } from '../utils/noop';
import { appendChild } from '../utils/appendChild';

class Document {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    // docx instance for adding text nodes (Note - This text nodes are different when compared to DOM)
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

export default Document;
