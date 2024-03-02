<script>
    import '$lib/assets/global.css'


    import AnimatePoll from "$lib/components/poll-animation/AnimatePoll.svelte";
    export let data;


</script>

<style>
    .main-cont {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
</style>

<div class="main-cont">
    <h1>{data.slug}</h1>
    <AnimatePoll/>
</div>


