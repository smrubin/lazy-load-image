import LazyLoad from '../index.js';

(async () => {

	try {
		new LazyLoad('#targetElement');
	} catch(err) {
		console.log(err);
	}

})();
