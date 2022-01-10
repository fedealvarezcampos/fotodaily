<script>
	import { onMount } from 'svelte';
	import axios from 'axios';

	let newsItems = [];
	let error = null;

	onMount(async () => {
		try {
			const res = await axios.get('http://localhost:1337/api/newsitems?sort=date:DESC');
			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		}
	});
</script>

{#if error !== null}
	{error}
{:else}
	<ul class="newsList">
		{#each newsItems as newsItem}
			<li>
				<a class="newsItem" href={newsItem.attributes.link} target="__blank">
					<div class="titleContainer">
						<span>{newsItem.attributes.site}</span>
						<span>{newsItem.attributes.title}</span>
						<span>{new Date(newsItem.attributes.date).toDateString()}</span>
					</div>
					<div class="infoContainer">
						<img src={newsItem.attributes.image} alt="" />
						<div>
							<p>{newsItem.attributes.preview.slice(0, 300) + '...'}</p>
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="postcss">
	.newsList {
		padding: 0;
		margin: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
		list-style: none;
		width: clamp(20rem, 70vw, 42rem);

		p {
			margin: 0;
		}
	}

	.newsItem {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 1.8rem;
		color: var(--white);
		border-radius: 8px;
		border: 6px solid var(--red);
		background-color: var(--black);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

		img {
			height: 9rem;
			width: 12rem;
			object-fit: cover;
			border-radius: 8px;
			border: 2px solid var(--white);
		}

		&:hover {
			cursor: pointer;
			user-select: none;
			filter: brightness(1.06);
			border: 6px solid var(--pink);
			transition: all 250ms;
		}

		.titleContainer {
			display: flex;
			flex-direction: column;
			margin-bottom: 0.6rem;
			gap: 0.6rem;

			span {
				&:first-child {
					font-size: 1.6rem;
					font-weight: 700;
				}

				&:nth-child(2) {
					font-size: 1.3rem;
				}

				&:last-child {
					padding-left: 0.1rem;
					font-style: italic;
					font-size: 0.8rem;
				}
			}
		}

		.infoContainer {
			display: flex;
			place-items: center;
			gap: 1.6rem;
		}
	}
</style>
