/*
#File: Index.js
#Author: 
#Date: June 2020
#Email: @ .
#Description: Loads the app and inserts it into the div 'start-app'
#Purpose: We have to kickstart the app somehow!
#input: Nothin
#output: The Application and maybe a Service Worker
*/


(async()=>{

    //Get the URL Query String. default: ""
    let location_search = window.location.search

    // Check the URL Query String for meaningful information
    window.GlobalVariable = location_search.replace("?GlobalVariable=", "").replace(".html", "").replace(/([A-Z])/g, ' $1').trim()
    let viewOne = GlobalVariable.includes('viewone') 

    //
    // Load a View using the URL Query String for navigation
    //
    document.body.innerHTML = ''
    if (!location_search) {
        //
        // Load the Homepage
        //
        console.log('HOMEPAGE')
        // let myCounties = await import(/* webpackChunkName: "ScriptName" */ './maps/Basemap_of_DC_in_Light_Gray.json')
        // let body = document.querySelector("#body") 
        let jsv = await import(/* webpackChunkName: "admin" */ './js/admin.js')
        document.body.innerHTML += jsv.body // `<div id="root">test</div>` 
    } 
    else if (viewOne) {
        //
        // VIEW ONE
        //
    } 
    else {
        //
        // VIEW TWO
        //
    }
}
)()

const children = [...document.scripts]; 
children.forEach((child) => { 
    // console.log(child);
    child.src?.includes('head') && child.remove(); 
});