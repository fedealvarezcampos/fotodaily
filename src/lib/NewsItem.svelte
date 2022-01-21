<script>
	import axios from 'axios';
	import { hostURL } from '../host';

	export let newsItem;

	let loading;

	let {
		//
		isLiked,
		likes,
		title,
		site,
		date,
		link,
		image,
		preview
	} = newsItem?.attributes;

	// CSS for like hearts
	$: heartColor = isLiked
		? 'invert(58%) sepia(37%) saturate(414%) hue-rotate(318deg) brightness(88%) contrast(85%)'
		: 'none';

	let error;

	const likePost = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			const res = await axios.post(`${hostURL}/api/newsitems/${newsItem.id}/likes`, '', {
				headers: { Authorization: `Bearer ${token}` }
			});

			isLiked = res?.data?.data?.attributes?.isLiked;
			likes = res?.data?.data?.attributes?.likes;
		} catch (e) {
			error = e;
		}
	};

	const savePost = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			const res = await axios.post(`${hostURL}/api/newsitems/${newsItem.id}/save`, '', {
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch (e) {
			error = e;
		}
	};
</script>

<li class="newsItem">
	<a href={link} target="__blank">
		<div class="titleContainer">
			<span>{title.length > 95 ? title.slice(0, 90) + ' [...]' : title}</span>
			<span>{site}</span>
			<span>{new Date(date).toDateString()}</span>
		</div>
		<div class="infoContainer">
			<div>
				<img src={image} alt="" />
			</div>
			<div>
				<p>{preview.slice(0, 150) + '...'}</p>
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
						alt="like item"
					/></button
				>{likes}
			</span>
			<button on:click={savePost}><img src="./images/archive.svg" alt="save item" /></button>
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

		@media (max-width: 800px) {
			height: fit-content;
			width: clamp(10rem, 28rem, 90vw);
		}

		a {
			height: 20rem;
			display: flex;
			flex-direction: column;
			place-content: center;
			gap: 1.6rem;
			color: var(--white);

			@media (max-width: 800px) {
				gap: 0.8rem;
				height: fit-content;
			}
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

			@media (max-width: 800px) {
				gap: 0.8rem;
				padding-bottom: 3rem;
				flex-direction: column;
				place-content: center;
			}

			img {
				height: 10rem;
				width: 12rem;
				object-fit: cover;
				border-radius: 4px;
				border: 3px solid var(--red);

				@media (max-width: 800px) {
					height: 10rem;
					width: clamp(8rem, 60vw, 18rem);
				}
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
					transform: scale(1.1);
					transition: all 80ms;
				}

				&:active {
					filter: brightness(400%);
					transform: scale(1);
					transition: all 80ms;
				}
			}
		}
	}
</style>
