<script lang="ts">
    import Driver from '$lib/Driver.svelte'

    let {jsonData} : {jsonData : any} = $props()
</script>

<div>
    <details>
        <summary>{jsonData['vehicleType']}</summary>
        <table>
            <thead>
                <tr>
                    <td>Position</td>
                    <td>Number</td>
                    <td>Name</td>
                    <td>Starts</td>
                    <td>Points</td>
                    <td>Wins</td>
                    <td>Top 5</td>
                    <td>Top 10</td>
                    <td>Poles</td>
                    <td>DNF</td>
                    <td>Fast Laps</td>
                </tr>
            </thead>
            <tbody>
                {#each jsonData['drivers'] as d, i}
                    <Driver jsonData={d} position={i+1} />
                {/each}
            </tbody>
        </table>
    </details>
</div>



<style>
    details {
        color: white;
    }

    summary {
        font-size: 20px;
        text-decoration: underline;
        margin-bottom: 10px;
    }

    table {
        width: 80%;
        margin: 0 auto;
    }

    thead tr td {
        text-decoration: underline;
    }
</style>