import emptyObject from 'fbjs/lib/emptyObject';
import createElement from '../utils/createElement';

const Reconciler = require('react-reconciler')

const WordRenderer = Reconciler({
  // Add children
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  // Here we are passing the internal instance (root instance i.e WordDocument)
  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },
    
    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },
  
    insertBefore(parentInstance, child, beforeChild) {
      // noob
    },
  
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
  
    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
  
    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText;
    },
  }
})

export default WordRenderer;
