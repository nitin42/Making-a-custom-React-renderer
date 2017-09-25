import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import createElement from '../utils/createElement';

const WordRenderer = ReactFiberReconciler({
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    return createElement(type, props, rootContainerInstance);
  },

  // Add children
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },
  
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    // noob
  },

  finalizeInitialChildren(testElement, type, props, rootContainerInstance) {
    return false;
  },

  prepareUpdate(testElement, type, oldProps, newProps, hostContext) {
    return true;
  },

  commitUpdate(instance, type, oldProps, newProps, rootContainerInstance, internalInstanceHandle) {
    // noop
  },

  commitMount(instance, type, newProps, rootContainerInstance, internalInstanceHandle) {
    // noop
  },
  
  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  shouldSetTextContent(props) {
    return false;
  },

  resetTextContent(testElement) {
    // noop
  },

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return text;
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.chidren = newText;
  },

  useSyncScheduling: true,
});

export default WordRenderer;
