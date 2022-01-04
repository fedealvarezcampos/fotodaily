<script>
	let title = 'mi puta casa.';

	const changeTitle = () => {
		title = 'mi otra puta casa.';
	};

	let email;
</script>

<div class="mainContainer">
	<h1>Welcome to {title}</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<button on:click={changeTitle}>Change the title</button><br />

	<input type="email" name="email" id="email" bind:value={email} />

	<a href="/about">About page</a>
</div>

<style lang="postcss">
	.mainContainer {
		display: flex;
		flex-direction: column;
		place-items: center;

		h1 {
			color: blue;
		}
	}
</style>
