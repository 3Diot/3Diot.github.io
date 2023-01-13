// '"general", "bugs", "economics", "scripts", "andromeda", "origin", "scarcity", "ceres", "proxima", "trinity", "bronx", "neutron", "proton", "tokyo", "euro", "berlin", "helios", "milan", "poneke", "san-francisco", "far-far-away", "vibes", "satoshi", "miami", "shinjuku", "munchen", "seoul", "pluto", "igloo", "pilikai", "honolulu", "flora", "kauai", "fauna", "venice", "pastel", "architect", "chronos", "obscurity"'
// 
// To change the channel, change richtext, button and user input to have an id where 'general' is replaced with one of the above channels.
// Then also find in this code where it says let channel = general and replcae the word general there too,


let style = "\r\n{:style='color:white; font-size:45px; margin:0px'}\n\n"

let header = " \r\n{:style='color:red;font-size:90px; margin:0px'}\n\n"

parcel.on('playerenter', async e => {
  let channel = 'general'

  load_messages(channel )
  let message = ''
  parcel.getFeatureById('discord_message_'+channel).on('changed',e=>{   
    message = encodeURIComponent(e.text)
  })
  
  
  parcel.getFeatureById('discord_submit_'+channel).on('click', async e=>{         
    if ( message) {
      author = e.player.name || e.player.wallet
      if( author == 'anonymous' ){ return }
      url = `https://charleskarpati.com/api/discord?params=channel=${channel}%26message=${message}%26author=${author}%26parcel=${parcel.id}` 
  
      console.log('SUBMIT', author, message, url) 
      let txt = ( await ( await fetch( url ) ).json() ) 
      console.log({txt})
      load_messages( channel )
    } 
  })
  
})   



let load_messages = async ( channel ) => {    
  url = `https://charleskarpati.com/api/discord?params=channel=${channel}` 
  let txt = ( await ( await fetch( url ) ).json() ).message
  
  let blahblahblah = txt.slice(0, 10).map( (row,i)=>{ 
    let content = row['content'].replace(/(\r\n|\n|\r)/gm, "")
    let ismine  = ( row['author']['username'] == 'cvminigames' && row['content'].slice(-6) == "/visit") 
    if (ismine) return  `- ${i} - ${content.split("\"").slice(0, -1).join("\"")}"` 
    return `- ${i} - ${row['author']['username']} - "${content}"` 
  })
  console.log('Discord General Chat: ', url, {txt})
  blahblahblah.unshift("- Newest comments on top")
  txt = `# ${channel.toUpperCase()} Chat ${header}` + blahblahblah.join("\n") + style 
  parcel.getFeatureById('discord_text_'+channel).set({'text': txt }) 
}