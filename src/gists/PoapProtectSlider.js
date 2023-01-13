// Spaces Example:
// https://www.voxels.com/spaces/540303a1-c4d4-49dd-bd43-393172c2f8e1

// This will remove the blue box if the slider value is == 90

feature.on('changed',e=>{ 

  val = Math.round(e.value)

  if(val >= 90){
      parcel.removeFeature(parcel.getFeatureById('sliderBlueBox'))

  }
})


// Note* The "&gt;" is actually a less 'less than' sign