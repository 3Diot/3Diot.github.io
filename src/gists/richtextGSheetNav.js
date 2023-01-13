// https://www.voxels.com/spaces/ba876a59-6859-4537-8e31-e6b3fedd8cee/play
let [a, b, c] = [[],[],[]]


let style = "\r\n{:style='color:white;font-size:30px; margin:0px'}\n\n" 
let subheader = " \r\n{:style='color:orange;font-size:45px; margin:0px'}\n\n"

let loadBugs= async () => { 
  let txt = ( await ( await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcE7oNNFSXW04QW-EYSrV8c1V1p3opq_ftVAcN1njO-nB1Ldg41EcxHPwh6RtKJmhEdq-RSr2pLoT1/pub?gid=0&single=true&output=csv') ).text() ).split("\n").slice(8)
  txt.splice(2).map( (row, i) => {
    let [x, y, z] = row.split(",")
    a.push( '- '+ i + ' - ' + x + style)
    b.push( "Description" + subheader  + y + style)
    c.push( "Status" + subheader  +z + style)
  })
}

function displayGSheetMenu(index = false, richtext, sheetName){ 
  let header = " \r\n{:style='color:red;font-size:60px; margin:0px'}\n\n"

  let txt = "# "+sheetName+' '+ header + a.join("\n") 
  if( index && a[index]){  
    txt = "# "+sheetName+" Info" + header + sheetName+" " + subheader + a[index] + b[index] + c[index]
  }
  let ft = parcel.getFeatureById(richtext)
  ft.set({'text': txt }) 
}

parcel.on('playerenter', async () => { 
  let richtext_gSheet = 'richtext_gSheet_bugs'
  let richtext_gSheet_input = 'richtext_gSheet_bugs_input'
  let sheetName = 'Bugs'
  await loadBugs()
  displayGSheetMenu(false, richtext_gSheet, sheetName)
  parcel.getFeatureById(richtext_gSheet_input).on('changed', e=> displayGSheetMenu( e.text, richtext_gSheet, sheetName))
})