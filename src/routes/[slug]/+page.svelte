<script>
    import { onMount, onDestroy } from 'svelte';
    import axios from 'axios';
    import { goto } from "$app/navigation";

    import { hasVoted, currentUsername } from "$lib/Store.js";

    let poll;
    let comments = [];
    let newComment = '';
    let errorMessage = '';

    let username = $currentUsername;
    let id;
    const apiURL = 'http://localhost:8080/api'; // Change this for deployment

    export let data;

    function fetchData() {
        if (data && data.slug) {
            id = data.slug;
            axios.get(`${apiURL}/polls/${id}`)
                .then(response => {
                    poll = response.data;
                })
                .catch(error => {
                    console.error(error);
                    errorMessage = "Error loading poll.";
                });

            axios.get(`${apiURL}/polls/${id}/comments`)
                .then(response => {
                    comments = response.data;
                })
                .catch(error => {
                    console.error(error);
                    errorMessage = "Error loading comments.";
                });
        } else {
            errorMessage = "Poll ID not provided.";
        }
    }

    async function vote(optionId) {
        console.log(optionId);
        if (!username) {
            errorMessage = "You must be logged in to vote.";
            return;
        }

        try {
            await axios.post(`${apiURL}/polls/options/${optionId}/vote?username=${username}`);
            hasVoted.set(true);
            await fetchData();
        } catch (error) {
            console.error(error);
            errorMessage = "You have already voted in this poll.";
        }
    }

    async function submitComment() {
        if (!username || !newComment.trim()) {
            errorMessage = "You must be logged in and comment cannot be empty.";
            return;
        }

        try {
            await axios.post(`${apiURL}/polls/${id}/comments`, { username, text: newComment });
            newComment = '';
            await fetchData();
        } catch (error) {
            console.error(error);
            errorMessage = "Error submitting comment.";
        }
    }

    function hasEndTimePassed(endTime) {
        return new Date(endTime).getTime() < new Date().getTime();
    }

    onMount(fetchData);
    onDestroy(() => {
        poll = null;
        comments = [];
        newComment = '';
        errorMessage = '';
    });
</script>

<div style="padding-left: 20px">
    <button on:click={() => goto('/')} style="margin-top: 20px; margin-right: 20px; float: right;">Back to Home</button>
    {#if poll}
        <h2>{poll.name}</h2>
        <p>{poll.description}</p>
        <p>Started on: {new Date(poll.startTime).toLocaleString() + " GMT"}</p>
        <p>Ends on: {new Date(poll.endTime).toLocaleString() + " GMT"}</p>
        <div>
            {#each poll.options as option}
                <div key={option.id}>
                    <p>{option.description} - Votes: {option.votes.length}</p>
                    <button on:click={() => vote(option.id)}
                            style="background-color: {hasEndTimePassed(poll.endTime) ? '#ccc' : ''}; cursor: {hasEndTimePassed(poll.endTime) ? 'not-allowed' : 'pointer'}">
                        Vote
                    </button>
                </div>
            {/each}
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            {#each comments as comment}
                <div style="margin-bottom: 10px;">
                    <strong>{comment.username}: </strong>{comment.text}
                </div>
            {/each}
            <textarea bind:value={newComment} placeholder="Add a comment..."></textarea>
            <button on:click={submitComment}>Submit</button>
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
</div>
