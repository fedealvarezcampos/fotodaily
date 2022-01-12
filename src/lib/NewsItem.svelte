<script>
	export let newsItem;
</script>

<li>
	<a class="newsItem" href={newsItem.attributes.link} target="__blank">
		<div class="titleContainer">
			<span>{newsItem.attributes.title}</span>
			<span>{newsItem.attributes.site}</span>
			<span>{new Date(newsItem.attributes.date).toDateString()}</span>
		</div>
		<div class="infoContainer">
			<img src={newsItem.attributes.image} alt="" />
			<div>
				<p>{newsItem.attributes.preview + '...'}</p>
			</div>
		</div>
	</a>
</li>

<style lang="postcss">
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

		p {
			margin: 0;
		}

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
			gap: 0.3rem;

			span {
				&:first-child {
					font-size: 1.5rem;
					font-weight: 700;
					padding-bottom: 0.2rem;
				}

				&:nth-child(2) {
					font-size: 1.2rem;
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
			font-size: 1.1rem;
			word-break: break-word;
		}
	}
</style>
