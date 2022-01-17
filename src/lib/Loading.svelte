<span>Loading...</span>
<div class="loader" />

<style lang="postcss">
	span {
		color: var(--white);
		font-size: 1.2rem;
		padding-bottom: 0.2rem;
	}

	.loader {
		--n: 5; /* stripe number */
		--s: 25px; /* stripe width */
		--g: 5px; /*  gap  */
		--b: 5px; /* border */

		color: var(--pink);
		width: calc(var(--n) * (var(--s) + var(--g)) + var(--g) + (var(--b) * 2));
		height: 38px;
		padding: var(--g);
		margin: 5px auto;
		border: var(--b) solid;
		background: repeating-linear-gradient(
				90deg,
				currentColor 0 var(--s),
				#0000 0 calc(var(--s) + var(--g))
			)
			left / calc((var(--n) + 1) * (var(--s) + var(--g))) 100% no-repeat content-box;
		animation: load 1.5s steps(calc(var(--n) + 1)) infinite;
	}

	@keyframes load {
		0% {
			background-size: 0% 100%;
		}
	}
</style>
