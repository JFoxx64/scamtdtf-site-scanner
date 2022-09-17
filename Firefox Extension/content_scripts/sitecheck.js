const html = document.URL;
let url = new URL(html).origin;
let showpopout = true;

let cautionbanner = false;
let cautionflag = false;

function vote(id, value){
    console.log(id, value)
    fetch("https://scamtdtf.com:3000/api/recordvote", { method: "POST", headers : { id : id, vote : value } });
}

function checkSite(){
    createButton();

    // fetch("https://scamtdtf.com:3000/api/v3/checksite", {
    //     method: "POST",
    //     headers : {
    //         siteurl : url
    //     }})
    //     .then( res => res.json())
    //     .then (res => {
    //         if(res.found){
    //             let resdata = res.data[0];
    //             createBannerWarning(resdata);
    //         }else if(res.inreview){
    //             createReviewBanner();
    //         }else if(res.indeepscan){
    //             createSideCautionPopout();
    //         } else{
    //             closeSidePopout();
    //         }
    //     })
    //     .catch( error => console.log(error));
}

function createButton(){
    let div = document.createElement("div");
    div.style = "all: initial; width: 100px; height: 100px; position: fixed; top: 100px; left: 0; z-index: 9001;"
    div.innerHTML = '<div class="flake flake-three"></div><div class="flake flake-one"></div><div class="flake flake-two"></div>'
    document.body.insertBefore(div, document.body.firstChild);

    let infodiv = document.createElement("div");
    infodiv.style = "all: initial; width: 100px; height: 100px; position: fixed; top: 200px; left: 0; z-index: 9001; text-align: center; font-family: Avenir, Helvetica, Arial, sans-serif;"
    infodiv.innerHTML = "Scanning website"
    document.body.insertBefore(infodiv, document.body.firstChild);

    let clickoverlay = document.createElement("div");
    clickoverlay.id = "stdtf-scanner"
    clickoverlay.classList.add("scanner-button")
    div.appendChild(clickoverlay);
}

function createSideBar(){
    let div = document.createElement("div");
    div.id = "stdtf-sidebar"
    div.style = "all: initial; width: 100px; height: 100vh; position: fixed; top: 100px; left: 0; z-index: 9000; background-color: blue;"
    document.body.insertBefore(div, document.body.firstChild);
}

