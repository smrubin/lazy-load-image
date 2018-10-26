import LazyLoadImage from './index.js';

describe('lazy-load-image', () => {

	describe('isElementLazyLoadable', () => {

		test('element is not an image', async () => {
			await expect(LazyLoadImage.isElementLazyLoadable(mockHtmlElement('div'))).toEqual(false);
		});

		test('element does not have custom lazy load data attribute', async () => {
			await expect(LazyLoadImage.isElementLazyLoadable(mockHtmlElement('img'))).toEqual(false);
		});

		test('element is lazy load-able', async () => {
			await expect(LazyLoadImage.isElementLazyLoadable(mockHtmlElement('img', { 'data-lazyload': 'localhost' }))).toEqual(true);
		});

	});

	describe('IntersectionObserver options', () => {

		test('match the default', async () => {
			const expectedDefaultOptions = {
				root: null,
				rootMargin: '200px',
				threshold: 0,
			};

			const lazyLoader = new LazyLoadImage('#targetElement');
			await expect(lazyLoader.getIntersectionObserverOptions()).toEqual(expectedDefaultOptions);
		});

		test('match the passed in rootMargin', async () => {
			const expectedOptions = {
				root: null,
				rootMargin: '400px',
				threshold: 0,
			};

			const lazyLoader = new LazyLoadImage('#targetElement', '400px');
			await expect(lazyLoader.getIntersectionObserverOptions()).toEqual(expectedOptions);
		});

	});

	const mockHtmlElement = (nodeName, attributes = {}) => ({
		nodeName,
		attributes,
	});

});
