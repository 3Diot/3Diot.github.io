let startPosition = {x: 1, y: 1, z: 1, }
let coinsCollected = 0

parcel.on('playerenter', e => {
  e.player.on('move', m => {
    parcel.features.map( feature => {
      let difference = ( Math.abs( feature.position ) - Math.abs( m.player.position ) )
      if( feature.id.contains('coin') ){ 
        if ( difference < .5 ) {
          coinsCollected += 1
          feature.position.y = -100
          let audio = feature.getElementById('coinSound')
          audio.set( {position: m.player.position})
          audio.play()
        }
      }
      if( feature.id.contains('monster') ){ 
        if ( difference < .5 ) {
          m.player.set({position: startPosition})
          let audio = feature.getElementById('killedSound')
          audio.play()
        }
      }
    })
  }
})