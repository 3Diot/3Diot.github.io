upto = 1

count = 0;
trigger =  parcel.getFeatureById('bump_trigger')

trigger.set({'proximityToTrigger': 1.2})

trigger.on('trigger', e => { 
  console.log('BumpTriggerStarting')
  count += 1
  console.log('count: ', count, ', upto: ', upto)
  
  box =  parcel.getFeatureById('Mystery')
  let r0 = box.createAnimation('position')
  r0.setKeys( [ 
    { frame: 0, value: box.position.add( new Vector3(0,0,0)  ) },
    { frame: 10, value: box.position.add( new Vector3(0,1,0) ) },
    { frame: 40, value: box.position.add( new Vector3(0,0,0) ) }
  ] )
  
  box.startAnimations( [r0] )
  
  audio =  parcel.getFeatureById('bump_audio')
  audio.play()
  // msg()
  if( count == upto){ 
    fn();
  }
} )  

let msg = (()=>{
    let instructions = parcel.getFeatureById('instructions')
    let txt = ''
    if( count == 0 ){ txt = '# Bump the box from underneath!' }
    else if( count < upto ){ txt = '# Keep bumping!' } 
    else{ txt = '# Congrats! Click the coin to redeem your prize!' } 
    instructions.set({text:txt})
} )

let fn = (()=>{ 
  let coin= parcel.getFeatureById('bump_coin') 
  
  let r1 = coin.createAnimation('rotation')
  r1.setKeys([{ frame: 0, value: coin.rotation.add(new Vector3(0, 0, 0) ) }, { frame: 45, value: coin.rotation.add(new Vector3(0, 2*Math.PI, 0) ) }])
  
  let r2 = coin.createAnimation('position')
  r2.setKeys( [ 
    { frame: 0, value: coin.position.add( new Vector3(0,0,0)  ) },
    { frame: 200, value: coin.position.add( new Vector3(0,-7.5,0) ) }
  ] )
  coin.startAnimations( [r2] )
  
  let question = parcel.getFeatureById('bump_question') 
  parcel.removeFeature(question)
  
  setInterval(function(){   
    coin.startAnimations( [r1] ) 
  }, 1500);
  
  
  
})