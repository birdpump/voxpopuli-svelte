<script>
    // Import statements and logic remain largely the same
    import axios from 'axios';
    import { goto } from "$app/navigation";

    import {isLoggedIn} from "$lib/Store.js";
    import {currentUsername} from "$lib/Store.js";

    const apiURL = 'http://localhost:8080/api' //todo change this for deployment


    import '$lib/assets/global.css'
    let username = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';

    // handleLogin function would also need adjustments for Svelte, not shown here

    function handleLogin(e) {
        e.preventDefault();
        // Your login logic here
    }
    async function login() {
        const response = await axios.post(`${apiURL}/users/register`, { username, password, confirmPassword });
        if (response.status === 200) {
            await goto("/login");
        }else if (response.data === "Passwords do not match") {
            // setErrorMessage("Passwords do not match. Please try again.");
        }
        else if (response.data === "Username already exists") {
            // setErrorMessage("Username already exists. Please try again.");
        }
    }

</script>
<style>
    #login-parent{

    }
</style>
<div id="login-parent">
    <h2>Login</h2>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={handleLogin}>
        <div>
            <label>Username: </label>
            <input type="text" bind:value={username}/>
        </div>
        <div>
            <label>Password: </label>
            <input type="password" bind:value={password}/>
        </div>
        <div>
            <label>Confirm Password: </label>
            <input type="password" bind:value={confirmPassword}/>
        </div>
        <p style="color: blue; margin-top: 20px;">
            Don't have an account? <a href="/register">Register</a>
        </p>
        <button type="submit" on:click={login}>Login</button>
    </form>
</div>
