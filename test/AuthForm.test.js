import { cleanup, render } from '@testing-library/svelte';
import AuthForm from '$lib/AuthForm.svelte';

describe('AuthForm.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const { container } = render(AuthForm);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('password');
	});
});
