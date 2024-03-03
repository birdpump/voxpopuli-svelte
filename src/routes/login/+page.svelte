<script>
    // Import statements and logic remain largely the same
    
    import '$lib/assets/global.css'
    let username = '';
    let password = '';
    let errorMessage = '';
  
    // handleLogin function would also need adjustments for Svelte, not shown here
  
    function handleLogin(e) {
      e.preventDefault();
      // Your login logic here
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
      <p style="color: blue; margin-top: 20px;">
        Don't have an account? <a href="/register">Register</a>
      </p>
      <button type="submit">Login</button>
    </form>
  </div>
  