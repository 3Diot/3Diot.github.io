count = 0

parcel.on('playerenter', e => {
  let giftTriggered = false
  feature.on('trigger', async e=>{
     if(giftTriggered){
       return
     }
     giftTriggered = true
     console.log('Gift Clicked', count)