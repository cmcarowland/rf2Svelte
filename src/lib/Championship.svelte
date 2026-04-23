<script lang="ts">
    import Driver from '$lib/Driver.svelte';
    import EventSummary from '$lib/EventSummary.svelte';
    import type { ChampionshipSeries, EventResult } from '$lib/types';

    let { jsonData, onViewEvent }: { jsonData: ChampionshipSeries; onViewEvent: (eventData: EventResult) => void } = $props();
</script>

<div class="championship-shell">
    <details class="standings-card">
        <summary>
            <div class="card-header">
                <div>
                    <p class="eyebrow">Championship Class</p>
                    <h2>{jsonData.vehicleType}</h2>
                </div>
                <div class="summary-meta">
                    <p class="count">{jsonData.drivers.length} entries</p>
                    <p class="toggle-hint">Click to collapse</p>
                </div>
            </div>
        </summary>

        <div class="standings-body">
            <div class="standings-grid header-row">
                <div>Pos</div>
                <div>No.</div>
                <div>Name</div>
                <div>Starts</div>
                <div>Points</div>
                <div>Wins</div>
                <div>Top 5</div>
                <div>Top 10</div>
                <div>Poles</div>
                <div>DNF</div>
                <div>Fast Laps</div>
            </div>

            <div class="standings-list">
                {#each jsonData.drivers as d, index}
                    <Driver jsonData={d} position={index + 1} />
                {/each}
            </div>
        </div>
    </details>

    <section class="events">
        <div class="section-heading">
            <p class="eyebrow">Completed Races</p>
            <h3>Race-by-race breakdown</h3>
        </div>
        <div class="event-list">
            {#each jsonData.events as eventData}
                <EventSummary eventData={eventData} onViewResults={onViewEvent} />
            {/each}
        </div>
    </section>
</div>

<style>
    .championship-shell {
        width: min(1180px, calc(100vw - 2rem));
        margin: 1.5rem auto 0;
        display: grid;
        gap: 1.5rem;
    }

    .standings-card,
    .events {
        padding: 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 1.25rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(8px);
    }

    .standings-card {
        padding: 0;
        overflow: clip;
    }

    .standings-card > summary {
        list-style: none;
        cursor: pointer;
        padding: 1.25rem 1.25rem 1rem;
    }

    .standings-card > summary::-webkit-details-marker {
        display: none;
    }

    .card-header,
    .section-heading {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .eyebrow {
        margin: 0 0 0.25rem;
        font-size: 0.72rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.58);
    }

    h2,
    h3,
    p {
        margin: 0;
    }

    h2 {
        color: #f4e9be;
        font-size: clamp(1.6rem, 2.3vw, 2.25rem);
        line-height: 1;
    }

    h3 {
        color: white;
        font-size: 1.05rem;
    }

    .count {
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.9rem;
    }

    .summary-meta {
        display: grid;
        justify-items: end;
        gap: 0.15rem;
    }

    .toggle-hint {
        color: rgba(255, 255, 255, 0.45);
        font-size: 0.75rem;
    }

    .standings-body {
        padding: 0 1.25rem 1.25rem;
    }

    .standings-grid {
        display: grid;
        grid-template-columns: 64px 72px minmax(220px, 2.2fr) repeat(8, minmax(72px, 1fr));
        gap: 0.5rem;
        align-items: center;
    }

    .header-row {
        padding: 0.85rem 0.9rem;
        margin-bottom: 0.75rem;
        border-radius: 0.9rem;
        background: rgba(10, 7, 28, 0.78);
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        backdrop-filter: blur(10px);
    }

    .standings-list {
        display: grid;
        gap: 0.55rem;
    }

    .events {
        display: grid;
        gap: 1rem;
    }

    .event-list {
        display: grid;
        gap: 0.85rem;
    }

    @media (max-width: 980px) {
        .championship-shell {
            width: min(1180px, calc(100vw - 1rem));
        }

        .standings-grid {
            grid-template-columns: 56px 64px minmax(190px, 2fr) repeat(8, minmax(64px, 1fr));
        }
    }

    @media (max-width: 780px) {
        .card-header,
        .section-heading {
            flex-direction: column;
            align-items: start;
        }

        .summary-meta {
            justify-items: start;
        }

        .standings-grid {
            grid-template-columns: 56px 64px minmax(180px, 1.7fr) repeat(4, minmax(60px, 1fr));
            overflow-x: auto;
        }
    }

    @media (max-width: 640px) {
        .championship-shell {
            width: calc(100vw - 0.75rem);
        }

        .standings-card,
        .events {
            padding: 1rem;
        }

        .standings-card > summary,
        .standings-body {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .standings-grid {
            grid-template-columns: 52px 60px minmax(160px, 1.4fr) repeat(8, minmax(64px, 1fr));
            font-size: 0.8rem;
        }
    }
</style>