<script lang="ts">
	import type { EventResult } from '$lib/types';

	let { eventData, onClose }: { eventData: EventResult; onClose: () => void } = $props();

	function formatResult(result: string) {
		return result.split('#')[1]?.trim() ?? result;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onClose()}>
	<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="event-title" tabindex="-1">
		<header>
			<div>
				<p class="label">Completed Race</p>
				<h2 id="event-title">{eventData.trackName}</h2>
			</div>
			<button type="button" class="close" onclick={onClose}>Back to Championship</button>
		</header>

		<div class="meta">
			<p><span>Winner:</span> {eventData.winner}</p>
			<p><span>Pole:</span> {eventData.pole}</p>
			<p><span>Fast Lap:</span> {eventData.fastLap}</p>
		</div>

		<ol>
			{#each eventData.results as result, index}
				<li>
					<span class="entry-position">{index + 1}</span>
					<span class="entry-name">{formatResult(result)}</span>
				</li>
			{/each}
		</ol>
	</div>
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
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.4rem;
	}

	li {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		gap: 0.75rem;
		align-items: center;
		padding: 0.85rem 0.95rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.95rem;
		background: rgba(255, 255, 255, 0.045);
		color: rgba(255, 255, 255, 0.94);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
	}

	.entry-position {
		display: inline-grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 999px;
		background: rgba(243, 231, 179, 0.16);
		border: 1px solid rgba(243, 231, 179, 0.35);
		color: #f3e7b3;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.entry-name {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}

	@media (max-width: 700px) {
		header {
			flex-direction: column;
		}

		li {
			grid-template-columns: 42px minmax(0, 1fr);
		}

		.entry-position {
			width: 2rem;
			height: 2rem;
		}
	}
</style>