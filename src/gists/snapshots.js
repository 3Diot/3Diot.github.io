console.log('starting')
feature.on('click', async (e) => {
  let callback = async (e) => {
    console.log('callback!', e);
    parcel.setSnapshot(e[0].id)  
  }
  console.log('click')
  
  parcel.fetchSnapshots(callback)
})