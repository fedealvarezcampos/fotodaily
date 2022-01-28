import { cleanup, render } from '@testing-library/svelte';
import Index from '../../src/routes/index.svelte';

describe('index.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Index);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('loader');
	});
});
