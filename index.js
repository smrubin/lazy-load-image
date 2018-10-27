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
		let targetElements = this.getTargetElements();

		if (!targetElements || !targetElements.length) {
			return;
		}

		targetElements = Array.from(targetElements);

		if(!targetElements.filter(LazyLoader.isElementLazyLoadable).length) {
			return; // No lazy loadable elements
		}

		// Create new IO with lazy load callback
		const observer = new IntersectionObserver(this.handleIntersection, this.getIntersectionObserverOptions());

		targetElements.forEach(el => {
			observer.observe(el);
		});
	}

	static isElementLazyLoadable(el) {
		return !!(el.nodeName.toLowerCase() === 'img' && el.attributes['data-lazyload']);
	}

	// When a lazy load-able element intersects the IO's threshold and margin, load the image.
	handleIntersection(entries, observer) {

		entries.forEach(entry => {

			/**
			 * When the IntersectionObserver is instantiated the callback is ran once
			 * as a detection for whether the element is in view or not.
			 */
			if (!entry.isIntersecting) {
				return;
			}

			// Load the actual image by making setting src attribute equal to custom data-lazyload attribute.
			entry.target.src = entry.target.attributes['data-lazyload'].value;

			// Stop observing target, since it now has its image loaded.
			observer.unobserve(entry.target);

		});
	}

};
