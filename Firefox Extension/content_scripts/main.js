const html = document.URL;
let url = null
let siteid = null;

let checked = false;
let laststatus = "nopermission"
let finalcheck = false;

let bannerclosed = false;

function loaded(item) {
    if(item.allowurls){
        url = new URL(html).origin;
        laststatus = "scanning"
        checkSite();
    } else{
        laststatus == "nopermission"
        createButton();
        updateSideButtonStatus();
        updateSiteChipStatus();
        checkWarnings();
    }
}

function error(error) {
    console.log(`Error: ${error}`);
}

browser.storage.sync.get("allowurls")
.then(loaded, error);

function vote(value){
    fetch("https://scamtdtf.com:3000/api/recordvote", { method: "POST", headers : { id : siteid, vote : value, url : url } });
}

browser.runtime.onMessage.addListener((request) => {

    if(request.msg == "OpenSettings"){
        if(document.getElementById("stdtf-sidebar")){
            destroySideBar();
        }else{
            if(document.getElementById("stdtf-side-button")) {
                partialHideButton();
        
                setTimeout(() => {
                    createSideBar()
                }, 350);
            } else{
                createSideBar();
            }
        }
    }
});