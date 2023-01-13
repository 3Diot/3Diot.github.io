// Spaces Example
// https://www.voxels.com/spaces/fcd25ca5-e6b2-473e-a795-1a23ffa15c03/play

// Create a vox model with a trigger. This will be your lap marker. Once created, drop this code in it. the text will update onto a richtext feature with a featureID of "chart"

var times = [ new Date() ]
var laptime = []
var chart = parcel.getFeatureById('chart')
var text = chart._content.text

feature.on('trigger', () => { 
  times.push( new Date() )
  laptime.push(times[1] - times[0] +' Milliseconds' )
  text = `Run in Circles! \n \n ${ 
 laptime.join("\n \n")  }`
  chart.set({text}) 
  times.shift()
  if(laptime.length>5){ laptime.shift() }
  console.log('trigger', times)
} ) 