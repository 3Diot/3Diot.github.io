//
//  https://www.voxels.com/spaces/6cdcd1e5-de6b-4118-8167-43c801129973/play
//
// Place on duck
// Behavior: Duck will chase you. Sets count=0 if touching and will teleport both you and itself.
// Has a speed and distance setting, freeze-time and teleport locations you can change by finding them in the code (clearly marked out)
// 
//

count = 0
freeze= 0
feature.on('click', e => {

  // 
  // ------- START EDIT : FREEZE TIME : It will freeze for this many seconds when clicked. -------
  //
  freeze= 5
  //
  //  -------STOP EDITING: -----------------------------------------------------------------------
  // 
  e.player.emote(emojis[43])
})
setInterval(() => {  
  let p = parcel.getPlayers()[0]
  if (!p) {return}
  
  let v1 = feature.position
  let v2 = p.position
  
  if(freeze){
      freeze = freeze -1; 
      return 
  }
  
  let distance = this.Vector3.DistanceSquared(v1, v2)

  // 
  // ------- START EDIT : DISTANCE, TELEPORT PLAYER and FOLLOWER : When the follower gets within distance teleport -------
  //
  unitsFromUser = 0.2
  teleportUserTo = 'N@0W,0N,1U'
  teleportFollowerTo = [0,2,-15]
  //
  //  -------STOP EDITING: ------------------------------------------------------------------------------------------------
  // 
  if( distance <= unitsFromUser ) { 
    console.log('Follower Touching Player!'); 
    count = 0
    feature.position = new Vector3(...teleportFollowerTo)
    p.teleportTo(teleportUserTo)  
    p.emote(emojis[16])
    return
  }
  
  let dz = v2.z - v1.z
  let dx= v2.x - v1.x
  let adjacent = Math.sqrt( dx**2 +  dz**2 )
  let opposite =  v1.y - v2.y
  
  let rotateTo = new Vector3( ( ( opposite/ adjacent ) % 1.57), (- Math.atan2(dz, dx) + Math.PI / 2), 0 )
  
  let animation1 = feature.createAnimation('rotation')
  animation1.setKeys([{ frame: 30, value: rotateTo }])
  
  let speed = .3
  let goto = feature.position.add( new Vector3(speed*dx, speed*( v2.y - v1.y), speed*dz) )
  
  let animation2 = feature.createAnimation('position')
  animation2.setKeys([{ frame: 30,  value: goto }])
  feature.startAnimations( [animation1, animation2] )
  feature.position = goto 
  feature.rotation = rotateTo
  
}, 1000)