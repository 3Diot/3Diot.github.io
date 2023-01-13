// Spaces Example:
// https://www.voxels.com/spaces/540303a1-c4d4-49dd-bd43-393172c2f8e1

// This will remove the blue box if the text input value is == '69'


feature.on('changed',e=>{ 

  val = e.text; 

  if(val == 'ABC123'){
      parcel.removeFeature(parcel.getFeatureById('textBlueBox'))
  
} })


// Note* The "&gt;" is actually a less 'less than' sign