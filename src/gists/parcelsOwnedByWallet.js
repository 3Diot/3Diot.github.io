//
// Unused

let parcels = []

// https://api.etherscan.io/apis
let etherscanUrl = "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x79986af15539de2db9a5086382daeda917a9cf0c&address=0x7b19B42564AD1C03625e8306CF20DeEA2F923a67&page=1&offset=100&sort=asc&apikey=YourApiKeyToken"
let response = await fetch(etherscanUrl);
    let data = await response.json()
data.result.map( tx => { // oldest to newest
console.log({tx})
if (tx.to== wallet){ parcels.push(tx.value) }
else{ parcels.splice( parcels.indexOf(tx.value), 1) }
})