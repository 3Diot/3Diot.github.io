//-----------Nothing to touch here-----------
i=0
setInterval(()=>{
  if(i!=url.length){
    feature.set({url:url[i]}); 
    i++
  }else{
    i=0
  }
},numSecs*1000)
var url =["https://cloudflare-ipfs.com/ipfs/QmeZpcraNTUYcV7m21a2qpWLTAqFQkeMKs4uFV6ZyNhR7a",
  "https://cloudflare-ipfs.com/ipfs/QmQH7KHRZvkBDqigmztYDe37RgUZASr6Nyu9iDxB3SMoYx",
  "https://cloudflare-ipfs.com/ipfs/QmanTS1fpQomYk2RABtgasDJMumNYJEUAj2oaHq8TeMJpv",
  "https://cloudflare-ipfs.com/ipfs/QmRaJrroa1ar9JT16yjkPK9aCG4VA65jZYJU5yDhCqUzfU",
  "https://cloudflare-ipfs.com/ipfs/Qme2CCeq6eMcRujCQ97Pb1nbiuoTzo1J2UrQwWooE2ykNf",
  "https://cloudflare-ipfs.com/ipfs/QmdHt4DZfVjWR5Gtrm48KGvpwA4tVNWa27iXKwCb7E9KLn",
  "https://cloudflare-ipfs.com/ipfs/QmRWuA337wPH8Y1njQbU5GXcbDWbvfqBndHk89TrixHqAR",
  "https://cloudflare-ipfs.com/ipfs/QmPhBYnyv7WrRTChtCZyuQw5AgEtsYEjfc6M2vtbo7odKs",
  "https://cloudflare-ipfs.com/ipfs/QmPr4tHsnXyHcCyoWE19utCb4wAKineDPoPPHd5TPGwnaW",
  "https://cloudflare-ipfs.com/ipfs/QmPpSSrLsfBqrdgwaJi14KgFxqcqgScLMRvqWjLxue1J8j",
  "https://cloudflare-ipfs.com/ipfs/QmVPU7ji7XLEk2i7HMncgX2apVTa7j6BbHRRixsmGZzobu"]