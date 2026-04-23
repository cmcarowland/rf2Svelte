<div class:player={jsonData.isPlayer == true} class="driver-row">
    <div class="cell position">{position}</div>
    <div class="cell number">{jsonData.number}</div>
    <div class="cell name">{jsonData.playerName}</div>
    <div class="cell">{jsonData.starts}</div>
    <div class="cell points">{jsonData.points}</div>
    <div class="cell">{jsonData.wins}</div>
    <div class="cell">{jsonData.top5}</div>
    <div class="cell">{jsonData.top10}</div>
    <div class="cell">{jsonData.poles}</div>
    <div class="cell">{jsonData.dnfs}</div>
    <div class="cell">{jsonData.fastLaps}</div>
</div>

<script lang="ts">
    import type { DriverStanding } from '$lib/types';

    type Props = {
        jsonData: DriverStanding;
        position: number;
    };

    let { jsonData, position }: Props = $props();
</script>

<style>
    .driver-row {
        display: grid;
        grid-template-columns: 64px 72px minmax(220px, 2.2fr) repeat(8, minmax(72px, 1fr));
        gap: 0.5rem;
        align-items: center;
        padding: 0.9rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.045);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.92);
        transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease;
    }

    .driver-row:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.065);
        border-color: rgba(255, 255, 255, 0.14);
    }

    .cell {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .position,
    .number {
        font-variant-numeric: tabular-nums;
        color: rgba(255, 255, 255, 0.7);
    }

    .name {
        font-weight: 700;
        color: white;
    }

    .points {
        color: #f4e9be;
        font-weight: 700;
    }

    .player {
        background: linear-gradient(90deg, rgba(243, 231, 179, 0.22), rgba(255, 255, 255, 0.06));
        border-color: rgba(243, 231, 179, 0.35);
        color: white;
    }

    @media (max-width: 780px) {
        .driver-row {
            grid-template-columns: 56px 64px minmax(180px, 1.7fr) repeat(4, minmax(64px, 1fr));
        }
    }

    @media (max-width: 640px) {
        .driver-row {
            grid-template-columns: 52px 60px minmax(160px, 1.4fr) repeat(8, minmax(64px, 1fr));
            padding: 0.8rem 0.75rem;
            font-size: 0.8rem;
        }
    }
</style>