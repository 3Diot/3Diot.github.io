// LIST YOUR VIDEOS HERE. 
// THE CODE WILL MAP EACH BUTTON TO A SINGLE URL.
let urls = [
 "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/174final.mp4", 
  "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/285final.mp4", 
  "http://www.geminirisingmedia.com/wp-content/uploads/2021/12/396final.mp4", 
  "http://www.geminirisingmedia.com/wp-content/uploads/2022/01/417final.mp4",
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
    let v1 = parcel.getFeatureById("vid1")
    let v2 = parcel.getFeatureById("vid2")
    let v3 = parcel.getFeatureById("vid3")
    let v4 = parcel.getFeatureById("vid4")
    let v5 = parcel.getFeatureById("vid5")
    let v6 = parcel.getFeatureById("vid6")          
    if( v1.get('url') == videoId ){  
      // PAUSE THE VIDEOS  IF THE VIDEO IS ALREADY LOADED (PRESUMED PLAYING)
      v1.pause(); 
      v2.pause(); 
      v3.pause(); 
      v4.pause();
      v5.pause();
      v6.pause()         
    }
    else{  
      // CHANGE EACH OF THE FOUR VIDEOS URL AND PLAY IT OTHERWISE.
      v1.set({ url: videoId}); v1.play()
      v2.set({ url: videoId}); v2.play() 
      v3.set({ url: videoId}); v3.play()
      v4.set({ url: videoId}); v4.play()
      v5.set({ url: videoId}); v5.play()
      v6.set({ url: videoId}); v6.play()              
    }  
  }) 
})