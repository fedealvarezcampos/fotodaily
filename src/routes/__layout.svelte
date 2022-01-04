<script>
	import '../app.css';

	import Nav from '$lib/Nav.svelte';
</script>

<Nav />

<main>
	<slot />
</main>

<footer>
	<p>This is a cool footer | {new Date().getFullYear()}</p>
</footer>

<style lang="postcss">
	footer {
		display: flex;
		place-content: center;
	}
</style>
