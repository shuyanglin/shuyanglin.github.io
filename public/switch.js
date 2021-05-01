
function storeSessionStorage() {
    // Check browser support
    if (sessionStorage.length == 0) {
        console.log("register session");
        if (typeof (Storage) !== "undefined") {
            // Store
            sessionStorage.setItem("mode", "light");
            // Retrieve
            console.log("current mode: ", sessionStorage.getItem("mode"));
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }
    } else {
        console.log("main page current mode: ", sessionStorage.getItem("mode"));
        if (sessionStorage.getItem("mode") == "pink") {
            modeUpdate();
        }
        
    } 
}

function modeUpdate() {
    console.log("mode update");
    switchMode();
    changeBtnTxt();
}

function detectMode() {
    console.log("entered  detectMode");
    if (sessionStorage.getItem("mode") == "light")
    {
        console.log("on cv load,  current mode: ", sessionStorage.getItem("mode"));
    } else if(sessionStorage.getItem("mode") == "pink"){
        
        console.log("on cv load,  current mode: ", sessionStorage.getItem("mode"));
        switchMode();
        specializedSwitch();
        console.log("on cv , after switching, current mode: ", sessionStorage.getItem("mode"));
    }
}

function clicked() {
    
    console.log("entered clicked");

    if (sessionStorage.getItem("mode") == "light")
    {
        sessionStorage.setItem("mode", "pink");
        console.log("current mode: ", sessionStorage.getItem("mode"));
    } else if(sessionStorage.getItem("mode") == "pink"){
        sessionStorage.setItem("mode", "light");
        console.log("current mode: ", sessionStorage.getItem("mode"));
    }

    switchMode();
    changeBtnTxt();
}

function changeBtnTxt() {
    // change button text
    
    var btn = document.getElementById("toggleBtn");
    var btnTxt = btn.firstChild.nodeValue;
    if(btnTxt == "Toggle pink mode"){
        btn.firstChild.nodeValue = "Toggle light mode";
    } else if(btnTxt == "Toggle light mode"){
        btn.firstChild.nodeValue="Toggle pink mode";
    }
}


function switchMode() {
    console.log("entered switchMode");

    // body
    var element = document.body;
    element.classList.toggle("pink-mode-body");

    // a
    var a_array = document.getElementsByTagName('a');                
    for (i = 0; i < a_array.length; i++ ){
        a_array[i].classList.toggle("pink-mode-a");
        // console.log(a_array[i]);
    }

    // .fa
    var fa_array = document.getElementsByClassName('fa');                
    for (i = 0; i < fa_array.length; i++ ){
        fa_array[i].classList.toggle("pink-mode-fa");
        // console.log(fa_array[i]);
    } 


}

function specializedSwitch() { 
    console.log("entered Special switchMode");
    // border
    var bor = document.getElementById("cv-work");
    bor.classList.toggle("pink-mode-cv-work");
    var bor2 = document.getElementById("cv-education");
    bor2.classList.toggle("pink-mode-cv-education");
    var bor3 = document.getElementById("cv-toolset");
    bor3.classList.toggle("pink-mode-cv-toolset");
}