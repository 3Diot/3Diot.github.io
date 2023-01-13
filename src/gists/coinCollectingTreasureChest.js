// 
// https://www.voxels.com/spaces/6cdcd1e5-de6b-4118-8167-43c801129973/play
//
// Place on: The treasure
// Behavior: Gift Pops out.
// Gift needs a featureId of 'treasure_gift' and can be a group feature consisting of multiple sub-features
// Requires 2 audio features to play success or failure sounds
//
// treasure_success_audio: https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3
// treasure_error_audio: https://cdn.pixabay.com/audio/2022/03/10/audio_e4e7943871.mp3
// treasure chest: https://wiki.cryptovoxels.com/treasure_chest.vox

feature.on('click', e=> {
  console.log('Treasure Clicked', count)
  let audio = parcel.getFeatureById('treasure_error_audio') 
  if(count>=5){ 
    audio = parcel.getFeatureById('treasure_success_audio')
    parcel.getFeatureById('treasure_gift').position.y = 2 
    e.player.emote(emojis[42])  
  }    
  else{
    e.player.emote(emojis[40])  
  }
  audio.play() 
})  