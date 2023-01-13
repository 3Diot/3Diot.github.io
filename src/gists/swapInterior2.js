async function fetchParcelJSON(url) {
  const response = await fetch(url);
  const json = await response.json(); 
  return json.parcel.features; 
}

feature.on('click', async e => {   
  await swap_interior(e.player)
});


const swap_interior = async (player) => { 
  let hasAccess = await getHasAccess(player) 
  if (hasAccess) { 
    
        // Get your NFTS     
        let portraits = []  
    	player.teleportTo("N@1024E,190S,13.5F")      
        const myParcel = parcel.features  
        myParcel.forEach(function(obj, i) {
           // console.log(obj)       
           if( obj.type == 'nft-image'){ portraits.push(obj.uuid) }
           else if( obj.type == 'button'){ }
           else{ parcel.removeFeature( obj ) }
        } )   
        console.log( {portraits } ) 

        // Get Their NFTS            
        let remotePortraits = []    
        const features = await fetchParcelJSON('https://www.cryptovoxels.com/grid/parcels/5633')
        features.forEach(function(obj, i) { 
            console.log(obj)        
            if( obj.type == 'nft-image'){ remotePortraits.push(obj.url) }    
	    // let newVox = parcel.createFeature('vox-model');    
     	    // newVox.set({'url':"https://wiki.cryptovoxels.com/cakee.vox"})    
     	    // newVox.set({position:[0,16,0]})
     	    // newVox.set({scale:[1,1,1]})
        } ) 
        console.log( {remotePortraits} )     
        
        // Show their NFTS     
        portraits.forEach( function(portrait , i) {
            let url =  remotePortraits[ 0 ]    
            console.log(portrait, url )     
            const nft = parcel.getFeatureByUuid(portrait )    
            nft.set = { "url" : url  }
        } )
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