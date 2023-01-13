statusTheater1 = false
statusTheater2 = false
statusTheater3 = false

let apikey = "05ZoXLQc1G5Coxs0STakzx9CGrwRn9cUbPKVgMElQ9IM0f9NZuJsmEea8kd9GKva"

let currentPlaying = 'none'

// Specified in UTC
let theater1Start = "2022-04-15 21:00:00".split(/[ :-]+/)
let theater2Start = "2022-04-15 22:00:00".split(/[ :-]+/)
let theater3Start = "2022-04-15 23:00:00".split(/[ :-]+/)

let theater1Replay = 10800000 // Replay Film every X milliseconds
let theater2Replay = 10800000
let theater3Replay = 10800000

let theater1Length = 8197 // Film length in Seconds
let theater2Length = 8197
let theater3Length = 8197

// Stop showing the film => UTC
let theater1End = "2022-04-18 23:59:00".split(/[ :-]+/)
let theater2End = "2022-04-18 23:59:00".split(/[ :-]+/)
let theater3End = "2022-04-18 23:59:00".split(/[ :-]+/)

let theater1vid = 'https://www.dropbox.com/s/sko2rc4vwh58to2/final.mp4?dl=0'
let theater2vid = 'https://www.dropbox.com/s/sko2rc4vwh58to2/final.mp4?dl=0'
let theater3vid = 'https://www.dropbox.com/s/sko2rc4vwh58to2/final.mp4?dl=0'

let theater1Tickets = [ [] ]
/*
  [ {"chain":"poap", "tokens": ['genisis-film-festival-juror-2022' ]} ],
  [ {"chain":"poap", "tokens": ['genesis-film-festival-crew-2022' ]} ], 
  [ {"chain":"poap", "tokens": ['official-genesis-film-festival-submission-2022' ]} ],
  [ {"chain":"poap", "tokens": ['genesis-film-festival-official-selection-2022' ]} ],
	[ {"chain":"polygon", "contract": "0x479C5B6CF9C6105bbc8f683d0175F8Db7cC999D5", "tokens": [1] }] 
] 
*/
let theater2Tickets = [ [ ]  ] 
let theater3Tickets = [ []  ]

async function checkStatus(e, requiredTokensSets, theaterNumber){
  console.log('start')
  let status = false
  for (let requiredTokens of requiredTokensSets){
    if (status){ break }
    let cont = true
	  for (let o of requiredTokens){ 
			if (!cont){ break }
			if(o['chain']=='poap'){
			  let url = `https://frontend.poap.tech/actions/scan/${e.player.wallet}`
				let resp = await fetch(url, { headers: { Accept: "application/json"} })
				let response = await resp.json(); 
				let heldTokenIds = response.map((a)=>{return a.event['fancy_id']});
				var required = o["tokens"]  
				if( required != '*' ){ cont = required.every(id => heldTokenIds.includes(id)) }
				else{ cont = heldTokenIds.length == 0 ? false : true }  
			}
			else{
				let url = `https://deep-index.moralis.io/api/v2/${e.player.wallet}/nft/${o['contract']}?chain=${o['chain']}&format=decimal`
				let resp = await fetch(url, { headers: { Accept: "application/json", "X-Api-Key": apikey } })
				let response = await resp.json(); 
				var heldTokenIds = await response.result 
				heldTokenIds = heldTokenIds.map((a)=>{return parseInt(a['token_id']);});
				var required = o["tokens"]  
				if( required != '*' ){ cont = required.every(id => heldTokenIds.includes(id)) }
				else{ cont = heldTokenIds.length == 0 ? false : true }  
	    }
		}
	  status = cont;
	  // console.log({status, requiredTokens})
  }
  status = status || !requiredTokensSets.length
  if( theaterNumber == 1 && status ){ statusTheater1 = true }
  if( theaterNumber == 2 && status ){ statusTheater2 = true }
  if( theaterNumber == 3 && status ){ statusTheater3 = true } 
  console.log(theaterNumber, status)
}




