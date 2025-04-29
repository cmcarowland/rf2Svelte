<tr class:player={jsonData.isPlayer == true}>
    <td class="td" class:center={true}>{jsonData.number}</td>
    <td>{jsonData.playerName}</td>
    <td>{jsonData.starts}</td>
    <td>{jsonData.points}</td>
    <td>{jsonData.wins}</td>
    <td>{jsonData.top5}</td>
    <td>{jsonData.top10}</td>
    <td>{jsonData.poles}</td>
    <td>{jsonData.dnfs}</td>
    <td>{jsonData.fastLaps}</td>
</tr>

<script lang="ts">
    let {jsonData} : {jsonData : any} = $props()
</script>

<style>
    tr {
        color: white;
    }
    
    .player {
        color: yellow;
    }
</style>