function random(x){ return ( (Math.random() * x/2 ) * (Math.random() < 0.5 ? -1 : 1) ) }
function random2(x){ return ( (Math.random() * x/2 ) ) }

( async () => {
        
	let url = "https://www.cryptovoxels.com/p/"+parcel.id
	let globalStates = await fetch( url ) 
	props = await globalStates.json()    
    	let d = props.attributes.depth
	let w = props.attributes.width   
      	let allVoxModels = parcel.getFeaturesByType('vox-model')
	allVoxModels.map( vox => {  
	  if( [
	      'https://charleskarpati.com/cv/vox/solstice/snowflake_star_ornamented.vox', 
	      'https://charleskarpati.com/cv/vox/solstice/snowflake.vox'
	    ].includes(vox.url)  
	  ){
	    vox.set( { position: [ random(w), 20, random( d ) ], scale:[1,1,1] } )  
            myMethod(vox, w, d, Math.floor(Math.random()*(600-200+1)+200))        
	  }
	})
} )()

function myMethod( f, w, d, t ){  
	let rocket = f
	let r1 = rocket.createAnimation('position')
	let arr1 = [ ]
	for (let i = 1; i < 100; i++) {
	  arr1.push([
	    { frame: t*i, value: rocket.position.add( new Vector3(random(w),-20,random( d )) ) }, 
	    { frame: t*i, value: rocket.position.add( new Vector3(random(w),0,  random( d )) ) }
	  ])
	} 
	arr1 = arr1.flat() 
	r1.setKeys( arr1 )
	let r2 = rocket.createAnimation('rotation')
	let arr2 = [ ]
	for (let i = 1; i < 100; i++) {
	  arr2.push([ {
		frame: t * i,
		value: rocket.rotation.add(new Vector3(rocket.rotation.x + Math.PI / 2 * random2(50), rocket.rotation.y + Math.PI / 2 * random2(50), rocket.rotation.z + Math.PI / 2 * random2(50)) )
	  } ])
	} 
	r2.setKeys( arr2.flat() )
	rocket.startAnimations( [r1, r2] )
} 