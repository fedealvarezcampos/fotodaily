import { cleanup, render } from '@testing-library/svelte';
import Loading from '$lib/Loading.svelte';

describe('Loading.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Loading);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('Loading...');
	});
});
