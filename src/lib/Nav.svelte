<script>
	let siteTitle = 'FOTODAILY';
</script>

<header>
	<p>{siteTitle}</p>
	<nav class="title">
		<ul>
			<li>
				<a href="/">HOME</a>
			</li>
			<li>
				<a href="/about">ABOUT</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		position: sticky;
		top: 0;
		display: flex;
		height: 6rem;
		place-items: center;
		place-content: center;
		font-weight: 700;
		border-bottom: 6px solid var(--red);
		background-color: var(--black);
		z-index: 3;

		p {
			&:first-child {
				font-size: 1.4rem;
			}
		}

		ul {
			display: flex;
			gap: 0.8rem;
			list-style: none;
		}
	}
</style>
