import { cleanup, render } from '@testing-library/svelte';
import Nav from '$lib/Nav.svelte';

describe('Nav.svelte', () => {
	afterEach(() => cleanup());

	//TODO check later for vitest - sveltekit modules integration
	it.skip('renders', () => {
		const { container } = render(Nav);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('ABOUT');
	});
});
