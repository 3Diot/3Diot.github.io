(async() => {
  
const queryPromises = [  
"accelerometer",
"background-sync",
"gyroscope",
"magnetometer",
"midi", 
"screen-wake-lock",
].map(name => {
  return navigator.permissions.query({ name });
});
for await (const status of queryPromises) {
  console.log({status})  
  console.log(`${status.name}: ${status.state}`);
}
  
}

)() 