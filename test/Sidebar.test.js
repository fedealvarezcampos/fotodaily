import { cleanup, render } from '@testing-library/svelte';
import Sidebar from '$lib/Sidebar.svelte';

describe('Sidebar.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Sidebar);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('Fresh photography');
	});
});
