<script lang="ts">
	import type { EventResult } from '$lib/types';

	let { eventData, onClose }: { eventData: EventResult; onClose: () => void } = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="backdrop" role="presentation" on:click={onClose}>
	<section class="dialog" role="dialog" aria-modal="true" aria-labelledby="event-title" on:click|stopPropagation>
		<header>
			<div>
				<p class="label">Completed Race</p>
				<h2 id="event-title">{eventData.trackName}</h2>
			</div>
			<button type="button" class="close" on:click={onClose}>Back to Championship</button>
		</header>

		<div class="meta">
			<p><span>Winner:</span> {eventData.winner}</p>
			<p><span>Pole:</span> {eventData.pole}</p>
			<p><span>Fast Lap:</span> {eventData.fastLap}</p>
		</div>

		<ol>
			{#each eventData.results as result}
				<li>{result}</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 1.5rem;
		background: rgba(5, 4, 18, 0.78);
		backdrop-filter: blur(8px);
		z-index: 20;
	}

	.dialog {
		width: min(900px, 100%);
		max-height: min(88vh, 900px);
		overflow: auto;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 1rem;
		background: #13092d;
		color: white;
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
		margin-bottom: 1rem;
	}

	.label {
		margin: 0 0 0.25rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.6);
	}

	h2,
	p {
		margin: 0;
	}

	.close {
		padding: 0.75rem 1rem;
		border: 0;
		border-radius: 999px;
		background: #f3e7b3;
		color: #24124a;
		font-weight: 700;
		cursor: pointer;
		white-space: nowrap;
	}

	.meta {
		display: grid;
		gap: 0.4rem;
		margin-bottom: 1.25rem;
		padding: 1rem;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
	}

	.meta span {
		font-weight: 700;
		color: #f3e7b3;
	}

	ol {
		margin: 0;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.4rem;
	}

	li {
		padding: 0.35rem 0;
	}

	@media (max-width: 700px) {
		header {
			flex-direction: column;
		}
	}
</style>