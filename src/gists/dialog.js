//
// Place on your NPC
// Create a 'sign' feature and give it the id 'digletTextbox'
// Add and modify the text to be shown in the box by changing the 'text' strings below
// Animate your character at by swapping out the vox model/ size or rotation at certain positions 'pos' of the dialog
//


let textSign = parcel.getFeatureById('digletTextbox')

var pos = 0;

let text = [ 
  'Welcome to the neighborhood!',
  'Be careful of the sand worms!',
  'My family have been digging round these parts since forever!'
]

feature.on('click',e=>{
    textSign.set( { text:text[pos] } )
    if( pos == 0){ 
	    feature.set( { 'url': "https://charleskarpati.com/cv/vox/scarcity/mega_diglet_1.vox", rotation:[0,1.57,0], scale:[1,1,1]  } )
	}
    else if( pos == 2){ 
	  pos = -1; 
	  feature.set( { 'url': "https://charleskarpati.com/cv/vox/scarcity/mega_diglet_2.vox", rotation:[0,-1.57,0], scale:[1.2,1.2,1.2]  } )
    }
    pos = pos + 1   
} )