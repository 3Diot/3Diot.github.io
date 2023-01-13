//
// Before the playerEnter Event, only parcel.players returns anything. On playerEnter event, then all do.
//

console.log( '~~~~~~~~~ Before ~~~~~~~~~~~~~~~~~~',
  { 
    getPlayers: parcel.getPlayers(),
    players: parcel.players,
    getPlayersWithinParcel: parcel.getPlayersWithinParcel(), 
  }
) 

parcel.on('playerenter', async (e)=> {
  
  e.player.on('move', (e) => {  });  
  
  console.log( '~~~~~~~~~ After ~~~~~~~~~~~~~~~~~~',
    { 
      getPlayers: parcel.getPlayers(),
      players: parcel.players,
      getPlayersWithinParcel: parcel.getPlayersWithinParcel(), 
    }
  ) 

}) 