<script>
	export let showModal;
</script>

{#if showModal}
	<div class="modal">
		<slot />
	</div>
	<div class="modalBG" on:click|self />
{/if}

<style lang="postcss">
	.modalBG {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(4px);
		background-color: rgba(0, 0, 0, 0.39);
		z-index: 3;
	}

	.modal {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		height: fit-content;
		width: fit-content;
		margin: auto;
		padding: 2.55rem 2.25rem 2.6rem 2.2rem;
		border: 6px solid var(--pink);
		border-radius: 8px;
		background-color: var(--red);
		z-index: 4;
	}
</style>
