<script>
    // Your existing script remains unchanged
    import '$lib/assets/global.css';
    let options = ['', ''];
  
    // Adjusted to prevent adding more than 10 options
    function addOption() {
      if (options.length < 10) {
        options = [...options, ''];
      }
    }
  
    // Function to remove an option by index remains unchanged
    function removeOption(index) {
      options = options.filter((_, i) => i !== index);
    }
  
    // Function to update option value remains unchanged
    function updateOption(index, value) {
      options[index] = value;
    }
  
    // New function to handle form submission
    async function handleSubmit() {
      const pollTitle = document.querySelector('.poll-title').value; // Assuming you have a poll title input
      if (!pollTitle || options.some(option => option.trim() === '')) {
        console.error('Please fill all fields.');
        return;
      }
  
      try {
        const response = await fetch('/api/poll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: pollTitle, options: options.filter(option => option.trim() !== '') }),
        });
  
        if (response.ok) {
          console.log('Poll created successfully');
        } else {
          console.error('Failed to create poll');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  </script>
  
  <style>
    .main-cont {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      background-color: var(--cont-background);
      margin: 0 auto;
      width: 450px;
      margin-bottom: 100px;
      border-radius: 8px;
    }
  
    .option-input {
      display: flex;
      gap: 10px;
      align-items: center;
      background-color: var(--option-color);
      border: 4px var(--secondary) solid;
      border-radius: 3px;
      color: var(--text);
      margin-bottom: 20px;
    }
    .option-input button{
        background: none;
        outline: none;
        border: none;
        margin: auto;
    }
    .option-input input{
        background: none;
        outline: none;
        border: none;
        padding: 5px 0 5px 10px;
    }
    .poll-title{
        background: none;
        outline: none;
        border: none;
        width: 350px;
        font-size: 20px;
        display: flex;
        align-items: center;
        background-color: var(--accent);
        border: 5px var(--primary) solid;
        border-radius: 3px;
        color: var(--text);
        padding: 5px 0 5px 10px;
        margin-bottom: 50px;
    }
    .add-option-button{
        background: var(--option-color);
        border: 4px var(--secondary) solid;
    }
    .submit-button{
        float: right;
        background-color: var(--submit-button);
        border: 4px darkgreen solid;
    }
    .add-option-button, .submit-button,.cancel-button{
        border-radius: 3px;
        padding: 5px 10px;
        margin-bottom: 40px;
    }
    .add-option-button:disabled {
        background: grey;
        border-color: none;
        cursor: not-allowed;
    }
    .cancel-button{
        color: var(--text);
        float: right;
        background-color: red;
        border: 4px rgb(68, 0, 0) solid;
        text-align: center;
        margin: 0 auto;
        height: fit-content;
    }
    .main-buttons-parent{
        display: flex;

        place-content: center;
    }
    button {
      cursor: pointer;
    }
  </style>
  
  <div class="main-cont">
    <h1 style="text-align: center; font-weight: bold;">Create Poll</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <input class="poll-title" type="text" placeholder="Poll Title">
      {#each options as option, index (index)}
        <div class="option-input">
          <input type="text" placeholder={`Option ${index + 1}`} bind:value={options[index]} on:input={e => updateOption(index, e.target.value)} />
          <button type="button" on:click={() => removeOption(index)}>Remove</button>
        </div>
      {/each}
      <div class="main-buttons-parent">
        <button class="add-option-button" type="button" on:click={addOption} disabled={options.length >= 10}>Add Option</button>
        <div class="cancel-button">
            Cancel
        </div>
        <button class="submit-button" type="button" on:click={handleSubmit}>Submit</button>
      </div>
      
    </form>
  </div>
  