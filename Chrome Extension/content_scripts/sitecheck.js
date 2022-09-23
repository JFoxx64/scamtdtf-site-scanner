//TODO: Add ability to scan site for keywords and popout side button with warning

function checkSite(){
    if(!checked){
        createButton();
    }

    fetch("https://scamtdtf.com:3000/api/v3/checksite", {
        method: "POST",
        headers : {
            siteurl : url
        }})
        .then( res => res.json())
        .then (res => {
            let previousstatus = laststatus;

            if(res.found){
                laststatus = "warning";
                siteid = res.data[0].id;
                createBanner("warning", "warning-banner", "Warning!", "This website has been reported as a scam on Scam Takedown Task Force");
                partialHideButton();
            }else if(res.inreview){
                laststatus = "caution";
                if(previousstatus != laststatus){
                    createBanner("caution", "caution-banner", "Caution!", "This website has been flagged as a scam on Scam Takedown Task Force and is awaiting Auditor review");
                    partialHideButton();
                }
            }else if(res.indeepscan){
                laststatus = "queue"
            }else if(res.userreported){
                laststatus = "userreported"
                if(previousstatus != laststatus){
                    createBanner("caution", "reported-banner", "Caution!", "This website has been reported by users as a scam on Scam Takedown Task Force and is awaiting Auditor review");
                    partialHideButton();
                }
            } else{
                laststatus = "clear"
                destroyAllBanners();
            }

            if(laststatus != "clear" && laststatus != "warning"){
                setTimeout(() => {
                    checkSite();
                }, 5000);
            }

            if(previousstatus == "scanning" && laststatus == "clear"){
                partialHideButton();
            }

            if(!finalcheck && laststatus == "clear"){
                finalcheck = true;

                setTimeout(() => {
                    checkSite();
                    partialHideButton();
                }, 10000);
            }
            
            updateSiteChipStatus();
            checked = true;
        })
        .catch( error => console.log(error));
}