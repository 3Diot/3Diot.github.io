"use strict";
(this["webpackChunkname"] = this["webpackChunkname"] || []).push([[328],{

/***/ 988:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "body": () => (/* binding */ body)
/* harmony export */ });
console.log('admin');
var body = "<ion-app>\n<ion-header>\n    <!-- class=\"ion-no-border\" -->\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <img src='/images/icon310.png' style=\"width:50px\"/>\n        </ion-buttons>\n        <ion-title onclick=\"location.href='https://www.CVMiniGames.com'\" style=\"cursor: pointer; text-align: center\">\n            CVMinigames \n        </ion-title>\n        <ion-buttons class='unlocked' id=\"btn-logout\" slot=\"end\" style=\"padding-left:10px; cursor: pointer; \"> Logout </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n<ion-content fullscreen class=\"ion-padding\">\n    <ion-grid class=\"md hydrated\">\n        <!-- LOG IN -->\n        <ion-row class='locked' style=\"display: flex; justify-content: center;  align-items: center;\">\n            <div style=\"text-align: center; position:absolute; z-index:9999; background-color: rgba(240, 248, 255, 0.75); padding: 12px;\">\n                <h1>CVMinigames | Admin</h1>\n                <p class=\"ion-padding-start ion-padding-end\">\n                    <ion-button id=\"btn-login\" expand=\"block\" fill=\"outline\" class=\"md button button-block button-outline ion-activatable ion-focusable hydrated\">Login With Metamask</ion-button>\n                </p>\n                <p> A non-official admin page for your parcel </p>\n            </div>\n            <iframe id='cvIframe' width=\"100%\" height=\"500\" scrolling=\"yes\" class=\"iframe-class\" frameborder=\"0\"></iframe>\n        </ion-row>\n        <ion-row class='locked' style=\"display: flex; flex-direction: column; align-content: center;\">\n            <h2 style=\"display: inline\">Welcome!</h2>\n            <p>Use this page to administer user-built scripts you can use for your CV Parcel! </p>\n            <p>Here you will be able to:</p>\n            <ul> \n                <li> Configure advanced metadata for your NFT's</li>\n                <li> Compose NPC walk-paths, behaviors, and dialogs</li>\n                <li> Connect no to low-code scripts to your parcel</li>\n                <li> +more!</li>\n            </ul>\n        </ion-row>\n        <!-- LOGGED IN -->\n        <ion-row class='unlocked' style=\"display: flex; justify-content: center; align-items: center; flex-direction: column;\">\n            <div style=\"display: flex; justify-content: center; align-items: center;\">\n                <div id='parcelsList' style=\"background-color: rgba(240, 248, 255, 0.75); padding: 12px;\"> </div>\n                <div id='contributingParcelsList' style=\"background-color: rgba(240, 248, 255, 0.75); padding: 12px;\"> </div>\n                <div id='parcelInfo' style=\"background-color: rgba(240, 248, 255, 0.75); padding: 12px;\"> </div>\n            </div>\n            <div id='parcelAdminNav' style=\"display: none; flex-direction: row; justify-content: space-evenly; width: 100%; padding-top:20px;\">\n                <div>\n                    <h2> SVG Paths </h2>\n                    <ion-list>\n                        <ion-item id='createSVGbtn' onclick=createSVG('new') style='cursor: pointer;'>Add Floor</ion-item>\n                        <div id=\"svglist\"></div>\n                    </ion-list>\n                </div>\n                <div>\n                    <h2> NPC Dialog </h2>\n                    <ion-list> \n                        <ion-item id='createNPCbtn' onclick=createNPC() style='cursor: pointer;'>Add NPC</ion-item>\n                        <div id=\"npclist\">\n                          <!-- <ion-item onclick=editNPC()>Character one</ion-item> -->\n                        </div>\n                    </ion-list>\n                </div>\n            </div>\n            <div id='parcelAdminConfig' style=\"display: none; flex-direction: column; align-items: center; justify-content: space-around; padding-top:20px;\">\n                <div id='createNPC' style=\"display: none; flex-direction: column; align-items: center; justify-content: space-around; padding-top:20px;\">\n                  <h2>What's this?</h2>\n                    <p> 1. Users will be able create interactive NPCS (walk paths + prop items) </p>\n                    <p> The editor panel will look something like this: </p>\n                    <img id='view'>\t\t\t\t\t\t\t\n                    <p> 2. The users will be able to configure <a href='https://charleskarpati.com/cv/scripts/holiday2021/santa1.json'>local</a> and global states. </p>\n                    <p> 2a. In-game <a href='https://charleskarpati.com/cv/scripts/holiday2021/holiday.js'>logic</a> has already been partially written. </p>\n                    <p> The new config structure will resemble something like this: </p>\n                    <img id='struct'>\n                </div>\n                <div id='editNPC' style=\"display: none; flex-direction: column; align-items: center; justify-content: space-around; padding-top:20px;\">\n                  editNPC content stub\n                </div>\n                <div id='createSVG' style=\"display: none; flex-direction: column; align-items: center; justify-content: space-around; padding-top:20px;\">\n                    <h2>Instructions</h2>\n                    <div>\n                        <p>0. Configure an SVG Template of your parcel filtering features by their height</p>\n                        <p>0A. Only Vox-models with a FeatureID will be shown </p>\n                        <p>1. Download a template SVG of your parcel</p>\n                        <p>2. Draw new boxes and lines on it on an svg editor of your choice </p>\n                        <p>3. Reupload the drawn SVG to save it</p>\n                        <p>4. Connect it to an NPC in the NPC tab to have your drawings define it's walk path!</p>\n                        <p>Tip: The SVG will be the name of the SVG file you upload. Only in-parcel Voxels are shown.</p>\n                    </div>\n                    <h2>SVG Editor</h2>\n                    <div style='background: #FFF5F6; display: flex; flex-direction: column; align-items: center;'>\n                        <div><label for=\"newceiling\">SVG Ceiling Height: </label> <input id=\"newceiling\" name=\"newceiling\" type=\"number\" step=\".01\" value=\"3\"></div>\n                        <div><label for=\"newfloor\">SVG Floor Height: </label> <input id=\"newfloor\" name=\"newfloor\"  type=\"number\" step=\".01\" value=\"0\"></div>\n                        <p>Display: <small>*Just visual aids - not 100% accurate.*</small> </p> \n                        <div id=\"newcolidables\"></div>  \n                        <p class=\"ion-padding-start ion-padding-end\">\n                            <ion-button onclick=createSVG('update') expand=\"block\" fill=\"outline\" class=\"md button button-block button-outline ion-activatable ion-focusable hydrated\">Update SVG</ion-button>\n                        </p>  \n                    </div>\n                    <!-- PREVIEW NEW SVG -->\n    <div id='dl_new_svg' style=\"width:100%; height:100%\"> </div> \n                    <!-- DOWNLOAD NEW SVG-->\n                    <p class=\"ion-padding-start ion-padding-end\">\n                        <ion-button onclick=downloadSVG('dl_new_svg') expand=\"block\" fill=\"outline\" class=\"md button button-block button-outline ion-activatable ion-focusable hydrated\">Download SVG</ion-button>\n                    </p>\n                    <!-- UPLOAD NEW SVG-->\n                    <div>\n                        <label for=\"uploadNewSVG\">Upload & Save: </label> <input id='uploadNewSVG' type=\"file\" name=\"uploadNewSVG\"  accept=\".svg\" />\n                    </div>\n                </div>\n                <div id='editSVG' style=\"display: none; flex-direction: column; align-items: center; justify-content: space-around; padding-top:20px;\">\n                    <h2>SVG Editor</h2>\n                    <div id=\"old_svg_info\" style='background: #FFF5F6; display: flex; flex-direction: column; align-items: center;'></div>\n                    <!-- PREVIEW OLD SVG-->\n                    <div id='dl_old_svg' style=\"width:100%; height:100%\"> </div> \n                    <!-- DOWNLOAD OLD SVG-->\n                    <p class=\"ion-padding-start ion-padding-end\">\n                        <ion-button onclick=downloadSVG('dl_old_svg') expand=\"block\" fill=\"outline\" class=\"md button button-block button-outline ion-activatable ion-focusable hydrated\">Download SVG</ion-button>\n                    </p>\n                    <!-- DELETE OLD SVG--> \n                    <p class=\"ion-padding-start ion-padding-end\">\n                        <ion-button onclick=deleteSVG() expand=\"block\" fill=\"outline\" class=\"md button button-block button-outline ion-activatable ion-focusable hydrated\">Delete SVG</ion-button>\n                    </p>\n                    <!-- UPLOAD OLD SVG-->\n                    <div>\n                        <label for=\"uploadOldSVG\">Upload & Save: </label> <input id='uploadOldSVG' type=\"file\" name=\"uploadOldSVG\"  accept=\".svg\" />\n                    </div> \n                </div>\n            </div>\n            <div id='parcelAnalytics' style=\"display: none; flex-direction: column; justify-content: center; align-items: flex-start; padding-top:20px;\">\n      <div> \n                    <p>It's super simple to log user analytics on your parcel. SEO experts hate it!</p>\n                  <h2> Positions </h2>\n                    <p>Simply place this script tag into one of your parcel's features to start logging the position of any user who enters your parcel: <br/>\n                      <b> parcel.on('playerenter', (e)=> { (async(e) => eval( ( await (await fetch( 'https://charleskarpati.com/cv/scripts/log_positions.js' )).text() ) ) )(e) }) </b>\n                    </p> <!-- ?t='+Math.floor(Math.random() * 100000 --> \n                    <div id=\"positions-table\"></div> \n                    <br/>\n                    <h2> Clicks </h2>\n                    <p>Logging when a user clicks a specific item can be a bit more tricky.</p> \n                    <p>1. Start by place this script tag into one of your parcel's features: <br/>\n                    <b> parcel.on('playerenter', (e)=> { (async(e) => eval( ( await (await fetch( 'https://charleskarpati.com/cv/scripts/log_clicks.js' )).text() ) ) )(e) }) </b>\n                    </p> \n                    <p>2. Then give the feature you want logged a unique ID prefixed with: <b>log_</b></p>\n                    <div id=\"clicks-table\"></div>\n                </div>\n            </div>\n        </ion-row>\n        <ion-row style=\"justify-content: center; padding-top:80px;\">\n            <div style=\"text-align: center; background-color: rgba(240, 248, 255, 0.75);\">\n                <p>This site is user-ran. </p>\n                <p>No assurance can be made as to the longevity of the services provided. </p>\n                <p>Please do not message the CV team with your questions pertaining to features provided herin. </p>\n            </div>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n</ion-app>";

/*

// On start
const serverUrl = "https://viqacncpexai.usemoralis.com:2053/server";
const appId = "GSMUwYE7bS1aCen8roUB5KpnxVfWDzn4Y4Yt9R3R";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

async function logOut() { await Moralis.User.logOut(); window.location.reload() }
async function login() { !user ? (await Moralis.authenticate({ signingMessage: "Sign to Login" }), toggleLocks()) : '' }	
async function toggleLocks(){ 
	user = Moralis.User.current(); 
    document.querySelectorAll('.unlocked').forEach(function(el) { el.style.display = user ? 'flex' : 'none' })
    document.querySelectorAll('.locked').forEach(function(el) { el.style.display = user ? 'none' : 'flex' }) 
    user ? showDash(): document.getElementById('cvIframe').src="" 
  // https://www.cryptovoxels.com/play?coords=N@1447E,1128S,&mode=orbit
}

let parcels = [];
let contributingParcels = [];
let parcel = {}
let svgData = {}
parcelAdminNav = document.getElementById('parcelAdminNav')
parcelAnalytics = document.getElementById('parcelAnalytics') 
parcelAdminConfig = document.getElementById('parcelAdminConfig')
//
// DISPLAY LOGIC
//
async function showDash() { 
  parcels = await getParcels(user.get('ethAddress') );
	parcelsList = document.getElementById('parcelsList')
  let txt = parcels.map( p => { return "<ion-item style='cursor: pointer;' id='load"+p+"' onclick='loadParcelAdminBox("+p+")'>"+p+"</ion-item>" }).join(' ')
  parcelsList.innerHTML = 'Your Parcels:<ion-list style="max-height: 500px; overflow: auto;">' + txt + '</ion-list>'
	
  contributingParcels = await getContributingParcels(user.get('ethAddress') );  
  contributingParcelsList = document.getElementById('contributingParcelsList') 
  txt = contributingParcels.map( p => { return "<ion-item style='cursor: pointer;' id='load"+p+"' onclick='loadParcelAdminBox("+p+")'>"+p+"</ion-item>" }).join(' ')
  contributingParcelsList.innerHTML = 'Contributing:<ion-list style="max-height: 500px; overflow: auto;">' + txt + '</ion-list>'
}

async function loadParcelAdminBox(p) {
	parcel = await getCVParcelData(p) 
	parcelInfo = document.getElementById('parcelInfo')
	parcelInfo.innerHTML = '' + 
	  '<h1>'+ (parcel.name ? parcel.name : 'Your place:') + '</h1>' +
	  '<h2>#'+p + ' - '+ parcel.address + '</h2>' +
	  '<ion-segment value="admin">' +
	  '<ion-segment-button value="analytics" onclick=displayAnalytics()><ion-label>Analytics</ion-label>' +
      '</ion-segment-button> <ion-segment-button value="admin" onclick=displayAdmin()><ion-label>Admin</ion-label>' +
	  '</ion-segment-button></ion-segment>'
	displayAdmin()
} 

async function displayAdmin(){ 
  parcelAnalytics.style.display = 'none' 
	parcelAdminConfig.style.display = 'none'
  parcelAdminNav.style.display = 'flex'
	svgData = await getDBParcelSVGData() 
  let svglist = document.getElementById('svglist')
	svglist.innerHTML = '';
  svgData.map(s => {
	  svglist.innerHTML += '<ion-item onclick=editSVG('+s.id+') style="cursor: pointer;">'+s.name+'</ion-item>'
	}) 
  // npcData = await getDBParcelNPCData()
}

//
// NPC Admin Config
//
const createNPC = async (status) => {
  console.log('createit!'); 
	parcelAdminConfig.style.display = 'flex'
  document.getElementById('editSVG').style.display = 'none'
  document.getElementById('createSVG').style.display = 'none' 
  document.getElementById('createNPC').style.display = 'flex'
  document.getElementById('editNPC').style.display = 'none'
  document.getElementById('struct').src = "https://charleskarpati.com/cv/struct.png"
  document.getElementById('view').src = "https://charleskarpati.com/cv/view.png"
}

const editNPC = async (status) => {
  console.log('editit!');
	parcelAdminConfig.style.display = 'flex'
  document.getElementById('editSVG').style.display = 'none'
  document.getElementById('createSVG').style.display = 'none' 
  document.getElementById('createNPC').style.display = 'none'
  document.getElementById('editNPC').style.display = 'flex'
}

//
// SVG Admin Config
// 
const editSVG = async (id) => { 
  svgid = id
	parcelAdminConfig.style.display = 'flex'
  document.getElementById('editSVG').style.display = 'flex'
  document.getElementById('createSVG').style.display = 'none'
  document.getElementById('createNPC').style.display = 'none'
  document.getElementById('editNPC').style.display = 'none'
	s = svgData.find(element => element.id == id)
	document.getElementById('dl_old_svg').innerHTML = s.svg.replace(/\"/g, '"');
	document.getElementById('old_svg_info').innerHTML = "id: "+id+"<br> name: "+s.name+"<br>"	
}
const createSVG = async (status) => {
  svgid = "none"
  document.getElementById('editSVG').style.display = 'none'
  document.getElementById('createSVG').style.display = 'flex' 
  document.getElementById('createNPC').style.display = 'none'
  document.getElementById('editNPC').style.display = 'none'
	let s=document.getElementById('dl_new_svg')
	s.innerHTML = ''
	parcelAdminConfig.style.display = 'flex' 
	let newcolidables = document.getElementById('newcolidables')
	let ceiling = document.getElementById('newceiling').value
	let floor = document.getElementById('newfloor').value
	if(status == 'new'){ newcolidables.innerHTML = ''; ceiling.value = 3; floor.value = 0 }

	// viewbox = min-x, min-y, width and height	
	let w = Math.abs(parcel.x1 - parcel.x2)
	let l = Math.abs(parcel.z1 - parcel.z2) 
  var draw = SVG().addTo('#dl_new_svg').viewbox(-w/2, -l/2, w, l )
	s.children[0].style.height = '500px'
  draw.rect(w, l ).move( -w/2, -l/2 ).attr({ fill: '#f06' })
	
	function random(number){ return Math.floor(Math.random()*number); }
	function randomColor(){ return 'rgb('+random(255)+','+random(255)+','+random(255)+')'; }
			
	parcel.content.features.map(ft => {
	  let element = document.querySelector('[value="nc_'+ft.id+'"]')
		let elexists = ( typeof(element) != 'undefined' && element != null ) 
  	// Ignore these features
	  let keep = ['collectible-model', 'megavox', 'vox-model']
		let skip = ( 
		  !keep.includes(ft.type) || 
			typeof ft.id == 'undefined' || 
			ft.id == '' || 
			ft.position[0] > (w /2 + 5) 
			|| ft.position[2] > (l /2 + 5) 
			|| ft.position[1] > ceiling 
			|| ft.position[1] < floor 
		)
	  if( skip ){ if(elexists){ element.parentNode.remove() } return  }

    // Create checkboxes if status = new OR
    // Check xor create checkbox for feature if not exist b/c it was previously out of ceiling/floor range		
		let nc_txt = '<div> <input type="checkbox" value="nc_'+ft.id+'" name="newcolidables" checked><label for="newcolidables">'+ft.id+'</label></div>'
		if(status == 'new'){ newcolidables.innerHTML += nc_txt }
		if(status == 'update'){  
			if(!elexists){ newcolidables.innerHTML += nc_txt }
			else if(!element.checked){return } 
		} 
		
		let scale = [ ft.scale[2]/2, ft.scale[0]/2 ]
		let position = [ ft.position[0] - ft.scale[2]/5.5, ft.position[2] - ft.scale[0]/3.5 ]
		console.log( {scale, position, ft} )

		draw.rect( ...scale )
				.move( ...position)
				// .transform({rotate: ft.rotation[1] })
				.attr({ fill: randomColor() })
				.attr('id', ft.id)
	} )
}
const downloadSVG = async (el_id) => {
	var svgData = document.querySelector("#"+el_id)
	svgData = svgData.outerHTML;
	var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
	var svgUrl = URL.createObjectURL(svgBlob);
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = "CVSVG.svg";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

const addNPC = async () => {

}
// http://tabulator.info/docs/5.2/page
async function displayAnalytics(){  
  parcelAnalytics.style.display = 'flex'
  parcelAdminNav.style.display = 'none'
	parcelAdminConfig.style.display = 'none'
    // clicks = await getDBParcelClicks() 
	var table = new Tabulator("#clicks-table", { 
    autoColumns:true,         //create columns from data field names
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells 
    history:true,             //allow undo and redo actions on the table
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,       //allow row order to be changed
    pagination:true,          //paginate the data
    paginationCounter:"rows", //display count of paginated rows in footer
    paginationMode:"remote",
    paginationSize:5,         //optional parameter to request a certain number of rows per page
    paginationSize:7,         //allow 7 rows per page of data
    ajaxURL:"https://charleskarpati.com/api/",
    ajaxParams:{fn:"log", type:"click", parcel:parcel.id},
    paginationInitialPage:0, 
  });
  // positions = await getDBParcelPositions() 
	var table = new Tabulator("#positions-table", { 
    autoColumns:true,         //create columns from data field names
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells 
    history:true,             //allow undo and redo actions on the table
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,       //allow row order to be changed
    pagination:true,          //paginate the data
    paginationCounter:"rows", //display count of paginated rows in footer
    paginationMode:"remote",
    paginationSize:5,         //optional parameter to request a certain number of rows per page
    paginationSize:7,         //allow 7 rows per page of data
    ajaxURL:"https://charleskarpati.com/api/",
    ajaxParams:{fn:"log", type:"position", parcel:parcel.id},
    paginationInitialPage:0, 
  });
}

//
// POST DATA
//
const uploadSVG = async (e) => {
	let files = e.target.files; 
	let f = files[0];	
	// Limit 2 MB 
	if(f.size > (1048576 * 2) ){ alert("File is too big! Remove some elements please!"); return };	
  let reader = new FileReader();	
	// Closure to capture the file information.
	reader.onload = (function(theFile) {
		return async function(e) { 
			let body = { "id": svgid, "parcel": parcel.id, "name": f.name, "svg": e.target.result }
			let url = "https://charleskarpati.com/api/?fn=svg&t=2"	
			let postOptions = { method: 'POST', body: JSON.stringify(	body ) }; 
			let resp = ( await ( await fetch( url, postOptions ) ).text() )
      loadParcelAdminBox(parcel.id)			
		};
	})(f);
	reader.readAsText(f);
}
document.getElementById('uploadNewSVG').onchange =  uploadSVG
document.getElementById('uploadOldSVG').onchange =  uploadSVG

const deleteSVG = async () => {
	let body = { "id": svgid, "parcel": parcel.id, "name": '', "svg": '' }
	let url = "https://charleskarpati.com/api/?fn=svg"	
	let postOptions = { method: 'POST', body: JSON.stringify(	body ) }; 
	let resp = ( await ( await fetch( url, postOptions ) ).text() )
	loadParcelAdminBox(parcel.id)	
}

//
// GET DATA
//
const getParcels = async (wallet) => (await ( await fetch('https://api.thegraph.com/subgraphs/name/benjythebee/cryptovoxels-parcels', { 
		method: 'POST', headers: {'Content-Type': 'application/json',},
		body: JSON.stringify({ query: `{ parcels(where:{owner:"`+wallet.toLowerCase() +`"}){ id } }`, }) }
) ).json()).data.parcels.map(a => a.id)
const getContributingParcels = async (wallet) => (await ( await fetch('https://i7j2i34u1d.execute-api.us-east-1.amazonaws.com/default/ContributorParcels?wallet='+wallet) ).json()).parcels.map(a => a.id)
async function getCVParcelData(parcel){ return (await ( await fetch( "https://cc6jt4sss6.execute-api.us-east-1.amazonaws.com/default/bypassCors?parcel="+parcel )  ).json() ).parcel }
async function getDBParcelNPCData(){ return (await ( await fetch( "https://charleskarpati.com/api/?fn=npc&parcel="+parcel.id )  ).json() ) } 
async function getDBParcelSVGData(){ return (await ( await fetch( "https://charleskarpati.com/api/?fn=svg&parcel="+parcel.id )  ).json() ) }
async function getDBParcelClicks(){ return (await ( await fetch( "https://charleskarpati.com/api/?fn=log&type=click&parcel="+parcel.id )  ).json() ) }
async function getDBParcelPositions(){ return (await ( await fetch( "https://charleskarpati.com/api/?fn=log&type=position&parcel="+parcel.id )  ).json() ) }
toggleLocks() 

//
// TESTING
//
window.onload = function() {
  //
  //setTimeout(function() {
  //  document.getElementById('load6463').click();
  //		// setTimeout(function() { document.getElementById('createSVGbtn').click(); }, 1000);
  //}, 2000);
  //
};

*/

/***/ })

}]);