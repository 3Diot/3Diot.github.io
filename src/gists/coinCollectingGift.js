// 
// Use the script from this link and not what you see here: 
// https://gist.github.com/karpatic/a62df59ae4794b8de91b4d2c8a56a763
// I want to expand ^ w/ this script to support asking for crypto in exchange for the wearable but it's not there yet.
// 
count = 0

parcel.on('playerenter', e => {
  feature.on('click', async e=>{
     console.log('Gift Clicked', count)

    // 
    // ------- CHANGE THIS TO YOUR WEARABLES CONTRACT AND TOKEN ID. - THESE ARE THE VALUES IN THE OPENSEA URL ADDRESS BAR. -------
    //
    let contract_address = '0xc930d370c971f4679e03106d3714eef4100d8fbe'
    let token_id = '4'
    //
    //  ----------------------------------------------------------------------------------------------------------------------------
    //
    let url = (address) => `https://charleskarpati.com/api/distributor?user=${address}&contract=${contract_address}&token=${token_id}` 
    let r = {message: 'No Response Returned'}
    try {
      r = await ( await fetch(url(e.player.wallet) ) ).json()
    }
    catch{ }
    let greenCheck = "https://media-crvox.sfo2.digitaloceanspaces.com/0x7b19b42564ad1c03625e8306cf20deea2f923a67/check_9aa35c7531d6761797824ed8d6882853.vox"
    let redx = "https://media-crvox.sfo2.digitaloceanspaces.com/0x7b19b42564ad1c03625e8306cf20deea2f923a67/redX_d6962dc240a7ae32436933bba16dc7f9.vox"
    if(r.message == 'Error: Failure to redeem'){
      console.log('Error: Failure to redeem')
      feature.set({url: redx})
    }
    else if(r.message == 'Error: You are being rate limited'){ 
      console.log('Ignoring double click.') 
      feature.set({url: greenCheck })
    }
    else if(r.message == 'Error: Wallet Has Token'){
      console.log('You already have this token!')
      feature.set({url: greenCheck })
    }
    else{
      console.log('SUCCESS!')
      feature.set({url: greenCheck })
    }

    // http://blog.cryptovoxels.com/scripting-bundle/classes/player.Player.html#hasNFT
    // e.player.askForCrypto("0.05")
    // function failCallback(s){ console.log('fail: ', s)}
    // function successCallback(b){ console.log('success: ', b)}
    // e.player.hasNFT( 'matic', '0xc930d370c971f4679e03106d3714eef4100d8fbe', '4', successCallback, failCallback)
    // e.player.hasEthereumNFT( '0xb2fa4b108bcb7ef72c4457af780621a5d4b4ee94', '16', successCallback, failCallback)
  })
})