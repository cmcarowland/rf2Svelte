<script lang="ts">
    export let jsonData : any;

    async function onChange(e : any) {
        const file = e.target.files[0];
        if(file == null) {
            jsonData = null;
            return;
        }

        jsonData = await readJsonFile(file);
    }
    
    function readJsonFile(file: File) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            try{
                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        resolve(JSON.parse(reader.result));
                    } else {
                        reject(new Error('File content is not a string'));
                    }
                };
            } catch (error) {
                reject(error);
            }
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