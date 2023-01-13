//
// GW Studio
status = false
let apikey = "05ZoXLQc1G5Coxs0STakzx9CGrwRn9cUbPKVgMElQ9IM0f9NZuJsmEea8kd9GKva"
let requiredTokens = [ { "contract": "0xaab9da2cbab0036fa83ce797109009431d033d35", "tokens": [5, 3, 2, 1] } ]

async function checkStatus(e){
  let cont = true
  requiredTokens.map(async o => {
    if (!cont){ return false }
	let url = `https://deep-index.moralis.io/api/v2/${e.player.wallet}/nft/${o['contract']}?chain=polygon&format=decimal`
	let resp = await fetch(url, { headers: { Accept: "application/json", "X-Api-Key": apikey } })
    let response = await resp.json(); 
	var heldTokenIds = await response.result
	heldTokenIds = heldTokenIds.map((a)=>{return parseInt(a['token_id']);});
	var requiredTokens = o["tokens"]  
	cont = requiredTokens.every(id => heldTokenIds.includes(id)); 
	status = cont
  } ) 
}

/* On start */
player = ''
parcel.on('playerenter', async (e)=> { 
  player = e.player
  checkStatus(e) 
  e.player.on('move', (e)=> { playerMoved(e) }) 
})

async function playerMoved(e){  
  zpos = e.position[2] 
  ypos = e.position[1]
  /* Unauthorized access */
  if(ypos>12 && zpos < -2 && !status){ player.teleportTo('S@704E,627S,10U') } 
}

feature.on('click', async (e) => {    
  checkStatus(e) 
  if(status){ console.log(status); player.teleportTo('E@701E,640S,10U') }
} )