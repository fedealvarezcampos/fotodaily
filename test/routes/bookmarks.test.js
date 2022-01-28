import { cleanup, render } from '@testing-library/svelte';
import Bookmarks from '../../src/routes/bookmarks.svelte';
import { sidebarOut } from '../../src/stores';
import { vi } from 'vitest';

vi.mock('$app/navigation', () => {
	return {
		afterNavigate: vi.fn()
	};
});

describe('bookmarks.svelte', () => {
	afterEach(() => cleanup());

	sidebarOut.set(true);

	it('renders', () => {
		const { container } = render(Bookmarks);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('loader');
	});
});
