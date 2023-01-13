comingSoonPosterLink = 'https://www.dropbox.com/s/etppf2rpog6l2r4/unnamed.jpg?dl=0'
comingSoonVideoUrl = 'https://www.youtube.com/watch?v=SClKrK62Uis'

nowPlayingLeftPosterLink = 'https://www.dropbox.com/s/55z2sxc217n54vr/COMING%20SOON%20POSTER.png?dl=0'
nowPlayingLeftVideoUrl =  'https://www.youtube.com/'

nowPlayingCenterPosterLink = 'https://www.dropbox.com/s/55s7j7bbztgpta0/Calladita%20Poster-.jpeg?dl=0'
nowPlayingCenterVideoUrl = 'https://www.youtube.com/watch?v=-mamP2sypnY'

nowPlayingRightPosterLink = 'https://www.dropbox.com/s/j56j3gzypjiuf8h/Genesis%20Poster.png?dl=0' 
nowPlayingRightVideoUrl = 'https://youtu.be/lrNITwuXL7c'

comingSoonPosterLinkOutsideLeft = 'https://www.dropbox.com/s/55z2sxc217n54vr/COMING%20SOON%20POSTER.png?dl=0'
comingSoonVideoUrlOutsideLeft = 'SClKrK62Uis'

comingSoonPosterLinkOutsideCenterLeft = 'https://www.dropbox.com/s/55z2sxc217n54vr/COMING%20SOON%20POSTER.png?dl=0'
comingSoonVideoUrlOutsideCenterLeft = 'SClKrK62Uis'

comingSoonPosterLinkOutsideCenterRight = 'https://www.dropbox.com/s/55z2sxc217n54vr/COMING%20SOON%20POSTER.png?dl=0'
comingSoonVideoUrlOutsideCenterRight = 'SClKrK62Uis'

comingSoonPosterLinkOutsideRight = 'https://www.dropbox.com/s/55z2sxc217n54vr/COMING%20SOON%20POSTER.png?dl=0'
comingSoonVideoUrlOutsideRight = 'SClKrK62Uis'

let timeout = ''

/* Coming Soon */
let comingSoonPoster = parcel.getFeatureById('log_comingSoonPoster')
let comingSoonBtn =    parcel.getFeatureById('log_comingSoonBtn') 
comingSoonBtn.on(   'click',e=>{ playVideo(comingSoonPoster, comingSoonVideoUrl ) } )
comingSoonPoster.on('click',e=>{ playVideo(comingSoonPoster, comingSoonVideoUrl ) } )
comingSoonPoster.set({'url': comingSoonPosterLink })

/* Left Now Playing */
let nowPlayingLeftPoster = parcel.getFeatureById('log_nowPlayingLeftPoster')
let nowPlayingLeftBtn =      parcel.getFeatureById('log_nowPlayingLeftBtn') 
nowPlayingLeftBtn.on(     'click',e=>{ playVideo(nowPlayingLeftPoster, nowPlayingLeftVideoUrl ) } )
nowPlayingLeftPoster.on('click',e=>{ playVideo(nowPlayingLeftPoster, nowPlayingLeftVideoUrl ) } )
nowPlayingLeftPoster.set({'url': nowPlayingLeftPosterLink })

/* Center Now Playing */
let nowPlayingCenterPoster = parcel.getFeatureById('log_nowPlayingCenterPoster')
let nowPlayingCenterBtn =      parcel.getFeatureById('log_nowPlayingCenterBtn') 
nowPlayingCenterBtn.on(     'click',e=>{ playVideo(nowPlayingCenterPoster, nowPlayingCenterVideoUrl ) } )
nowPlayingCenterPoster.on('click',e=>{ playVideo(nowPlayingCenterPoster, nowPlayingCenterVideoUrl ) } )
nowPlayingCenterPoster.set({'url': nowPlayingCenterPosterLink })

/* Right Now Playing */
let nowPlayingRightPoster = parcel.getFeatureById('log_nowPlayingRightPoster')
let nowPlayingRightBtn =      parcel.getFeatureById('log_nowPlayingRightBtn') 
nowPlayingRightBtn.on(     'click',e=>{ playVideo(nowPlayingRightPoster, nowPlayingRightVideoUrl ) } )
nowPlayingRightPoster.on('click',e=>{ playVideo(nowPlayingRightPoster, nowPlayingRightVideoUrl ) } )
nowPlayingRightPoster.set({'url': nowPlayingRightPosterLink })

