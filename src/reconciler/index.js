import emptyObject from 'fbjs/lib/emptyObject';
import { createElement, getHostContextNode } from '../utils/createElement';

const Reconciler = require('react-reconciler');

const WordRenderer = Reconciler({
	appendInitialChild(parentInstance, child) {
		if (parentInstance.appendChild) {
			parentInstance.appendChild(child);
		}
	},

	createInstance(type, props, internalInstanceHandle) {
		return createElement(type, props);
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

	getRootHostContext(instance) {
		return getHostContextNode(instance);
	},

	getChildHostContext(instance) {
		return emptyObject;
	},

	shouldSetTextContent(type, props) {
		return false;
	},

	now: () => {},

	useSyncScheduling: true,

	supportsMutation: false,
});

export default WordRenderer;
