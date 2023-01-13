setInterval(() => {
  let p = parcel.getPlayers()[0]
  if (!p) {return}
  
  let v1 = feature.position
  let v2 = p.position
  
  let dz = v2.z - v1.z
  let dx= v2.x - v1.x
  let adjacent = Math.sqrt( dx**2 +  dz**2 )
  let opposite =  v1.y - v2.y
  
  let rotateTo = new Vector3( ( ( opposite/ adjacent ) % 1.57), (- Math.atan2(dz, dx) + Math.PI / 2), 0 )
  
  let animation1 = feature.createAnimation('rotation')
  animation1.setKeys([{ frame: 30, value: rotateTo }])
  
  let speed = .2 
  let goto = feature.position.add( new Vector3(speed*dx, speed*( v2.y - v1.y), speed*dz) )
  
  let animation2 = feature.createAnimation('position')
  animation2.setKeys([{ frame: 30,  value: goto }])
  feature.startAnimations( [animation1, animation2] )
  feature.position = goto 
  feature.rotation = rotateTo
  
}, 1000)