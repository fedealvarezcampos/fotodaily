import { cleanup, render } from '@testing-library/svelte';
import Sorter from '$lib/Sorter.svelte';

describe('Sorter.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Sorter);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('SORTING BY');
	});
});
