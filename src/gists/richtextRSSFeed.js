//https://www.voxels.com/spaces/3fbaf653-071e-4758-80fe-2fe254a5576d/play

feed_richtext_header = 'NFTPlaza News'
feed_richtext_id = 'nftplaza'
feed_richtext_url = 'https://charleskarpati.com/api/feed?url=https://nftplazas.com/category/metaverse-news/voxels-blog/feed/'


let style = "\r\n{:style='color:white;font-size:30px; margin:0px'}\n\n"
let header = " \r\n{:style='color:red;font-size:60px; margin:0px'}\n\n"

let displayFeed = async () => { 
  
  let txt = ( await ( await fetch( feed_richtext_url ) ).text() )

  let fin = txt.match(/(?<=<title>\s*).*?(?=\s*<\/title>)/gs).map((r,i) => `- ${i} - ${r}` ).join(" \n") 

  fin = feed_richtext_header + header + fin + style
  parcel.getFeatureById( feed_richtext_id ).set({'text': fin}) 
}

parcel.on('playerenter', async () => { displayFeed() } )