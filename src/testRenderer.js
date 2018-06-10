import { createElement } from './utils/createElement'
import WordRenderer from './reconciler'

function render(element) {
	const container = createElement('ROOT')
	const node = WordRenderer.createContainer(container)

	WordRenderer.updateContainer(element, node, null)

	return container
}

export default render
