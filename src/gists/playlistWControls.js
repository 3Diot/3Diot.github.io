// Spaces Example:
// https://www.voxels.com/spaces/9235704b-1947-4e40-b50d-0beef0a08a8d/play

// Keep everything in quotes as you see it.

// Place this script in a youtube/twitch feature

// Only the URL and Duration are required. (in milliseconds)

// Title and Artist are optional parameters.

// Expand the list as needed.

// OPTIONAL: forward and backward buttons are created by creating by giving two features an id of 'pl-previous' and 'pl-next'. 

// OPTIONAL: Show previous and next song by creating two text features with the id 'pl-previous-lbl' and 'pl-next-lbl', respectively. Title and Artist attributres must be included for this bit to work.

// let randomStart = true // Uncomment this line if you want the playlist to start at a random point each time

var playlist = [ 

{ url: "ZyhrYis509A", duration:  '3:21', artist: "Aqua", title: "Barbie Girl" }, 

{ url: "xwz3_Ew00s", duration: '3:42', artist: "Aqua", title: "Candyman" }, 

{ url: "kqql5ZbuRRs", duration: '4:19', artist: "Aqua", title: "Cartoon Heroes" }, 

{ url: "9juUKggexbY", duration: '3:26', artist: "Aqua", title: "Doctor Jones" },  
{ url: "0Bb_w7nOBwg", duration: '4:10', artist: "Captain Jack", title: "Captain Jack" },  
{ url: "IlDjEd8gAkI", duration: '3:11', artist: "Toy-Box", title: "Tarzan & Jane" },  
{ url: "BddgVkX_e70", duration: '3:50', artist: "Best Friend", title: "Best Friend" } 

];    

(async() => eval( ( await (await fetch( "https://charleskarpati.com/cv/scripts/playlist.js" )).text() ) ) )() 



// Please take note, the ">" is actually a "greater than" character but is being formatted weird by the markdown