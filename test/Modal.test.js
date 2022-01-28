import { cleanup, render } from '@testing-library/svelte';
import Modal from '$lib/Modal.svelte';

describe('Modal.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(Modal);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toBe('<div></div>');
	});
});
