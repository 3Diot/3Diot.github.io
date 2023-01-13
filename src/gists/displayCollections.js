// Spaces Example
// https://www.voxels.com/spaces/35ae4806-5b71-41a9-9867-1bb50065268d/play

(async () => {

let n = 200; let itemsPerRow = 10;

for (let i = 2; i < n; i++) {
    try{  
      
let response = await fetch('https://www.cryptovoxels.com/c/698/'+i)

let metadata = await response.json(); 
      
let a = parcel.createFeature('vox-model')
      
a.set({ 
            scale:[1,1,1], 
            position:[(i % itemsPerRow), Math.floor(i / itemsPerRow)+1, 0], 
            url: metadata.attributes[0].value
      })

}catch{ console.log('Error with item', i) }  }
})();