<script lang="ts">
    import Championship from '$lib/Championship.svelte';
    import EventModal from '$lib/EventModal.svelte';
    import Load from '$lib/Load.svelte';
    import type { ChampionshipFile, EventResult } from '$lib/types';

    let jsonData: ChampionshipFile | null = null;
    let selectedEvent: EventResult | null = null;

    function handleViewEvent(eventData: EventResult) {
        selectedEvent = eventData;
    }

    function closeEventModal() {
        selectedEvent = null;
    }
</script>

<h1>Welcome to LeMan Ultimate Championship View</h1>
<Load bind:jsonData />
{#if jsonData != null}
    {#each jsonData as series, index (series.vehicleType + '-' + index)}
        <Championship jsonData={series} onViewEvent={handleViewEvent} />
    {/each}
{:else}
    <h1>Upload a JSON file</h1>
{/if}

{#if selectedEvent != null}
    <EventModal eventData={selectedEvent} onClose={closeEventModal} />
{/if}

<style>
    :global(body) {
        background:
            radial-gradient(circle at top, rgba(243, 231, 179, 0.12), transparent 28%),
            radial-gradient(circle at 20% 20%, rgba(98, 72, 208, 0.22), transparent 24%),
            linear-gradient(180deg, #10061f 0%, #06030f 100%);
        min-height: 100vh;
        color: white;
    }

    :global(*) {
        box-sizing: border-box;
    }

    h1 {
        width: min(1180px, calc(100vw - 2rem));
        margin: 1.5rem auto 0.75rem;
        color: #f4e9be;
        font-size: clamp(1.8rem, 3vw, 3.1rem);
        line-height: 1.05;
        letter-spacing: -0.03em;
    }

    :global(body) :global(input[type='file']) {
        display: block;
        width: min(1180px, calc(100vw - 2rem));
        margin: 0 auto 1rem;
        padding: 0.85rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 0.9rem;
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
    }
</style>