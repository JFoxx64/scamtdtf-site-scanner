const html = document.URL;
let url = new URL(html).origin;
let showpopout = true;

let cautionbanner = false;
let cautionflag = false;

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

function vote(id, value){
    console.log(id, value)
    fetch("https://scamtdtf.com:3000/api/recordvote", { method: "POST", headers : { id : id, vote : value } });
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

function checkSite(){
    fetch("https://scamtdtf.com:3000/api/v3/checksite", {
        method: "POST",
        headers : {
            siteurl : url
        }})
        .then( res => res.json())
        .then (res => {
            if(res.found){
                let resdata = res.data[0];
                createBannerWarning(resdata);
            }else if(res.inreview){
                createReviewBanner();
            }else if(res.indeepscan){
                createSideCautionPopout();
            } else{
                closeSidePopout();
            }
        })
        .catch( error => console.log(error));
}

function checkSettings() {
    function setCurrentChoice(result) {
        if(result) showpopout = result.slideout;
        else {
            chrome.storage.sync.set({ slideout: true });
            showpopout = true;
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = chrome.storage.sync.get("slideout");
    getting.then(setCurrentChoice, onError);
}

checkSettings();
checkSite();