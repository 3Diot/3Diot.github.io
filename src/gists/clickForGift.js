// 
// Instructions:
// 0. Place this script on a vox-model of your gift (not a Collectible-vox-model)
// 1. Change the `contract_address` and `token_id` values (Unfortunately, it's burried in the code below).
// 2. Send your matic wearables to 0x7927134B972c0609221B435f84EaA6fF7993F0d2 so they may be gifted.
// Behavior: Gifts an NFT when clicked if wallet does not already own 

//
// Notes:
// Anything in this wallet can be gifted out by anybody so it's inherently insecure. 
// The money in the wallet is used to pay for gas and is communally pooled.  
// This service uses ethers.js and an alchemy API key behind the scenes. 
// LMK if you want me to send the wearables back or have idea or questions - Karpatic aka. cvminigames.
// 

parcel.on('playerenter', async e => {
  console.log('start')
  feature.on('click', e =>{   
    
    // 
    // ------- CHANGE THIS TO YOUR WEARABLES CONTRACT AND TOKEN ID. - THESE ARE THE VALUES IN THE OPENSEA URL ADDRESS BAR. -------
    //
    let contract_address = '0xc930d370c971f4679e03106d3714eef4100d8fbe'
    let token_id = '4'
    //
    //  ----------------------------------------------------------------------------------------------------------------------------
    //
    
    console.log('test', e.player.wallet)
    let url = (address) => `https://charleskarpati.com/api/distributor?user=${address}&contract=${contract_address}&token=${token_id}` 
    fetch(url(e.player.wallet))
  })
}) 
   