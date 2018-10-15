import moduleName from './index.js';

describe('moduleName', () => {

	test('says hello moduleName', async () => {
		await expect(moduleName('Awesome Module')).toEqual('Hello Awesome Module');
	});

});
