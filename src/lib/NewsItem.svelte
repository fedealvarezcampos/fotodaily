<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { hostURL } from '../host';

	export let newsItem;

	let isLiked;

	$: heartColor = isLiked
		? 'invert(58%) sepia(37%) saturate(414%) hue-rotate(318deg) brightness(88%) contrast(85%)'
		: 'none';

	const { jwt: token } = JSON.parse(localStorage.getItem('user'));

	console.log(token);

	let likes;

	let loading;
	let error;

	const fetchLikes = async () => {
		try {
			loading = true;
			const res = await axios.get(`${hostURL}/api/newsitems/${newsItem.id}/likes`);

			isLiked = res?.data?.data?.attributes?.isLiked;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	const likePost = async () => {
		try {
			const res = await axios.post(`${hostURL}/api/newsitems/${newsItem.id}/likes`, '', {
				headers: { Authorization: `Bearer ${token}` }
			});

			console.log(res);
		} catch (e) {
			error = e;
		}
	};

	onMount(async () => fetchLikes());
</script>

<li class="newsItem">
	<a href={newsItem.attributes.link} target="__blank">
		<div class="titleContainer">
			<span>{newsItem.attributes.title.slice(0, 120)}</span>
			<span>{newsItem.attributes.site}</span>
			<span>{new Date(newsItem.attributes.date).toDateString()}</span>
		</div>
		<div class="infoContainer">
			<div>
				<img src={newsItem.attributes.image} alt="" />
			</div>
			<div>
				<p>{newsItem.attributes.preview.slice(0, 150) + '...'}</p>
			</div>
		</div>
	</a>
	{#if !loading}
		<div class="buttons">
			<span>
				<button on:click={likePost}
					><img
						style="--heartColor: {heartColor}"
						src="./images/like.svg"
						alt="like button"
					/></button
				>{newsItem.attributes.likes}
			</span>
			<button><img src="./images/archive.svg" alt="like button" /></button>
		</div>
	{/if}
</li>

<style lang="postcss">
	.newsItem {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 28rem;
		width: 30rem;
		padding: 2rem 1.8rem;
		border-radius: 8px;
		border: 6px solid var(--red);
		background-color: var(--black);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
		user-select: none;

		a {
			height: 20rem;
			display: flex;
			flex-direction: column;
			place-content: center;
			gap: 1.6rem;
			color: var(--white);
		}

		p {
			margin: 0;
		}

		&:hover {
			cursor: pointer;
			filter: contrast(1.04);
			transition: all 250ms;
		}

		.titleContainer {
			display: flex;
			flex-direction: column;
			margin-bottom: 0.6rem;
			gap: 0.3rem;

			span {
				&:first-child {
					font-size: 1.3rem;
					font-weight: 700;
					padding-bottom: 0.2rem;
				}

				&:nth-child(2) {
					font-size: 1.2rem;
					padding-left: 0.1rem;
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
			gap: 1.5rem;
			font-size: 1.1rem;
			word-break: break-word;

			img {
				height: 10rem;
				width: 12rem;
				object-fit: cover;
				border-radius: 4px;
				border: 3px solid var(--red);
			}
		}

		.buttons {
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 0.5rem;
			width: 100%;
			display: flex;
			justify-content: center;
			gap: 1.4rem;
			border-top: 1px solid var(--red);

			span {
				display: flex;
				place-items: center;
				font-weight: 700;
				font-size: 1.25rem;
				color: var(--pink);
			}

			button {
				display: flex;
				place-items: center;
				border: unset;
				background-color: unset;
			}

			img {
				width: 1.6rem;
				border: unset;
				filter: var(--heartColor);

				&:hover {
					filter: invert(58%) sepia(37%) saturate(414%) hue-rotate(318deg) brightness(88%)
						contrast(85%);
					transition: all 80ms;
				}

				&:active {
					filter: brightness(400%);
					transition: all 80ms;
				}
			}
		}
	}
</style>
