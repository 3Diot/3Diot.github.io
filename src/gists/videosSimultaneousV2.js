//
// Using Video Elements

let urls = [
 "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/174final.mp4", 
  "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/285final.mp4", 
  "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/396final.mp4", 
  "https://www.youtube.com/watch?v=TEXZSzPpZqo",
 "https://www.youtube.com/watch?v=P5p85xl3_KM", 
  "https://www.youtube.com/watch?v=WOxE7IRizjI", 
  "https://www.youtube.com/watch?v=Oextk-If8HQ", 
  "https://www.youtube.com/watch?v=b8-tXG8KrWs"
]

// FOR EACH URL IN THE LIST ABOVE
urls.forEach((videoId, i)=>{
  // GRAB A BUTTON STARTING FROM THE LEFT
  btn = parcel.getFeatureById("btn"+(i+1))
  // WHEN THAT BUTTON IS  CLICKED 
  btn.on('click', e => {  
    // CHANGE EACH OF THE FOUR VIDEOS URL
    parcel.getFeatureById("vid1").set({ url: videoId})   
    parcel.getFeatureById("vid1").play()
    parcel.getFeatureById("vid2").set({ url: videoId})    
    parcel.getFeatureById("vid2").play() 
    parcel.getFeatureById("vid3").set({ url: videoId})
    parcel.getFeatureById("vid3").play()
    parcel.getFeatureById("vid4").set({ url: videoId})
    parcel.getFeatureById("vid4").play()    
  }) 
})