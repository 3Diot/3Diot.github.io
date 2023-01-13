// https://www.voxels.com/spaces/d604ac81-d239-4926-b41b-8f88711d602f/play

# 🥳Announcements 🎉
{:style='color:red;font-size:380px; margin:0px'}

## Notices
{:style='float:right; width: 51%; font-size:160px'}

- - Check out the Burn!
- - Were looking for a new Crypto Chat App to integrate. Know one?
- - Check back for more information
{:style='float:right; width: 50%; font-size:120px'}

## TODO
{:style='font-size:160px'}

- [x] Parcel Bouncer
{:style='color:red;font-size:120px'}

- [x] Visit Parcel Page
{:style='color:red;font-size:120px'}

- [x] Spaces Guestbook
{:style='color:red;font-size:120px'}

## Calendar
{:style='font-size:160px'}

| Date | News |
| ----------- | ----------- | ----------- |
| 8/25 | Fill out our Feature Survey! |
| 8/22 | Fill out our Design Survey |
{:style='font-size:120px'}



    let title = a[e.text] 
    if ( title ) {
      try{
        let txt = "# Bug Info" + header + "Bug " + subheader + title + b[e.text] + c[e.text]
        parcel.getFeatureById('bugs_info').set({'text': txt }) 
      }
      catch{ console.log('error') }  
    }