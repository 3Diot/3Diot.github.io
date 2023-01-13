let load_announcements = async () => {
  
    let txt = ( await ( await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcE7oNNFSXW04QW-EYSrV8c1V1p3opq_ftVAcN1njO-nB1Ldg41EcxHPwh6RtKJmhEdq-RSr2pLoT1/pub?gid=1846290718&single=true&output=csv') ).text() ).split("\n").slice(8).join("\n")
  parcel.getFeatureById('announcements').set({'text': txt })    
  
}

feature.on('click', async () => {
  load_announcements()
} )

parcel.on('playerenter', () => {
  load_announcements()
})