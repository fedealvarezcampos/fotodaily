<script>
	import '../app.css';

	import Nav from '$lib/Nav.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
</script>

<Nav />

<div class="bodyContainer">
	<Sidebar />
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.bodyContainer {
		display: flex;
	}
	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		place-content: center;
		place-items: center;
	}
</style>
