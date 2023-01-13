function random(x){ return ( (Math.random() * w/2 ) * (Math.random() < 0.5 ? -1 : 1) ) }

( async () => {
	console.log('~~~~~~~~~~~~~');
	let url = "https://www.cryptovoxels.com/p/"+parcel.id
	let globalStates = await fetch( url ) 
	props = await globalStates.json() 
	let d = props.attributes.depth
	let w = props.attributes.width
	console.log(props, d, w);
	
	let allVoxModels = parcel.getFeaturesByType('vox-model')
	allVoxModels.map( vox => { 
	  let a = allVoxModels[i] 
	  console.log(a);
	  if(a.url = 'https://charleskarpati.com/cv/vox/solstice/snowflake_star_ornamented.vox' ){
	    a.set( { position: [ random(w), w, random(d) ] } )
	  }
	})
} )()