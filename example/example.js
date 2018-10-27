import LazyLoad from '../index.js';

(() => {

	try {
		new LazyLoad('#targetElement');
	} catch (err) {
		console.log(err);
	}

})();
