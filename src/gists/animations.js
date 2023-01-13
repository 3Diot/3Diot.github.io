// Spaces Example
// https://www.voxels.com/spaces/522bce55-d255-44ca-86c2-918eeab63e6d/play

animationUrls = [

  'https://wiki.cryptovoxels.com/cat.vox',
  
'https://wiki.cryptovoxels.com/cat_on_pillow.vox'

]

pos = 0;

setInterval(function(){ 

  pos ++

  feature.set({'url': animationUrls[pos%animationUrls.length]})

}, 1000);