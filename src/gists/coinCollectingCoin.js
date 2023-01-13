// 
// https://www.voxels.com/spaces/6cdcd1e5-de6b-4118-8167-43c801129973/play
//
// Place on: Each coin
// Behavior: Gift Pops out
// Requires having a audio feature with an id of 'coin_collected_audio' to play when coin is collected.
// Settings:  
// 

// 
// coin: https://media-crvox.sfo2.digitaloceanspaces.com/0x7b19b42564ad1c03625e8306cf20deea2f923a67/1643052069078-6726a584-6a05-4ed6-b41f-96ec8d7fd8a2.vox
// coin_collected_audio: https://www.fesliyanstudios.com/play-mp3/6262
//

count = 0;

feature.set({'proximityToTrigger': 1})

feature.on('trigger', e => {  
  count += 1
  console.log('triggered', count)
  parcel.removeFeature(feature)
  e.player.emote(emojis[25])
  
  let audio = parcel.getFeatureById('coin_collected_audio')
  audio.play()
  
} )