import { cleanup, render } from '@testing-library/svelte';
import Layout from '../../src/routes/__layout.svelte';

describe('__layout.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Layout);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('bodyContainer');
	});
});
