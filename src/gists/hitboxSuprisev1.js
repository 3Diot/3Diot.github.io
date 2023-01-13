// Spaces Example:
// https://www.voxels.com/spaces/5ee1fe3d-3ca3-42e2-a244-29c3086b5ecd/play

upto = Math.floor(Math.random() * 4) +1

count = 0;

feature.set({'proximityToTrigger': 1})

feature.on('trigger', e => {
  console.log('running')
  count += 1
  console.log(count, upto)
  
  let r0 = feature.createAnimation('position')
  r0.setKeys( [ 
    { frame: 0, value: feature.position.add( new Vector3(0,0,0)  ) },
    { frame: 10, value: feature.position.add( new Vector3(0,.2,0) ) },
    { frame: 20, value: feature.position.add( new Vector3(0,0,0) ) }
  ] )
  feature.startAnimations( [r0] )
  
  audio =  parcel.getFeatureById('audio')
  audio.play()
  msg()
  if( count == upto){ 
    fn();
  }
} )  

let msg = (()=>{
    let instructions = parcel.getFeatureById('instructions')
    let txt = ''
    if( count == 0 ){ txt = 'Bump the box!' }
    else if( count < upto ){ txt = 'Keep bumping!' } 
    else{ txt = 'Click the coin to claim your prize!' } 
    instructions.set({text:txt})
} )

let fn = (()=>{
  console.log('success!')
  let coin= parcel.getFeatureById('coin') 
  
  let r1 = coin.createAnimation('rotation')
  r1.setKeys([{ frame: 0, value: coin.rotation.add(new Vector3(0, 0, 0) ) }, { frame: 45, value: coin.rotation.add(new Vector3(0, 2*Math.PI, 0) ) }])
  
  let r2 = coin.createAnimation('position')
  r2.setKeys( [ 
    { frame: 0, value: coin.position.add( new Vector3(0,0,0)  ) },
    { frame: 200, value: coin.position.add( new Vector3(0,4,0) ) }
  ] )
  coin.startAnimations( [r2] )
  
  setInterval(function(){   
    coin.startAnimations( [r1] ) 
  }, 1500);
  
})