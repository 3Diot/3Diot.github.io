let r1 = feature.createAnimation('position')
let r2 = feature.createAnimation('position')

r1.setKeys([{
  frame: 30, // standard is 30 fps (means it take 1 second)
  value: feature.position.add( new Vector3(0,-2,0) )
}])

r2.setKeys([{
  frame: 0, // standard is 30 fps (means it take 1 second)
  value: feature.position.add( new Vector3(0,-2,0) )
},{
  frame: 30, // standard is 30 fps (means it take 1 second)
  value: feature.position.add( new Vector3(0,0,0) )
}])

parcel.on('playerenter', (e)=> {
	setTimeout(function( ){
        feature.startAnimations( [r1] ) 
	},2000);
} )
	
parcel.on('playerleave', (e)=> {
  feature.startAnimations( [r2] ) 
} )