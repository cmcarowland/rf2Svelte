<script lang="ts">
    import JSON5 from 'json5';
    import type { ChampionshipFile, ChampionshipSeries } from '$lib/types';

    export let jsonData: ChampionshipFile | null;

    async function onChange(e: Event) {
        const input = e.currentTarget as HTMLInputElement;
        const file = input.files?.[0] ?? null;

        if (file == null) {
            jsonData = null;
            return;
        }

        try {
            jsonData = await readJsonFile(file);
        } catch (error) {
            console.error('Unable to load championship file', error);
            jsonData = null;
        }
    }

    function normalizeChampionshipData(parsedData: unknown): ChampionshipFile {
        if (Array.isArray(parsedData)) {
            return parsedData as ChampionshipFile;
        }

        if (
            parsedData != null &&
            typeof parsedData === 'object' &&
            'championships' in parsedData &&
            Array.isArray((parsedData as { championships: unknown }).championships)
        ) {
            return (parsedData as { championships: ChampionshipFile }).championships;
        }

        if (
            parsedData != null &&
            typeof parsedData === 'object' &&
            'vehicleType' in parsedData &&
            'drivers' in parsedData &&
            'events' in parsedData
        ) {
            return [parsedData as ChampionshipSeries];
        }

        throw new Error('Unsupported championship JSON format');
    }

    function readJsonFile(file: File): Promise<ChampionshipFile> {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                try {
                    if (typeof reader.result !== 'string') {
                        reject(new Error('File content is not a string'));
                        return;
                    }

                    let parsedData: unknown;

                    try {
                        parsedData = JSON.parse(reader.result);
                    } catch {
                        // Fallback for user-authored files containing trailing commas/comments.
                        parsedData = JSON5.parse(reader.result);
                    }

                    resolve(normalizeChampionshipData(parsedData));
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
</script>

<input type="file" accept=".json" onchange={onChange} />

<style>
    input {
        color: white;
    }
</style>