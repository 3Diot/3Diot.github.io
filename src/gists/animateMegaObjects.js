// Spaces Example
// https://www.voxels.com/spaces/8efda697-03be-4c7d-81a9-5a36777aeb7a/play

feature.on('trigger', e => { 
        console.log('start')

	let animation1 = feature.createAnimation('position')

	animation1.setKeys([{ 
	  frame: 30, // standard is 30 fps (means it take 1 second)
	  value: feature.position.add( new Vector3(0,10,0) )
	}])
	 


	let animation2 = feature.createAnimation('rotation')

	animation2.setKeys([{
	  frame: 30, // standard is 30 fps (means it take 1 second)
	  value: feature.position.add( new Vector3(0, (2 * Math.PI), 0) )
	}])

	feature.startAnimations([animation1, animation2])
  
})