// if screen.type = 'video'{ ...
// Check how long since start
// Start a timer to restart after 3 hours past start time
// Every three hours afterwords re-hit the play button

function getAppropriateVidFeature(url, filmId, streamId, defaultPos){ 
 let film = parcel.getFeatureById( filmId )
 let stream = parcel.getFeatureById( streamId ) 
 if (/m3u8|mp4|mp3/.test(url)){ stream.position.y = -20; film.position.y = defaultPos; return film }
 else{ film.position.y = -20; stream.position.y = defaultPos; return stream } 
}

function getTimeDif(t){
  if (t=='false'){return -1}
  var now = new Date().toISOString()
	n = now.substring(0, now.length - 5).split(/[ :\-T]+/)
	now = Date.UTC(n[0], n[1]-1, n[2], n[3], n[4], n[5])
	return ( now - new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5])) )
}



function startVideo(screen, dif, vid, vidLength){
	let play = Math.abs(dif)/1000 < vidLength
	console.log('startVideo', {screen, startAt:Math.abs(dif)/1000, vidLength, play})
	if(play){
  	screen.set({'url': vid})
	  screen.play()
		screen.set({'startAt': Math.abs(dif)/1000, play, vidLength })
	}
	else{
	  screen.pause()
	}
}

function replayInterval(screen, start, period, end, vid, vidLength){
  console.log('INTERVAL RUNNING');
	let timeFromStart = getTimeDif(start) 
	console.log({timeFromStart});
  if(getTimeDif(end)<0){ 
		let howFarIn = timeFromStart%period
		startVideo(screen, howFarIn, vid, vidLength )
		let nextShowingIn = period - howFarIn
		console.log({howFarIn: howFarIn/1000, nextShowingIn: nextShowingIn/1000, vidLength})
  }
}
function startInterval(screen, start, period, end, vid){
  console.log('startingInterval', {screen, start, period, end});
	replayInterval(screen, start, period, end, vid) // Run it once to begin 
	myInterval = setInterval(replayInterval, period, screen, start, period, end, vid) // Then set it on interval
}

