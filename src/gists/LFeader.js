// Spaces Example:
// https://www.voxels.com/spaces/9247b674-c0e5-4750-a21e-bc71e4b8cae8

let maxPosition = new Vector3(5, 5, 5)

let minPosition = new Vector3(-5, 0, -5)

let positionDelta = new Vector3(0,0,0)

let speed = 2

function setPosition(f, position) {
    f.position.x = position.x
    f.position.y = position.y
    f.position.z = position.z
}

function setRotation(f, rotation) {
    f.rotation.x = rotation.x
    f.rotation.y = rotation.y
    f.rotation.z = rotation.z
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

// move feature f to position in s seconds
function animatedMove(f, position, s) {

    let dX = position.x - f.position.x
    let dY = position.y - f.position.y
    let dZ = position.z - f.position.z

    // roll
    let rX = Math.PI * 3/2
    // yaw
    let rY = Math.atan2(dX, dZ)  + Math.PI / 2
    // pitch
    let rZ = 0 

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
 
    setPosition(f, position)  
    setRotation(f, new Vector3(rX, rY, rZ))
}

function stayInsideBoundary(x, dx, min, max) {
    if (dx > 0 && x + dx > max) {
        dx = -0.5
    } else if (dx < 0 && x + dx < min) {
        dx = 0.5
    }
    return dx 
}

function getRandomNextPosition(position, previousDelta, speed) {
    let result = new Vector3(0,0,0)
    result.x = speed * (previousDelta.x * 0.7 +(Math.random()-0.5) * 0.3)
    result.y = speed * (previousDelta.y * 0.7 + (Math.random()-0.5) * 0.3)
    result.z = speed * (previousDelta.z * 0.7 + (Math.random()-0.5) * 0.3)

    result.x = stayInsideBoundary(position.x, result.x, minPosition.x, maxPosition.x)
    result.y = stayInsideBoundary(position.y, result.y, minPosition.y, maxPosition.y)
    result.z = stayInsideBoundary(position.z, result.z, minPosition.z, maxPosition.z)

    return result
}

setInterval(()=>{
    positionDelta = getRandomNextPosition(feature.position, positionDelta, speed)

    animatedMove(feature, new Vector3(feature.position.x + positionDelta.x, feature.position.y + positionDelta.y, 
            feature.position.z + positionDelta.z), 1) 
 
},1000)