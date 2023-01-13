feature.on('click', e=> {
    console.log('Treasure Clicked', count)
    console.log(emojis)
    let audio = parcel.getFeatureById('treasure_error_audio') 
    if(count>=5){ 
      console.log('redeem!')
      audio = parcel.getFeatureById('treasure_success_audio')
      parcel.getFeatureById('treasure_gift').position.y = 2 
      e.player.emote(emojis[42])  
    }    
    else{
      e.player.emote(emojis[40])  
    }
    audio.play() 
  }) 