// 
// https://www.voxels.com/spaces/6cdcd1e5-de6b-4118-8167-43c801129973/play
// 
// Place near: Your treasure or gift
// Behavior: Shows number of coins held by user. Red if under 5.
// 
function func(){
  feature.set({'text':'Collect 5 Coins: '+count + '/9', 'color':"#ff0000"})
  if(count>=5){   feature.set({'text':'5 Coins Collected: '+count + '/9', 'color':"#00ff00"} )}
}

setInterval(func,1000)