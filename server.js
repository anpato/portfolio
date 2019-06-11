const Axios = require('axios')
let data = []

async function run(){
    return Axios.get('https://api.coincap.io/v2/assets')
}

run().then(resp => resp.data).then(res => data.push(res))
 console.log(data)