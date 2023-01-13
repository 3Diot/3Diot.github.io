//
// Trig player postion for Granting Wishes Cinema

function playerMoved(e){ 
  loc = 'lobby'
  ypos = e.position[1]
  x = e.position[0]
  r1 = calc( ypos, (3.1/6.6), x, 4.5)
  r2 = calc( ypos, -(3.1/6.6), x, 9)
  r3 = calc( ypos, (3.1/6.6), x, 14.55)
  r4 = calc( ypos, -(3.1/6.6), x, 18.25)
  if( r1 > 0 ){ loc = 'theater1'  
    if( r2 > 0 ){ loc = 'theater2'  
      if( r3 > 0 ){ loc = 'theater3'  
        if( r4 > 0 ){ loc = 'rooftop' }   
      }   
    }          
  } 
  if(loc=='theater2' && ypos > 9.45 && r3 > -2.45){ loc = 'rooftop' }
  if(loc=='lobby' && ypos > 7){ loc = 'theater2' }
  if(x > 7.2 || e.position[2] > 8 || e.position[2] < -6.6 ){ loc = 'outside' }
  // console.log(loc, r1.toFixed(2), r2.toFixed(2), r3.toFixed(2), r4.toFixed(2) ) 
  console.log(loc, e.position)
} 

function calc(ypos, m, x, b){ return (ypos - (m*x+b) ) }
parcel.on('playerenter', (e)=> { e.player.on('move', (e)=> { playerMoved(e) }) })