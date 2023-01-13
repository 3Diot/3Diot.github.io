feature.on('click', e=> {
  console.log('Treasure Clicked', count)
  console.log(emojis)
  if(count>=5){ 
    console.log('redeem!')
    parcel.getFeatureById('treasure_success_audio').play()
    let gift = parcel.getFeatureById('treasure_gift')
    gift.position.y = 2 
    e.player.emote(emojis[42])  
  }    
  else{
    e.player.emote(emojis[40])  
    parcel.getFeatureById('treasure_error_audio').play()
  } 
})  