/* Coming Soon Outside Left*/
let comingSoonPosterOutsideLeft = parcel.getFeatureById('log_comingSoonPosterOutsideLeft')
let comingSoonOutsideLeftBtn =    parcel.getFeatureById('log_comingSoonOutsideLeftBtn') 
comingSoonOutsideLeftBtn.on(   'click',e=>{ playVideo(comingSoonPosterOutsideLeft, comingSoonVideoUrlOutsideLeft ) } )
comingSoonPosterOutsideLeft.on('click',e=>{ playVideo(comingSoonPosterOutsideLeft, comingSoonVideoUrlOutsideLeft ) } )
comingSoonPosterOutsideLeft.set({'url': comingSoonPosterLinkOutsideLeft })

/* Coming Soon Outside Center Left*/
let comingSoonPosterOutsideCenterLeft = parcel.getFeatureById('log_comingSoonPosterOutsideCenterLeft')
let comingSoonOutsideCenterLeftBtn =    parcel.getFeatureById('log_comingSoonOutsideCenterLeftBtn') 
comingSoonOutsideCenterLeftBtn.on(   'click',e=>{ playVideo(comingSoonPosterOutsideCenterLeft, comingSoonVideoUrlOutsideCenterLeft ) } )
comingSoonPosterOutsideCenterLeft.on('click',e=>{ playVideo(comingSoonPosterOutsideCenterLeft, comingSoonVideoUrlOutCenterLeft ) } )
comingSoonPosterOutsideCenterLeft.set({'url': comingSoonPosterLinkOutsideCenterLeft })

/* Coming Soon Outside Center Right*/
let comingSoonPosterOutsideCenterRight = parcel.getFeatureById('log_comingSoonPosterOutsideCenterRight')
let comingSoonOutsideCenterRightBtn =    parcel.getFeatureById('log_comingSoonOutsideCenterRightBtn') 
comingSoonOutsideCenterRightBtn.on(   'click',e=>{ playVideo(comingSoonPosterOutsideCenterRight, comingSoonVideoUrlOutsideCenterRight ) } )
comingSoonPosterOutsideCenterRight.on('click',e=>{ playVideo(comingSoonPosterOutsideCenterRight, comingSoonVideoUrlOutsideCenterRight ) } )
comingSoonPosterOutsideCenterRight.set({'url': comingSoonPosterLinkOutsideCenterRight })

/* Coming Soon Outside Right*/
let comingSoonPosterOutsideRight = parcel.getFeatureById('log_comingSoonPosterOutsideRight')
let comingSoonOutsideRightBtn =    parcel.getFeatureById('log_comingSoonOutsideRightBtn') 
comingSoonOutsideRightBtn.on(   'click',e=>{ playVideo(comingSoonPosterOutsideRight, comingSoonVideoUrlOutsideRight ) } )
comingSoonPosterOutsideRight.on('click',e=>{ playVideo(comingSoonPosterOutsideRight, comingSoonVideoUrlOutsideRight ) } )
comingSoonPosterOutsideRight.set({'url': comingSoonPosterLinkOutsideRight })


function playVideo(poster, videoId) {
  console.log('startAnimations');
  let animation1 = poster.createAnimation('position')   
  animation1.setKeys( [ { frame: 30, value: poster.position.add( new Vector3( -.2,0,0 ) ) } ] ) 
  poster.startAnimations( [animation1] )
  timeout = setTimeout( revert, 116000, poster, videoId); 
  setTimeout( createVideo, 1000, poster, videoId);  
}

function createVideo(poster, videourl){
  let yt = parcel.getFeatureById('yt'); 
  yt.set({ 'id': 'yt',
    'url': videourl,
    'position':[ 7, 2.5, poster.position.z ], 
    'rotation': [0,1.5708,0],
    'scale':[ 6, 3, 1 ]  
  })
  yt.play()

  let a = parcel.createFeature('button')
  a.set({scale:[1,1,1]})
  a.set({'id':'btn', position:[ 7, 3.5, (poster.position.z-2.3) ], 'rotation': [0,0,90]}) // -1.25
  a.on('click',e=>{ revert(poster, yt) }) 
}

function revert(poster, yt) { 
  yt.pause() 
  clearTimeout(timeout);
  poster.set({ 'position':[ 7.25, 2.5, poster.position.z ] })  
  parcel.removeFeature(parcel.getFeatureById('btn') ) 
  yt.set({'position':[0,-1,0]})   
}