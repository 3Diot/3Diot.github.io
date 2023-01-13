hours = new Date().getHours() 
vr = hours - 12
vr= Math.sign(vr)? vr : Math.abs(vr)
normalized = (vr-0)/(12-0)
normalized = normalized //.toString().substring(0, 4);
console.log('normalized ', normalized )  

f = parcel.getFeatures().filter( (feat) => {
  if( feat.type!='image' ){ return false}
  else if( typeof(feat.id) == 'undefined'){return false}
  else if( ! feat.id.includes('opacity') ){ return false} 
  else{
    console.log('daytime', hours )
    console.log('feat', feat.type, feat.id) 
    feat.set({opacity:0.2 })
    console.log(feat) 
  }
}) 