let myInterval = ''
let myTimeout = ''

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
  // console.log(loc, e.position)
  theater1 = getAppropriateVidFeature(theater1vid, 'theater1film', 'theater1stream', 5); 
  theater2 = getAppropriateVidFeature(theater2vid, 'theater2film', 'theater2stream', 10.15); 
  theater3 = getAppropriateVidFeature(theater3vid, 'theater3film', 'theater3stream', 15.45);
  let roofTopTwitch  = parcel.getFeatureById( 'roofTopTwitch' ) 	
  if(loc == 'rooftop' || loc == 'outside' || loc == 'lobby'){
	  if (myInterval != ''){ clearInterval(myInterval); myInterval = '' }
		if (myTimeout != ''){ clearTimeout(myTimeout); myTimeout = '' }
	  currentPlaying = 'none'
    theater1.pause()  
    theater2.pause()  
    theater3.pause()  
		if(loc == 'rooftop'){ roofTopTwitch.play() }
  } 
  if(loc == 'theater1'){
    if(statusTheater1){
		  roofTopTwitch.pause()  
		  theater2.pause()  
		  theater3.pause()  
		  let timeFromStart = getTimeDif(theater1Start) 
			// This is a film.
			if (timeFromStart != -1 && currentPlaying!=1){
  			currentPlaying = 1
			  // check theater1End 
				if(timeFromStart>0 && getTimeDif(theater1End)<0){ 
				  replayInterval(theater1, theater1Start, theater1Replay, theater1End, theater1vid, theater1Length)
					let nextShowingIn = theater1Replay - (timeFromStart%theater1Replay)
				  myTimeout = setTimeout(startInterval, nextShowingIn, theater1, theater1Start, theater1Replay, theater1End, theater1vid, theater1Length ) 
					  
				} 
				else{ 
					console.log('NOT YET SHOWING. START A TIMER', {timeFromStart: timeFromStart/1000});
					myTimeout = setTimeout(startInterval, Math.abs(timeFromStart), theater1, theater1Start, theater1Replay, theater1End, theater1vid, theater1Length ) 
				}
			}
			else{
			  theater1.play()
			}
	  }
	  else{ loc = 'boot' }   
  }
  if(loc == 'theater2'){
    if(statusTheater2){
			roofTopTwitch.pause()  
		  theater1.pause()  
		  theater3.pause()  
		  let timeFromStart = getTimeDif(theater2Start) 
			// This is a film.
			if (timeFromStart != -1 && currentPlaying!=2){
  			currentPlaying = 2
			  // check theater1End 
				if(timeFromStart>0 && getTimeDif(theater2End)<0){ 
				  replayInterval(theater2, theater2Start, theater2Replay, theater2End, theater2vid, theater2Length)
					let nextShowingIn = theater2Replay - (timeFromStart%theater2Replay)
				  myTimeout = setTimeout(startInterval, nextShowingIn, theater2, theater2Start, theater2Replay, theater2End, theater2vid, theater2Length ) 
					  
				} 
				else{ 
					console.log('NOT YET SHOWING. START A TIMER', {timeFromStart: timeFromStart/1000});
					myTimeout = setTimeout(startInterval, Math.abs(timeFromStart), theater2, theater2Start, theater2Replay, theater2End, theater2vid, theater2Length ) 
				}
			}
			else{
			  theater2.play()
			} 
		}
	  else{ loc = 'boot' }     
  }
  if(loc == 'theater3'){
    if(statusTheater3){ 
			roofTopTwitch.pause()  
		  theater2.pause()  
		  theater1.pause()  
		  let timeFromStart = getTimeDif(theater3Start) 
			// This is a film.
			if (timeFromStart != -1 && currentPlaying!=3){
  			currentPlaying = 3
			  // check theater1End 
				if(timeFromStart>0 && getTimeDif(theater3End)<0){ 
				  replayInterval(theater3, theater3Start, theater3Replay, theater3End, theater3vid, theater3Length)
					let nextShowingIn = theater3Replay - (timeFromStart%theater3Replay)
				  myTimeout = setTimeout(startInterval, nextShowingIn, theater3, theater3Start, theater3Replay, theater3End, theater3vid, theater3Length ) 
					  
				} 
				else{ 
					console.log('NOT YET SHOWING. START A TIMER', {timeFromStart: timeFromStart/1000});
					myTimeout = setTimeout(startInterval, Math.abs(timeFromStart), theater3, theater3Start, theater3Replay, theater3End, theater3vid, theater3Length ) 
				}
			}
			else{
			  theater3.play()
			}
    }			
	  else{ loc = 'boot' }      
  }
  if( loc == 'boot' ){
	  currentPlaying = 'none'
    player.teleportTo('S@1030E,178S')
  }
  // console.log(statusTheater1, statusTheater2, statusTheater3)
} 

function calc(ypos, m, x, b){ return (ypos - (m*x+b) ) }
player = ''
parcel.on('playerenter', (e)=> { 
	player = e.player
	checkStatus(e, theater1Tickets, 1)
	checkStatus(e, theater2Tickets, 2) 
	checkStatus(e, theater3Tickets, 3)  
    e.player.on('move', (e)=> { playerMoved(e) }) 
})

parcel.getFeatureById('theaterDoor1').on('click', async (e) => {   
  await checkStatus(e, theater1Tickets, 1) 
  if(statusTheater1){ player.teleportTo('NE@1019E,190S') }
} )

parcel.getFeatureById('theaterDoor2').on('click', async (e) => {   
  await checkStatus(e, theater2Tickets, 2) 
  if(statusTheater2){ player.teleportTo('NW@1030E,190S,5U') }
} ) 

parcel.getFeatureById('theaterDoor3').on('click', async (e) => {  
  await checkStatus(e, theater3Tickets, 3)  
  console.log('statusTheater3', statusTheater3)
  if(statusTheater3){ player.teleportTo('N@1018E,189S,10U') }
} )