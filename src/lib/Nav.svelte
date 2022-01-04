<script>
	let siteTitle = 'MY SITE';
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
		display: flex;
		place-content: center;

		ul {
			display: flex;
			gap: 0.8rem;
			list-style: none;
		}

		li {
			font-weight: 800;
		}
	}
</style>
