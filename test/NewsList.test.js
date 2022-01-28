import { cleanup, render } from '@testing-library/svelte';
import NewsList from '$lib/NewsList.svelte';
import { beforeEach } from 'vitest';

describe('NewsList.svelte', () => {
	afterEach(() => cleanup());

	let component;
	let loading;

	beforeEach(() => {
		const newsItems = [
			{
				attributes: {
					isLiked: false,
					isSaved: false,
					likes: 4,
					title: 'This is a title',
					site: 'http://asite.com',
					link: 'http://asite.com',
					image: 'http://asite.com/image.jpeg',
					preview: 'TLDR',
					date: new Date()
				}
			}
		];

		component = render(NewsList, {
			props: { newsItems, loading }
		});
	});

	it('renders', () => {
		expect(component.container).toBeTruthy();
		expect(component.container.innerHTML).toContain('newsList');
	});

	it('renders and is loading', () => {
		loading = true;

		component = render(NewsList, {
			props: { loading }
		});
		expect(component.container).toBeTruthy();
		expect(component.container.innerHTML).toContain('Loading...');
	});
});
