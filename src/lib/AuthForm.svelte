<script>
	import axios from 'axios';
	import { isAuthed } from '../stores';

	const hostURL = import.meta.env.VITE_HOSTURL;

	let email;
	let password;
	let confirmPassword;

	let err;

	const handleRegistration = async () => {
		try {
			if (password !== confirmPassword) {
				err = "Passwords don't match!";
				return;
			}

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
		} catch (error) {
			err = error.message;
		}
	};
</script>

<form action="/" on:submit|preventDefault={handleRegistration}>
	<span>REGISTER</span>
	<div class="inputs">
		<label for="mail">
			Your email
			<input bind:value={email} type="email" name="mail" id="mail" />
		</label>
		<label for="pass">
			Your password
			<input bind:value={password} type="password" name="pass" id="pass" />
		</label>
		<label for="confirmPass">
			Confirm password
			<input bind:value={confirmPassword} type="password" name="confirmPass" id="confirmPass" />
		</label>
	</div>
	{err}
	<button>SIGN IN</button>
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

		button {
			margin-top: 0.5rem;
		}

		.inputs {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			> label {
				display: flex;
				flex-direction: column;
				gap: 0.6rem;
			}
		}
	}
</style>
