import emptyObject from 'fbjs/lib/emptyObject'
import { createElement, getHostContextNode } from '../utils/createElement'

const Reconciler = require('react-reconciler')

const WordRenderer = Reconciler({
	appendInitialChild(parentInstance, child) {
		if (parentInstance.appendChild) {
			parentInstance.appendChild(child)
		} else {
			parentInstance.document = child
		}
	},

	createInstance(type, props, internalInstanceHandle) {
		return createElement(type, props)
	},

	createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
		return text
	},

	finalizeInitialChildren(wordElement, type, props) {
		return false
	},

	getPublicInstance(inst) {
		return inst
	},

	prepareForCommit() {
		// noop
	},

	prepareUpdate(wordElement, type, oldProps, newProps) {
		return true
	},

	resetAfterCommit() {
		// noop
	},

	resetTextContent(wordElement) {
		// noop
	},

	getRootHostContext(instance) {
		return getHostContextNode(instance)
	},

	getChildHostContext(instance) {
		return emptyObject
	},

	shouldSetTextContent(type, props) {
		return false
	},

	now: () => {},

	useSyncScheduling: true,

	mutation: {
		appendChild(parentInstance, child) {
			if (parentInstance.appendChild) {
				parentInstance.appendChild(child)
			} else {
				parentInstance.document = child
			}
		},

		appendChildToContainer(parentInstance, child) {
			if (parentInstance.appendChild) {
				parentInstance.appendChild(child)
			} else {
				parentInstance.document = child
			}
		},

		removeChild(parentInstance, child) {
			// No API for removing child nodes in docx env.
		},

		removeChildFromContainer(parentInstance, child) {
			// No API for removing child nodes in docx env.
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
			textInstance.children = newText
		}
	}
})

export default WordRenderer
