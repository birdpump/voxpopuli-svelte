<script>
    import { currentPoll } from '$lib/Store.js';
    import { onMount } from 'svelte';

    import Bar from "./bar.svelte"

    let visible = false;


    let data = [
        {username: "bob4", score: 88},
        {username: "bob5", score: 56}
    ];

    currentPoll.update(n => data) //todo should be updated from api
    onMount(async () => {
        visible = true
    });
</script>


<style>
    .animate-poll-cont{
        width: 80%;
    }
</style>

<div class="animate-poll-cont">
    {#if visible}
        {#each $currentPoll as data}
            <Bar value={data.score} user={data.username}/>
        {/each}
    {/if}

</div>



