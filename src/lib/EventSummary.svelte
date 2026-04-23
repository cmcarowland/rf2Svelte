<script lang="ts">
	import type { EventResult } from '$lib/types';

	let { eventData, onViewResults }: { eventData: EventResult; onViewResults: (eventData: EventResult) => void } = $props();

	function handleViewResults() {
		onViewResults(eventData);
	}
</script>

<article class="event-card">
	<div>
		<p class="label">Track</p>
		<h3>{eventData.trackName}</h3>
	</div>

	<div>
		<p class="label">Winner</p>
		<p class="winner">{eventData.winner}</p>
	</div>

	<button type="button" onclick={handleViewResults}>View Results</button>
</article>

<style>
	.event-card {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: minmax(0, 2fr) minmax(0, 3fr) auto;
		align-items: center;
		padding: 1rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		color: white;
	}

	.label {
		margin: 0 0 0.25rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.6);
	}

	h3,
	p {
		margin: 0;
	}

	.winner {
		color: #f3e7b3;
	}

	button {
		justify-self: end;
		padding: 0.75rem 1rem;
		border: 0;
		border-radius: 999px;
		background: #f3e7b3;
		color: #24124a;
		font-weight: 700;
		cursor: pointer;
	}

	button:hover {
		filter: brightness(0.95);
	}

	@media (max-width: 700px) {
		.event-card {
			grid-template-columns: 1fr;
		}

		button {
			justify-self: start;
		}
	}
</style>