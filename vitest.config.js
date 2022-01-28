import { extractFromSvelteConfig } from 'vitest-svelte-kit';

export default extractFromSvelteConfig();

// import { defineConfig } from 'vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import { sveltekitViteConfig } from './svelte.config.js';

// export default defineConfig({
// 	...sveltekitViteConfig,
// 	plugins: [svelte({ hot: !process.env.VITEST })],
// 	test: {
// 		// vitest config here
// 		global: true,
// 		environment: 'jsdom'
// 	}
// });
