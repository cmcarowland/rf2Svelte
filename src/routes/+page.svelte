<script lang="ts">
    import Championship from '$lib/Championship.svelte';
    import Load from '$lib/Load.svelte';

    let jsonData : any = null;
</script>

<h1>Welcome to LeMan Ultimate Championship View</h1>
<Load bind:jsonData />
 {#if jsonData != null}
    {#each jsonData as series}
        {console.log(series)}
        <Championship jsonData={series} />
    {/each}
{:else }
    <h1>Upload a JSON file</h1>
{/if}

<style>
    :global(body) {
        background-color: rgb(13, 0, 45);
    }

    h1 {
        color: wheat;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100;
    }
</style>