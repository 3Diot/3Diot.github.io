let load_bugs = async () => { 
  let txt = ( await ( await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcE7oNNFSXW04QW-EYSrV8c1V1p3opq_ftVAcN1njO-nB1Ldg41EcxHPwh6RtKJmhEdq-RSr2pLoT1/pub?gid=0&single=true&output=csv') ).text() ).split("\n").slice(8)
  let [a, b, c] = [[],[],[]]
  console.log('TE')
  txt.splice(2).map( row => {
    let [x, y, z] = row.split(",")
    a.push(x + "\r\n{:style='color:red;font-size:120px; margin:0px'}\n")
    b.push(y)
    c.push(z)      
  })
  console.log('TEST', {a})
  txt = "# Bugs \r\n{:style='color:red;font-size:380px; margin:0px'}\n\n"+ a.join("\n")
  console.log('Bugs: ', 'txt', txt)
  parcel.getFeatureById('bugs').set({'text': txt}) 
}

feature.on('click', async () => {
  load_bugs()
} )

parcel.on('playerenter', () => {
  load_bugs()
})