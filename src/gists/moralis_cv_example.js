//
// No longer being used as an exmaple.

// Remove Images
feature.on('click', e => { 
  let imageslist = parcel.getFeaturesByType('image'); 
  for (let j = 0; j < imageslist.length; j++) { imageslist[j].remove(); }
})
  
feature.on('click', e => {
  console.log("Clicked");
  const options = { method: 'GET' };
  console.log("Moralis API")
  let result;
  let noofvalidurl = 0;
  let url = "https://deep-index.moralis.io/api/v2/0x65334efb0c2e228bdc21243b6d6598b8dcb3f410/nft?chain=eth&format=decimal"
  fetch(url, { headers: { Accept: "application/json", "X-Api-Key": "YOURAPIKEYHERE" } })
  .then(response => response.json()).then(response => {
	console.log(response.result)
	let resultmm = response.result
	let nftdata = resultmm.map(o => ({ token: o.token_id , image: JSON.parse(o.metadata) , tokenadd: o.token_address } ))
	console.log("mapped data (Id and image Metadata") );
	console.log(nftdata)
	let imgurl = [];
	for (let i = 0; i < nftdata.length; i++) {
	  imgurl[i] = nftdata[i].image;
	  //let formatcheck = imgurl[i].image;
	  if (imgurl[i] === null) { continue; };
	  if (imgurl[i].image === undefined) { console.log("Token Id no." + i + " is undefinded"); } 
	  else {
		noofvalidurl = noofvalidurl + 1;   
		let imgFrame = parcel.createFeature('image'); 
		imgFrame.set({ 'id': 'image' + i.toString(), 'url': imgurl[i].image , scale: [2, 2, 2], position: [2.5 * (i % 5) - 5, 2.5 * (Math.floor(i / 5)) + 2.5, 1.5] })
	  } 
	}
  } )
} )