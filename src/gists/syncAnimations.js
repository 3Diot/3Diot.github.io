// spaces example:
// https://www.voxels.com/spaces/6101a261-3986-4897-9823-3bf65ba2a5df/play

// These two cats have been given the id 'pocket' and 'rocket'. Place this code in one of the cat's script slot to have the move in sync

setTimeout(function(){

  
let rocket = parcel.getFeatureById('rocket')

let r1 = rocket.createAnimation('position')

r1.setKeys([{
  frame: 30,
  value: rocket.position.add( new Vector3(0,10,0) )
},{
  frame: 60,
  value: rocket.position.add( new Vector3(0,0,0) )
}])

rocket.startAnimations( [r1] ) //Starts the animation



let pocket= parcel.getFeatureById('pocket')

let r2 = pocket.createAnimation('position')

r2.setKeys([{
  frame: 30,
  value: pocket.position.add( new Vector3(0,10,0) )
},{
  frame: 60,
  value: pocket.position.add( new Vector3(0,0,0) )
}])

pocket.startAnimations( [r2] ) //Starts the animation
  
  
  }, 4000);//wait 4 seconds