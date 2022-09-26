let warningkey = null;

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
                createBanner("warning", "stdtf-warning-banner", "Warning!", "This website has been reported as a scam on Scam Takedown Task Force");
                partialHideButton();
            }else if(res.inreview){
                laststatus = "caution";
                if(previousstatus != laststatus){
                    createBanner("caution", "stdtf-caution-banner", "Caution!", "This website has been flagged as a scam on Scam Takedown Task Force and is awaiting Auditor review");
                    partialHideButton();
                }
            }else if(res.indeepscan){
                laststatus = "queue";
                destroyAllBanners();
            }else if(res.userreported){
                laststatus = "userreported"
                if(previousstatus != laststatus){
                    createBanner("caution", "stdtf-reported-banner", "Caution!", "This website has been reported by users as a scam on Scam Takedown Task Force and is awaiting Auditor review");
                    partialHideButton();
                }
            } else if(warningkey){
                laststatus = "warningpattern"
                
                partialHideButton();
            } else{
                laststatus = "clear"
                destroyAllBanners();
                partialHideButton();
            }

            if(laststatus != "clear" && laststatus != "warning"){
                setTimeout(() => {
                    checkSite();
                }, 5000);
            }

            if(!finalcheck && laststatus == "clear"){
                finalcheck = true;
                checkWarnings();

                if(warningkey){
                    laststatus = "warningpattern"
                    destroyAllBanners();
                    partialHideButton();
                }

                setTimeout(() => {
                    checkSite();
                }, 10000);
            }
            
            updateSiteChipStatus();
            updateSideButtonStatus();
            checked = true;
        })
        .catch( error => {
            console.log(error);

            checkWarnings();

            if(warningkey){
                laststatus = "warningpattern"
            } else{
                laststatus = "error"
            }

            setTimeout(() => {
                checkSite();
            }, 10000);

            destroyAllBanners();
            partialHideButton();
            updateSiteChipStatus();
            updateSideButtonStatus();

            checked = true;
        });
}

function checkWarnings(){
    if(WARNING_KEYS.length > 0){
        let html = document.body.innerHTML;
        let strippedhtml = html.replace(/\s/g, '').toLowerCase();
    
        let maxvaluehits = null;
        let maxhits = 0;
    
        for(let i = 0; i < WARNING_KEYS.length; i++){
            let hits = 0;
    
            for(let j = 0; j < WARNING_KEYS[i].keys.length; j++){
                if(strippedhtml.includes(WARNING_KEYS[i].keys[j].word)){
                    hits += WARNING_KEYS[i].keys[j].weight;
                }
            }
    
            if(hits >= WARNING_KEYS[i].threshhold && maxhits < hits){
                maxvaluehits = WARNING_KEYS[i];
            }
        }
    
        warningkey = maxvaluehits;
    } else{
        setTimeout(() => {
            checkWarnings();
        }, 100);
    }
}