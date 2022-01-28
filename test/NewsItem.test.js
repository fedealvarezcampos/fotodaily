import { cleanup, render } from '@testing-library/svelte';
import NewsItem from '$lib/NewsItem.svelte';

describe('NewsItem.svelte', () => {
	afterEach(() => cleanup());

	it('renders', () => {
		const newsItem = {
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
		};

		const { container } = render(NewsItem, {
			props: { newsItem }
		});
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('infoContainer');
	});
});
