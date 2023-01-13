
et ETH = parcel.getFeatureById('ETH');\n\nsetInterval(function() {
    fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy')
    .then(response => response.json()).then(data => {
        ETH.set({text: 'ETH : $' + data.data.amount})
    })
}, 2000)