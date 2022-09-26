let WARNING_KEYS = []

fetch("https://scamtdtf.com:3000/api/getwarningkeys", { method: "POST" })
    .then(res => res.json())
    .then(res =>{
        for(let i = 0; i < res.length; i++){
            res[i].keys = JSON.parse(res[i].keys)
        }

        WARNING_KEYS = res;
});