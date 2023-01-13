// Spaces Example:
// https://www.voxels.com/spaces/540303a1-c4d4-49dd-bd43-393172c2f8e1

// Place this script in the box and it will be deleted after 6 seconds

parcel.on('playerenter', (e)=> {
  
  setTimeout(function(){
 	parcel.removeFeature( feature )
  }, 6000)
  
})


// Note* The "&gt;" is actually a less 'less than' sign