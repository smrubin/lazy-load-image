export default class LazyLoader {

	constructor(selector, rootMargin = '200px' ) {
		this.selector = selector;
		this.rootMargin = rootMargin;
		this.observeTargets();
	}

	getTargetElements() {
		return document.querySelectorAll(this.selector);
	}

	getIntersectionObserverOptions() {
		return {
			root: null,
			rootMargin: this.rootMargin,
			threshold: 0,
		}
	}

	observeTargets() {
		const targetElements = this.getTargetElements();

		if (!targetElements || !targetElements.length) {
			// Error or no matching elements found
			return;
		}

		// Create new IO with lazy load handler
		const observer = new IntersectionObserver(this.handleIntersection, this.getIntersectionObserverOptions());

		// observe each one
		Array.from(targetElements)
			.filter(this.isElementLazyLoadable)
			.forEach(el => {
				observer.observe(el)
			});
	}

	isElementLazyLoadable(el) {
		return el.nodeName.toLowerCase() === 'img' && el.attributes['data-lazyload'];
	}

	// this will be the handler that actually does the lazy loading
	handleIntersection(entries, observer) {

		entries.forEach(entry => {

			/**
			 * When the IntersectionObserver is instantiated the callback is ran once
			 * as a detection for whether the element is in view or not.
			 */
			if (!entry.isIntersecting) { // todo - check on this
				return;
			}

			//load the actual image by making the src the data attribute
			entry.target.src = entry.target.attributes['data-lazyload'].value;
			observer.unobserve(entry.target);

		});
	}

};
