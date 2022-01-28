import { vi } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import About from '../../src/routes/about.svelte';
import { sidebarOut } from '../../src/stores';

vi.mock('$app/navigation', () => {
	return {
		afterNavigate: vi.fn()
	};
});

describe('about.svelte', () => {
	afterEach(() => cleanup());

	sidebarOut.set(true);

	it('renders', () => {
		const { container } = render(About);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('aggregator');
	});
});
