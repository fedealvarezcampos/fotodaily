<script>
	import { toast } from '@zerodevx/svelte-toast';

	import axios from 'axios';
	import { hostURL } from '../host';
	import { isAuthed, fetchNewsTrigger, resetTrigger } from '../stores';

	export let toggleModal;

	let loading;

	let email;
	let password;
	let confirmPassword;

	let registrationForm = false;

	const handleRegistration = async () => {
		try {
			if (password !== confirmPassword) {
				toast.push("Passwords don't match!");
				return;
			}

			loading = true;

			const { data, error } = await axios.post(`${hostURL}/api/auth/local/register`, {
				email: email,
				password: password
			});

			if (error) throw error;

			if (data?.jwt) {
				isAuthed.set(true);
			}

			localStorage.user = JSON.stringify({
				jwt: data?.jwt,
				userId: data?.user?.id,
				email: data?.user?.email,
				confirmed: data?.user?.confirmed
			});

			toggleModal();
		} catch (error) {
			let errorMsg = error.response.data.error.message;
			toast.push(errorMsg);
		} finally {
			loading = false;
		}
	};

	const handleLogin = async () => {
		try {
			loading = true;

			const { data, error } = await axios.post(`${hostURL}/api/auth/local`, {
				identifier: email,
				password: password
			});

			if (error) throw error;

			if (data?.jwt) {
				isAuthed.set(true);
			}

			localStorage.user = JSON.stringify({
				jwt: data?.jwt,
				userId: data?.user?.id,
				email: data?.user?.email,
				confirmed: data?.user?.confirmed
			});

			resetTrigger.set('login');
			fetchNewsTrigger.set('login');
			toggleModal();
		} catch (error) {
			let errorMsg = error.response.data.error.message;
			toast.push(errorMsg);
		} finally {
			loading = false;
		}
	};
</script>

<form action="/" on:submit|preventDefault={registrationForm ? handleRegistration : handleLogin}>
	<span>{registrationForm ? 'REGISTER' : 'LOG IN'}</span>
	<div class="inputs">
		<label for="mail">
			Your email
			<input bind:value={email} type="email" name="mail" id="mail" />
		</label>
		<label for="pass">
			Your password
			<input bind:value={password} type="password" name="pass" id="pass" />
		</label>
		{#if registrationForm}
			<label for="confirmPass">
				Confirm password
				<input bind:value={confirmPassword} type="password" name="confirmPass" id="confirmPass" />
			</label>
		{:else}
			<span class="toRegistrationLink" on:click={() => (registrationForm = true)}>
				...or register first
			</span>
		{/if}
	</div>
	<span class="buttonContainer">
		<button>{registrationForm ? 'SIGN UP' : 'LOG IN'}</button>
		{loading ? 'Logging in...' : ''}
	</span>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		place-items: flex-start;
		gap: 1.5rem;

		span:first-child {
			font-size: 1.3rem;
			font-weight: 700;
		}
		.buttonContainer {
			margin-top: 0.5rem;
			display: flex;
			place-items: center;
			font-size: 1.1rem;
			font-style: italic;
			gap: 0.8rem;
		}

		.inputs {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			@media (max-width: 800px) {
				width: clamp(10rem, 60vw, 16rem);
			}

			> label {
				display: flex;
				flex-direction: column;
				gap: 0.6rem;
			}
		}

		.toRegistrationLink {
			width: fit-content;
			cursor: pointer;
			text-decoration: underline;
			font-size: 1.1rem;
			font-style: italic;

			&:hover {
				color: var(--pink);
				transition: color 150ms;
			}
		}
	}
</style>
