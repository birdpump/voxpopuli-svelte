<script>
    import '$lib/assets/global.css'
    let options = [''];
  
    // Function to add a new option
    function addOption() {
      options = [...options, ''];
    }
  
    // Function to remove an option by index
    function removeOption(index) {
      options = options.filter((_, i) => i !== index);
    }
  
    // Function to update option value
    function updateOption(index, value) {
      options[index] = value;
      options = options;
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
    }
  
    .option-input {
      display: flex;
      gap: 10px;
      align-items: center;
      background-color: var(--accent);
      border: 5px var(--primary) solid;
      border-radius: 3px;
      color: var(--text);
    }
    .option-input button{
        background: none;
        outline: none;
        border: none;
    }
    .option-input input{
        background: none;
        outline: none;
        border: none;
    }
  
    button {
      cursor: pointer;
    }
  </style>
  
  <div class="main-cont">
    <h1 style="text-align: center; font-weight: bold;">Create Poll</h1>
    <form>
      {#each options as option, index (index)}
        <div class="option-input">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            bind:value={options[index]}
            on:input={e => updateOption(index, e.target.value)}
          />
          {#if options.length > 0}
            <button type="button" on:click={() => removeOption(index)}>Remove</button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={addOption}>Add Option</button>
      <button type="submit">Submit</button>
    </form>
  </div>
  