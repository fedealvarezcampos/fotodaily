import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			test: {
				global: true,
				environment: 'jsdom'
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

// import path from 'path';

// export const sveltekitViteConfig = {
// 	resolve: {
// 		alias: {
// 			$lib: path.resolve('./src/lib')
// 		}
// 	}
// };
