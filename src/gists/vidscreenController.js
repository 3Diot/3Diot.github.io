// Spaces Example:
// https://www.voxels.com/spaces/06365cc4-d152-4958-bd5e-cc594193e07b/play

feature.on('keys', e => {  
  k = e.keys
  player = parcel.players[0]
  boat = parcel.getFeatureById('boat') 
  x = boat.position.x
  y = boat.position.y
  z = boat.position.z 
  player.position.x = player.position.x + 1 
  if(k.a){ y = y + 1 }
  else if(k.b){ y = y - 1 }
  if(k.right){ x = x + 1 }
  else if(k.left){ x = x - 1 }
  else if(k.up){ z = z + 1 }
  else if(k.down){ z = z - 1 }
  boat.set({'position': [x, y, z] }) 
} )