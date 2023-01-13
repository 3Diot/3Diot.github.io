feature.on('click', e => {   
  swap_interior(e.player)
});


const swap_interior = async (player) => { 
  let hasAccess = await getHasAccess(player) 
  if (hasAccess) { 
	player.teleportTo("N@1024E,190S,13.5F")     
	// let f = parcel.getFeatureById('input')   
	// parcel.removeFeature( f )
	let newVox = parcel.createFeature('vox-model');
	// Returns a vox-model feature
	newVox.set({'url':"https://wiki.cryptovoxels.com/cakee.vox"})    
	newVox.set({position:[0,16,0]})
	newVox.set({scale:[1,1,1]})                 
  }        
}

const getHasAccess = async (player) => { 
  let hasWearable = await getHasWearable(player, 20); 
  hasWearable = hasWearable ? hasWearable : await getHasWearable(player, 294); 
  hasWearable = hasWearable ? hasWearable : await getHasWearable(player, 154); 
  hasWearable = hasWearable ? hasWearable : await getHasWearable(player, 149); 
  hasWearable = hasWearable ? hasWearable : await getHasWearable(player, 193); // 50
  return hasWearable
}

const getHasWearable = async (player, collection_id) => { 
  var url = "https://www.cryptovoxels.com/api/avatars/" + player.wallet + ".json?nonce=" + new Date().getTime()
  return fetch(url).then(r => r.json()).then((data) => {
    try {
      return !!data.avatar.costume.attachments.find(a => a.collection_id == collection_id)
    } catch (e) {
      return false
    }
  }).catch(e => false)
  return false
}