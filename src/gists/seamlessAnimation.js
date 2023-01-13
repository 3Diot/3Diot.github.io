// Spaces Example:
// https://www.voxels.com/spaces/4e32288b-609b-4186-ad50-fb67171a3aca/play

// Animation Instructions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAKE EDITS TO THESE PARTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// STEP 1 - List out here all the voxels you'd like to have on loop
let u = [
    "https://www.dropbox.com/s/ecl83ica323de1r/0.vox?dl=0",
    "https://www.dropbox.com/s/a4wqmqc77f6dx74/1.vox?dl=0",
    "https://www.dropbox.com/s/wv0kdf4ite6jru5/2.vox?dl=0",
    "https://www.dropbox.com/s/9uo3vpajc58b8ly/3.vox?dl=0",
    "https://www.dropbox.com/s/ajzzws6pbawxcyu/4.vox?dl=0",
    "https://www.dropbox.com/s/voug9l0zbs8dksr/5.vox?dl=0",
    "https://www.dropbox.com/s/a6d31nc2auf5fpp/6.vox?dl=0",
    "https://www.dropbox.com/s/rlvri3ymj8cldq1/7.vox?dl=0",
    "https://www.dropbox.com/s/ihztedpllr6didf/8.vox?dl=0",
    "https://www.dropbox.com/s/k3p8mdctkztz0t4/9.vox?dl=0",
    "https://www.dropbox.com/s/ks03v0hin31yi0o/10.vox?dl=0",
    "https://www.dropbox.com/s/q3m9czeqnoemt4e/11.vox?dl=0",
    "https://www.dropbox.com/s/pmniqixogmx59fv/12.vox?dl=0",
    "https://www.dropbox.com/s/5umfjotaq2zvc9q/13.vox?dl=0",
    "https://www.dropbox.com/s/xzachgrxpk8bvf3/14.vox?dl=0",
    "https://www.dropbox.com/s/iavaoujkez2enca/15.vox?dl=0",
    "https://www.dropbox.com/s/gkxdb4iszgirwpe/16.vox?dl=0",
    "https://www.dropbox.com/s/8o7pjouopihu3my/17.vox?dl=0",
    "https://www.dropbox.com/s/t6cztcvq643lyrm/18.vox?dl=0",
    "https://www.dropbox.com/s/yv7p0w8ieqlxyuu/19.vox?dl=0",
    "https://www.dropbox.com/s/dwd48rm7enkg12z/20.vox?dl=0",
    "https://www.dropbox.com/s/sf3iwxcl87aqndk/21.vox?dl=0",
    "https://www.dropbox.com/s/x4rqyp83l1enmvf/22.vox?dl=0",
    "https://www.dropbox.com/s/gaaxwe145tcm636/23.vox?dl=0",
    "https://www.dropbox.com/s/4j2rqo6liiivth4/24.vox?dl=0"
]

// Step 2 - In world, stack vox models in the same spot. No need to set their urls.
// But give them featureIds counting up using the same 'root' (like: "flag_1", "flag_2" etc.) Set the 'root' here.
let root = "flag_"

// STEP 3 - Specify the height at which these vox models should appear at */
let ypos = 1 

// STEP 4 -  Paste the final result on any feature in your parcel script 

// # Note: By Grouping these assets together, you can be move and rotat em all at once.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO NOT TOUCH BELOW THIS POINT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Update the voxel urls
u.map((url, index) => parcel.getFeatureById( root + (index +1)  ).set({'url': url }) )

// Start Animation
let k=0
setInterval(()=>{
    k++ 
    parcel.getFeatureById( root + k  ).position.y = -20 
    parcel.getFeatureById( root + ( (k==u.length?0:k) +1)  ).position.y = ypos 
    if(k>=25){k=0} 
}, 100)