function checkSettings() {
    function setCurrentChoice(result) {
        if(result) showpopout = result.slideout;
        else {
            browser.storage.sync.set({ slideout: true });
            showpopout = true;
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("slideout");
    getting.then(setCurrentChoice, onError);
}

function createBannerWarning(resdata){
    closeSidePopout();
    closeCautionBanner();

    let div = document.createElement("div");
    div.style = 'width : 100%; height : 400px; position: sticky; top: 0; z-index: 10000; background-color : #DD3333; text-align: center; padding : 10px; color : #000000; font-size : 2em; font-family: Avenir, Helvetica, Arial, sans-serif;';
    div.innerHTML = "Warning!<br/>This website has been reported as a scam on Scam Takedown Task Force"
    document.body.insertBefore(div, document.body.firstChild);

    let votediv = document.createElement("div");
    votediv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
    votediv.innerHTML = "Was this warning useful?"
    div.appendChild(votediv);

    let buttonapprove = document.createElement("button");
    buttonapprove.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(160, 200, 135);";
    buttonapprove.innerHTML = "Yes &#x1f44d;";
    buttonapprove.onclick = function () {
        votediv.remove();

        vote(resdata.id, 1);

        let thanksdiv = document.createElement("div");
        thanksdiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        thanksdiv.innerHTML = "Thank you for your input!"
        div.appendChild(thanksdiv);
    };
    votediv.appendChild(buttonapprove);

    let buttondisapprove = document.createElement("button");
    buttondisapprove.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(200, 135, 135);";
    buttondisapprove.innerHTML = "No &#x1f44e;";
    buttondisapprove.onclick = function () {
        votediv.remove();

        vote(resdata.id, -1);

        let thanksdiv = document.createElement("div");
        thanksdiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        thanksdiv.innerHTML = "Thank you for your input!"
        div.appendChild(thanksdiv);
    };
    votediv.appendChild(buttondisapprove);

    let button = document.createElement("button");
    button.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px;";
    button.innerHTML = "Close";
    button.onclick = function () {
        div.remove();
    };
    div.appendChild(button);
}

function createReviewBanner(){
    if(!cautionbanner){
        closeSidePopout();

        let div = document.createElement("div");
        div.id = "cautionbanner"
        div.style = 'width : 100%; height : 400px; position: sticky; top: 0; z-index: 10000; background-color : #fce148; text-align: center; padding : 10px; color : #000000; font-size : 2em; font-family: Avenir, Helvetica, Arial, sans-serif;';
        div.innerHTML = "Caution!<br/>This website has been flagged as a scam on Scam Takedown Task Force and is awaiting Auditor review"
        document.body.insertBefore(div, document.body.firstChild);
    
        let votediv = document.createElement("div");
        votediv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        votediv.innerHTML = "Was this warning useful?"
        div.appendChild(votediv);
    
        let buttonapprove = document.createElement("button");
        buttonapprove.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(160, 200, 135);";
        buttonapprove.innerHTML = "Yes &#x1f44d;";
        buttonapprove.onclick = function () {
            votediv.remove();
    
            vote(resdata.id, 1);
    
            let thanksdiv = document.createElement("div");
            thanksdiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
            thanksdiv.innerHTML = "Thank you for your input!"
            div.appendChild(thanksdiv);
        };
        votediv.appendChild(buttonapprove);
    
        let buttondisapprove = document.createElement("button");
        buttondisapprove.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(200, 135, 135);";
        buttondisapprove.innerHTML = "No &#x1f44e;";
        buttondisapprove.onclick = function () {
            votediv.remove();
    
            vote(resdata.id, -1);
    
            let thanksdiv = document.createElement("div");
            thanksdiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
            thanksdiv.innerHTML = "Thank you for your input!"
            div.appendChild(thanksdiv);
        };
        votediv.appendChild(buttondisapprove);
    
        let button = document.createElement("button");
        button.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px;";
        button.innerHTML = "Close";
        button.onclick = function () {
            div.remove();
        };
        div.appendChild(button);

        cautionbanner = true;
    }

    setTimeout(function(){
        checkSite();
    }, 5000)
}

function createSideCautionPopout(){
    if(!cautionflag && showpopout){
        let div = document.createElement("div");
        div.id = "sidecautionpopout"
        div.style = 'width : 200px; height : 400px; position: absolute; left: -200px; top: 0; z-index: 10000; background-color : #DD3333; text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif; transition: 0.5s ease-in-out; border-radius: 0 0 13px 0';
        div.innerHTML = "<h2>STDTF</h2><div>Checking this site...</div>"
        document.body.insertBefore(div, document.body.firstChild);

        let button = document.createElement("button");
        button.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px;";
        button.innerHTML = "Close";
        button.onclick = function () {
            forceCloseSidePopout();
        };
        div.appendChild(button);

        cautionflag = true;

        setTimeout(function(){
            div.style.left = '0px';
        }, 500)
    }

    setTimeout(function(){
        checkSite();
    }, 5000)
}

function closeSidePopout(){
    let div = document.getElementById("sidecautionpopout");
    if(div){
        let cleareddiv = document.createElement("div");
        cleareddiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        cleareddiv.innerHTML = "Deep Scan Complete"
        div.appendChild(cleareddiv);

        setTimeout(() => {
            div.style.left = "-200px";
            setTimeout(function(){
                div.remove();
            }, 600);
        }, 2000);
    }
    cautionflag = false;
}

function closeCautionBanner(){
    let div = document.getElementById("cautionbanner");
    if(div){
        div.remove();
    }
    cautionbanner = false;
}

function forceCloseSidePopout(){
    let div = document.getElementById("sidecautionpopout");
    if(div){
        let cleareddiv = document.createElement("div");
        cleareddiv.style = 'text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        cleareddiv.innerHTML = "Closing"
        div.appendChild(cleareddiv);

        div.style.left = "-200px";
        setTimeout(function(){
            div.remove();
        }, 600);
    }
}

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}
  

addStyle(`
    .scanner-button{
        all: initial;
        width: 100px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9002;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        border-radius: 0 13px 13px 0;
    }
    .scanner-button:hover {
        background-color: rgba(130,130,130,0.3);
    }
`);
addStyle(`
    .flake {
        all: initial;
        position: absolute;
        border-radius: 50%;
        z-index: 9001;
    }
`);
addStyle(`
    .flake-one {
        width: 46px;
        height: 46px;
        border: 10px solid transparent;
        left:calc(50% - 33px);
        top:calc(50% - 33px);
        border-top-color: #ff2c2c;
        border-right-color: #ff2c2c;
        border-left-color: #ff2c2c;
        animation: spin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 1000ms;
    }
`);
addStyle(`
    .flake-two {
        width: 40px;
        height: 40px;
        border: 10px solid transparent;
        left:calc(50% - 30px);
        top: calc(50% - 30px);
        border-top-color: black;
        animation: counterspin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 3000ms;
    }
`);
addStyle(`
    .flake-three {
        width: 50px;
        height: 50px;
        border: 20px solid transparent;
        left:calc(50% - 45px);
        top: calc(50% - 45px);
        border-bottom-color: black;
        border-right-color: black;
        border-left-color: black;
        animation: counterspin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 10000ms;
    }
`);

addStyle(`
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
`);

addStyle(`
    @keyframes counterspin {
        from {
        transform:rotate(0deg);
        }
        to {
        transform:rotate(-360deg);
        }
    }
`);

checkSettings();
checkSite();