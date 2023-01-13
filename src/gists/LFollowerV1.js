// Spaces Example:
// https://www.voxels.com/spaces/9247b674-c0e5-4750-a21e-bc71e4b8cae8

// moves a feature in 3 dimensions at a set speed towards another feature that can be moving or stationary.
// animates the move nicely
// you can see this working in the chase ships (at least for now) at 
// https://www.cryptovoxels.com/play?coords=SW@1331W,1069S,17.5F

// ------------------------OPTIONS-----------------------------------------------------

let speed = 1.7
let movingTargetFeatureID = 'leader'

//-------------------------END OPTIONS-------------------------------------------------

function setPosition(f, x, y, z) {
    f.position.x = x
    f.position.y = y
    f.position.z = z
}

function setRotation(f, x, y, z) {
    f.rotation.x = x
    f.rotation.y = y
    f.rotation.z = z
}

function minimiseRotation(dR) {
    return ((((dR/Math.PI)+1)%2)-1)*Math.PI

    // basically does this
    /*
    if (dR > Math.PI) {
        // eg yA = 1.8pi, y = .1pi, dR=yA-y=1.7pi, but would be better as -1.8pi -2pi - .1pi = -0.3pi
        dR -= 2*Math.PI
    } else if (dR < -Math.PI){
        // what about the other way, yA = 0.1, y = 1.8, yA-y = -1.7
        dR += 2*Math.PI
    }
    return dR
    */
}

function caclulateDistanceMovedAlongAxes(speed, currentPosition, destinationPosition) {
    
    let dx = destinationPosition.x - currentPosition.x
    let dy = destinationPosition.y - currentPosition.y
    let dz = destinationPosition.z - currentPosition.z
    
    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz)

    return new Vector3(speed*dx/dist, speed*dy/dist, speed*dz/dist)
}

// move feature f to (x,y,z) in s seconds
function animatedMove(f, x, y, z, s) {

    let dX = x - f.position.x
    let dY = y - f.position.y
    let dZ = z - f.position.z

    // roll
    let rX = 0//Math.PI * 3/2
    // yaw
    let rY = Math.atan2(dX, dZ)  + Math.PI / 2
    // pitch
    let rZ = 0 
    
    /*
    let rZ = Math.atan2(dX, dY)  + Math.PI
    // don't want it to invert, so if the angle is >pi/2 flip the x Axis
    if (rZ > Math.PI/ 2 || rZ < -Math.PI/2) {
        rX = Math.PI
    }
    else {
        rX = 0
    }
    */

    let dRX = minimiseRotation(rX - f.rotation.x)
    let dRY = minimiseRotation(rY - f.rotation.y)
    let dRZ = minimiseRotation(rZ - f.rotation.z)

    let animation = f.createAnimation('position')
    animation.setKeys([{
        frame: s*30, // standard is 30 fps (means it take 1 second)
        value: f.position.add( new Vector3(dX, dY, dZ) )
    }])

    let animation2 = f.createAnimation('rotation')
    animation2.setKeys([{
        frame: s*30, // standard is 30 fps (means it take 1 second)
        value: f.rotation.add( new Vector3(dRX, dRY, dRZ) )
    }])

    f.startAnimations( [animation, animation2] )
 
    setPosition(f, x, y, z)  
    setRotation(f, rX, rY, rZ)
}

setInterval(()=>{
    let target = parcel.getFeatureById(movingTargetFeatureID)
    if (!target) {
      return
    }

    let weMoveThisFar = caclulateDistanceMovedAlongAxes(speed, feature.position, target.position)

    animatedMove(feature, feature.position.x + weMoveThisFar.x, feature.position.y + weMoveThisFar.y, 
        feature.position.z + weMoveThisFar.z, 1)
  

},1000)

