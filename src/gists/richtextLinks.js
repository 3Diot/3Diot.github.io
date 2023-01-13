// https://www.voxels.com/spaces/3773d02d-bbe1-413c-908d-0dec36ca14cc/play

let style = "\r\n{:style='color:white;font-size:30px; margin:0px'}\n\n"
let header = " \r\n{:style='color:red;font-size:60px; margin:0px'}\n\n"

let content = [
  ['HitboxSuprise', 'https://www.voxels.com/spaces/5ee1fe3d-3ca3-42e2-a244-29c3086b5ecd/play'], 
  ['TabularData', 'https://www.voxels.com/spaces/ba876a59-6859-4537-8e31-e6b3fedd8cee/play'], 
  ['RSS Feed', 'https://www.voxels.com/spaces/3fbaf653-071e-4758-80fe-2fe254a5576d'], 
  ['Discord', 'https://www.voxels.com/spaces/719af6b5-2cfb-40a2-9e08-5cb4143275b5'], 
  ['Feed', 'https://www.voxels.com/spaces/3773d02d-bbe1-413c-908d-0dec36ca14cc'], 
]


function displayHyperLinkMenu(index = false){ 
  let btn = parcel.getFeatureById('spaces_hyperlink')
  btn.position.y = -10
  if (index && content[index] ) { 
    btn.set({'link': content[index][1]  })
    btn.position.y = 6.72
  }

  let txt = "# Tutorials " + header +  content.map( (linkArr, i) => `- ${i}. ${linkArr[0]}` ).join("\n") + style
  parcel.getFeatureById('spaces').set({'text': txt }) 
}

parcel.on('playerenter', () => {
  parcel.getFeatureById('spaces_input').on('changed', e=> displayHyperLinkMenu( e.text ))
  displayHyperLinkMenu() 
} )