const html = document.URL;
let url = new URL(html).origin;
let siteid = null;

let checked = false;
let laststatus = "scanning"
let finalcheck = false;

let bannerclosed = false;

function vote(value){
    fetch("https://scamtdtf.com:3000/api/recordvote", { method: "POST", headers : { id : siteid, vote : value, url : url } });
}

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
                createBanner("warning", "warning-banner", "Warning!", "This website has been reported as a scam on Scam Takedown Task Force", true);
                destroyButton();
            }else if(res.inreview){
                laststatus = "caution";
                if(previousstatus != laststatus){
                    createBanner("caution", "caution-banner", "Caution!", "This website has been flagged as a scam on Scam Takedown Task Force and is awaiting Auditor review", true);
                    destroyButton();
                }
            }else if(res.indeepscan){
                laststatus = "queue"
            }else if(res.userreported){
                laststatus = "userreported"
                if(previousstatus != laststatus){
                    createBanner("caution", "reported-banner", "Caution!", "This website has been reported by users as a scam on Scam Takedown Task Force and is awaiting Auditor review", true);
                    destroyButton();
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
                destroyButton();
            }

            if(!finalcheck && laststatus == "clear"){
                finalcheck = true;

                setTimeout(() => {
                    checkSite();
                    destroyButton();
                }, 10000);
            }
            
            updateSiteChipStatus();
            checked = true;
        })
        .catch( error => console.log(error));
}

function createButton(){
    let div = document.createElement("div");
    div.id = "stdtf-scanner"
    div.style = "all: initial; width: 100px; height: 100px; position: fixed; top: 100px; left: -100px; z-index: 2147483601; transition: 0.3s all ease-in-out;"
    div.innerHTML = '<div class="flake flake-three"></div><div class="flake flake-one"></div><div class="flake flake-two"></div>'
    document.body.insertBefore(div, document.body.firstChild);
    
    setTimeout(function(){
        div.style.left = "0px";
    }, 100);

    let infodiv = document.createElement("div");
    infodiv.style = "all: initial; width: 100px; height: 100px; position: absolute; bottom: -100px; left: 0; z-index: 2147483601; text-align: center; font-family: Avenir, Helvetica, Arial, sans-serif;"
    infodiv.textContent = "Scanning website"
    div.appendChild(infodiv);

    let clickoverlay = document.createElement("div");
    clickoverlay.classList.add("scanner-button")
    clickoverlay.onclick = function(){
        createSideBar();
        destroyButton(div)
    }
    div.appendChild(clickoverlay);
}

function destroyButton(){
    let div = document.getElementById("stdtf-scanner");
    if(div){
        div.style.left = "-100px";

        setTimeout(function(){
            div.remove();
        }, 350);
    }
}

function destroySideBar(){
    let div = document.getElementById("stdtf-sidebar")
    if(div){
        div.style.left = "-380px";

        setTimeout(function(){
            div.remove();
        }, 350);
    }
}

function destroyAllBanners(){
    let div = document.getElementById("stdtf-banner")
    if(div) div.remove();
}

function createSideBar(){
    destroySideBar();

    let div = document.createElement("div");
    div.id = "stdtf-sidebar"
    div.style = "all: initial; width: 380px; min-height: 100vh; position: fixed; top: 0px; left: -380px; overflow: auto; scrollbar-width: none; z-index: 2147483600; background-color: #F0F0F0; color : #000000; transition: 0.3s ease-in-out; font-family: Avenir, Helvetica, Arial, sans-serif;"
    document.body.insertBefore(div, document.body.firstChild);

    let headerbar = document.createElement("div");
    headerbar.style = "width: 380px; height: 50px; position: sticky; top: 0px; left: 0px; background-color: #F0F0F0; z-index: 2147483700;"
    headerbar.innerHTML = "<div style='margin: 5px 0 0 10px;'>Scam Takedown Task Force</div><div style='margin: 5px 0 0 10px;'>Site Scanner</div>"
    div.appendChild(headerbar);

    let closebutton = document.createElement("div");
    closebutton.style = "position: absolute; top: 8px; right: 10px; cursor: pointer; border: solid 1px #CCC; border-radius: 3px; padding: 4px;"
    closebutton.innerHTML = "&#x2715;"
    closebutton.onclick = function(){
        destroySideBar();
    }
    headerbar.appendChild(closebutton);

    setTimeout(function(){
        div.style.left = "0px";
    }, 100);

    div.appendChild(createChip("stdtf-site-chip", 0, "Site Check"))
    div.appendChild(createChip("stdtf-vote-chip", 1, "Feedback"))
    div.appendChild(createChip("stdtf-share-chip", 2, "Share"))
    div.appendChild(createChip("stdtf-news-chip", 3, "News"))
    div.appendChild(createChip("stdtf-support-chip", 4, "Support"))

    fillAllChips();
}

function createBanner(status, bannerclass, header, message, voteaction){
    if(status == "clear" || status == "queue") return;

    destroyAllBanners();

    let div = document.createElement("div");
    div.id = "stdtf-banner";
    div.classList.add("stdtf-banner", bannerclass)
    div.textContent = header
    document.body.insertBefore(div, document.body.firstChild);

    let messagediv = document.createElement("div");
    messagediv.id = "stdtf-banner";
    messagediv.textContent = message
    div.append(messagediv);

    if(voteaction){
        let votediv = document.createElement("div");
        votediv.style = 'all: initial; text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
        votediv.textContent = "Was this warning useful?"
        div.appendChild(votediv);
    
        let buttonapprove = document.createElement("button");
        buttonapprove.style = "all: initial; display : block; border-radius: 7px; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(160, 200, 135); font-family: Avenir, Helvetica, Arial, sans-serif;";
        buttonapprove.innerHTML = "Yes &#x1f44d;";
        buttonapprove.onclick = function () {
            vote(1);
    
            let thanksdiv = document.createElement("div");
            thanksdiv.style = 'all: initial; text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
            thanksdiv.textContent = "Thank you for your input!"
            div.appendChild(thanksdiv);

            votediv.remove();
        };
        votediv.appendChild(buttonapprove);
    
        let buttondisapprove = document.createElement("button");
        buttondisapprove.style = "all: initial; display : block; border-radius: 7px; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: rgb(200, 135, 135); font-family: Avenir, Helvetica, Arial, sans-serif;";
        buttondisapprove.innerHTML = "No &#x1f44e;";
        buttondisapprove.onclick = function () {
            vote(-1);
            
            let thanksdiv = document.createElement("div");
            thanksdiv.style = 'all: initial; text-align: center; padding : 10px; color : #000000; font-size : 16px; font-family: Avenir, Helvetica, Arial, sans-serif;';
            thanksdiv.textContent = "Thank you for your input!"
            div.appendChild(thanksdiv);

            votediv.remove();
        };
        votediv.appendChild(buttondisapprove);
    }

    let button = document.createElement("button");
    button.style = "all: initial; display : block; border-radius: 7px; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: #D9D9D9; font-family: Avenir, Helvetica, Arial, sans-serif;";
    button.textContent = "Close";
    button.onclick = function () {
        div.remove();
        bannerclosed = true;
    };
    div.appendChild(button);

    let sidebarbutton = document.createElement("button");
    sidebarbutton.style = "all: initial; display : block; border-radius: 7px; margin: 10px auto; padding : 10px 50px; cursor: pointer; background-color: #D9D9D9; font-family: Avenir, Helvetica, Arial, sans-serif;";
    sidebarbutton.textContent = "Toggle Sidebar";
    sidebarbutton.onclick = function () {
        if(document.getElementById("stdtf-sidebar")){
            destroySideBar();
        }else{
            if(document.getElementById("stdtf-scanner")) {
                destroyButton();
        
                setTimeout(() => {
                    createSideBar()
                }, 350);
            } else{
                createSideBar();
            }
        }
    };
    div.appendChild(sidebarbutton);
}

function createChip(chip, position, title){
    let div = document.createElement("div");
    div.id = chip;
    div.classList.add("stdtf-chip"),
    div.style.top = ((position * 170) + 70) + "px";
    document.body.insertBefore(div, document.body.firstChild);

    let icondiv = document.createElement("div");
    icondiv.id = chip + "-icon-container";
    icondiv.classList.add("stdtf-chip-icon-container");
    div.appendChild(icondiv);

    let titlediv = document.createElement("div");
    titlediv.classList.add("stdtf-chip-title");
    titlediv.textContent = title;
    div.appendChild(titlediv);

    return div;
}

function fillAllChips(){
    fillSiteChip("stdtf-site-chip");
    fillVoteChip();
    fillShareChip();
    fillNewsChip();
    fillSupportChip();
}

function fillSiteChip(chip){
    let sitechip = document.getElementById("stdtf-site-chip");

    if(sitechip){
        let statusdiv = document.createElement("div");
        statusdiv.id = "stdtf-site-chip-status"
        statusdiv.classList.add("stdtf-site-chip-status");
        sitechip.appendChild(statusdiv);

        if(laststatus != "warning" && laststatus != "caution")
        {
            let button = document.createElement("button");
            button.textContent = "Report Site";
            button.style = "all: initial; width: calc(100% - 110px); font-size: 14px; margin-left: 10px; margin-right: 80px; text-align: center; background-color: #D9D9D9; border-radius: 7px; padding: 5px; width: calc(100% - 110px); font-size: 14px; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
            button.onclick= function(){
                let reportdiv = document.createElement("div");
                reportdiv.textContent = "Thank you for reporting this site, we use your input to help improve our results!";
                reportdiv.classList.add("stdtf-site-chip-status");
                sitechip.appendChild(reportdiv);

                fetch("https://scamtdtf.com:3000/api/userreportsite", { method: "POST", headers: { siteurl : url } })

                button.remove();
            }
            sitechip.appendChild(button);
        }
    }

    updateSiteChipStatus();
}

function updateSiteChipStatus(){
    let sitechip = document.getElementById("stdtf-site-chip");
    let iconcontainer = document.getElementById("stdtf-site-chip-icon-container");
    let statusdiv = document.getElementById("stdtf-site-chip-status");

    if(sitechip && iconcontainer){
        let sitechipicon = document.getElementById("stdtf-site-chip-icon");

        if(sitechipicon) sitechipicon.remove();

        if(laststatus == "clear"){
            let clearicon = document.createElement("div");
            clearicon.id = "stdtf-site-chip-icon";
            clearicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
            clearicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAFe0lEQVRogc2b64tWVRTGf/OOk6OlDkVRdNPMNBqKNImkOzENo1YkdCEo6EsEAwZCqARKUJRaWCiROqal3Si1P6AJ6lMS+MVMDTUraCqirMlp0mliDetMx93a5z33cx7YH845e6+9nr32Xvu2TgvFYhYwD5gNzAHOBzqAc4BR4E/gV+An4CBwCPgCOFqwXrmhDbgH2A58p6TSpGNAH7AQmFBHotOB9cDPGUj60gCwDri0BjzHuqxY81QBRN00DGzRxk2NtGN4ErACeBqY2CSvNMYB4Eu1lqQTKqMduAC4WMd5Z4wuPAQ8p1YfzkI+Lm4Avm5iDSH4AnBLjAYJYzJwm5I5GqOO64okKr1hqbaqpYBYcgdwc451CvldwGlPnWLtJ3KsbxytwCZPpSPATh3PRUG6+0cR1n4VaORVd7u2slXRYeDWAom6uAv4xqPLO8BZWStojSDbp46nbEwD3o4gndrSLZ5uLGP1yQqIulgO/OPp3qmw1BD2N7CkBmQDPOxZAyR2ZPMNbyye8r7CVE+PR9Vxut479pQ1yTPP9taQbIBlnnk6lhN71ij8eilqZ8P7ht4rm0mUufQvp5Bs286uOVnBFGN1JtvPy6MKbXcKiBdcUJ7OmdFjWHmTT+gM9cLhzDtqRkgaf4/OwzM9eT40dlmXWBlfMaagy4rVPxG61fsG+u3zFL7G8Npr3Uxtxub9rfpw/R/ZYJr0rao+cPL+4G477zX6/rxyuDSFRTZYRvpwh5G/O5zXdVYHak72Y907+yCWP+6U2RzO+63zcVUl9M5EWrIB1jjljgQfZhlC55fHy0SXh+ynesQbB3cb5cfOwx4yJuu2CslmtWwAyevuB5Y09DQhjH26A6kCQna3HjqE0Q8sBk4m0EnyHnLezbEIH6Ea5Ek2gEt4thC+0Hl5rAK6RZAVuFc2FzV00R3GLymFp0WXh+xnuj5IS1Zwwnme0jC8XimH24ouPY20yMpGYDCj/D+c56nW0mwkhqBFuhX7Hng8pTLdHrL9+i0rWcGo8zx207LXcd1PNRHS0OvNcJllCRXJa+pphpWO/L0NoyXPbSJEWmmq825dAtI+B/VJRgdlocN593tDL7fCMPeOIYzovZGLOKSjyC7KmazgCud5jOsqx+yfxxDUoue/bpeMOkfKY7mYFPudup7BWFoOxrx1F9IbPKRdS/vGbH/OYzYMa2n5gHy/0lDkpphC41i6Csvi2TzMCD66e8fVCQRHWXpLBZYN4G4Pz1hBbnMU2p9QeBTpKsg2jFvGvnCGxYZiNyasJA7pMsgKbjfq7glnaDMWE9tSVBRFuiyyGFe8A5YjXu9kOhVx9hsFIb2xQrKdxjHtS1bG6cZB/JspKw3iQYToiyWSRQ/qwxyGo87X33Ayy1XLnSUqmxXdxlDaHCVzpjGNHCzZQmnRoVNPWPeTcQLZVhuttLO2NP+De6c0vpRshnaNznEL1yGuw4flhr7SM2MHxV1rdG3xfA+WTqU5HjGCW+SOe25SQb1Gq4nHu78CUj485glqSd0bXzOEjdQg3qMlImxpYxbBDU/sxKi+n5Yfh9iQ05Z3PTrt1mC6TJho3LcG6XDJ8/RCY+oJGyBJ5G4kWj3dO0jvFRxc2mmsoMJpQ57BpWH0GlE+QTqtXW1BhsDzMBq669llrI2DNFTGdDlX72x8rT2q91PPa3dPEoA6WU9I1hiHEtY8e31S5dNaol3D/1cYJ5AuZCr7Ssf7cb3KGdS65ZrnPF3+XaW/+jS7qh3Sxlxb8i3JGOQYdKuxyyoi5fKTR16QaLeXgR8LIDqgsusUQjWOCXqgvjUicj1OCn7U6sn7R62if8WTLi9/wcj4vFp/2Ql+xRPIWP5Ne4Y4IRnnxf2KB/wL4CYurDRHgeUAAAAASUVORK5CYII="/></svg>'
            iconcontainer.style.backgroundColor = "#44C13E";
            iconcontainer.style.backgroundImage = "linear-gradient(to bottom left, #44C13E, #3AA435)"
            iconcontainer.style.title = "Site Cleared Deep Scan"
            iconcontainer.appendChild(clearicon);

            if(sitechip){
                statusdiv.innerHTML = "<b style='font-size: 14px'>No Issues Found</b><div style = 'font-size: 10px;'>What does this mean?</div><div>The STDTF Deep Scanner didn't find any indicators that this site is dangerous; However: The Deep Scanner is NOT perfect.  It can miss indicators.</div>";
            }
        }
        else if(laststatus == "caution"){
            let cautionicon = document.createElement("div");
            cautionicon.id = "stdtf-site-chip-icon";
            cautionicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
            cautionicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAE0klEQVR4nO3dyYsdRRzA8a8zmUQN8aCHiFFjMG4XZ4jLVQUVF/DP8are3CMexMTtoiYacUcFLwoiHlTEQRPjEgVXNBcVQdCJlNRPmrKq39bV9ft11xeaQL/HdL3+0P2mJ/3qYbirgP3AZ8DvfjkMPARcbvmFWWsH8CZwomXZAA4A28a+s3K3B/hpAkZzWQfOHPYuKdca8MsMGLK4U9pZY91puUphvApcC5zhT083AO9Fnne4HindtZrAuCOxhc3AoYqSp0uBnyM7964JW1sGnqqnr26bF0OqKB12CfBDZGfePeMmKkoHXdwRhlRRFiiFcc+CP7eizFEuDKmizNBFwPeRnXVvx9upKFOUwrgv0/YqSkt9Y0gVJZLD+C6yU+7vafsVpdGFhTGkitKCsbfQeEaNcoEyDGmUKA7jW4UY0qhQUhgPACcpGJ80CpQUxj5lGNKgUXYbw5AGiXIecCzyovYrx5AGhbLTOIY0CJShYEimURzGV5HBPwIsKRjfvJlEOTeB8ahxDMkUyi7g655/m9oO/BrZ5pFM23NtsnCLUerIeCzzkbEW2aYsOVN9pDiMLwtgUBAErSjnFMSgMAjaUBzGF5HBPN7jG3hpELSgpDCe6Pm3KQ0glEbRgoEiEEqhnJ3AOOAH1HeaQOgbxWF8rggDhSD0hZLCOOgvlEqlEYTcKO7q81OFGCgGIRfK9gTGMwowUA5C1ygO4xPFGBgAoSuUFMazijAwAsKiKFYwMATCvCgpjEMKMTAGwqwo2/ysB5rfM8KsgdDy/ynr4TQgB41hYBSEFpSn5QlX+slatL9nhFkFIYHiDC5zDz4cPPCBnw1Be5ZBXCvAu8G4H3QPHA1W3lx+rFNlHQQ/T0tz3B+7lX8EK7eWH+dUDQFkazDu40uRu0IsvSDrnRyMf2PJf4Cm2RVj30s9dn2wqW8cyFvBylsH97J15q47bg9G5qYu5OrIOTg1F5WmLL+HuFPVG8GY//KT7vxbbFLJUE9bVkEcxuuRMe9rPmlHYnJJzSgWQVIYHwKnhk9OzWt4Z5mxT8waiLvYfiUy1iNtf/F107AeN3KkrCYwNhSMLcwdGa9Fxvq/m7TDv1e5Q+c6/55yemP9bf5fTTBH/Zwo4WTJxwqNJ9UW4HngxuBxd2RcA/w4zQ+xdvrSmjtNvTzraSpVRVmsTjGkijJfWTCkijJbWTGkijJdDuOl3BhSRWmvVwxJ03XKacDbwPvB4j4acUrPY9nivxhg4nVGjrSgtF2pr/Y4jqIYkobTVxvIWk9jKHKaSlUapTSIKgypJEpJEJUYUimUUiCqMaQSb/TnR27wO+HX7cy0zdRFn8pv7ymBssvf7ddcdmfalikMaagXjw7jRe2nqVRDQzGNIQ0FZRAYknUUh/HCUDAkqygrQ8SQrKEMGkOygjIKDEk7yqgwJK0oo8SQtKGMGkPSglIxGpVGWfF3FFaMRqVQKkZLfaNUjCnqC2XZT0tYMaYoN0rFmKNcKBVjgbpGqRgd1BXKsp9lp2J00KIoFSND86JUjIyl7mZJTW6w2cK34FgvhfKcv/1nk59Z5xb/wdWK0UOp09ekpZ6mMrYnMeNEalmvR0b+3PdevTMB4m//3YlWJmMbRDcBT/qv6/sT+A34yE8m8N+sOqYC/gHt0wIb+yg2FgAAAABJRU5ErkJggg=="/></svg>'
            iconcontainer.style.backgroundColor = "#FCE148";
            iconcontainer.style.backgroundImage = "linear-gradient(to bottom left, #FCE148, #e7c504)"
            iconcontainer.appendChild(cautionicon);

            if(sitechip){
                statusdiv.innerHTML = "<b style='font-size: 14px'>Deep Scan Found Issues</b><div style = 'font-size: 10px;'>What does this mean?</div><div>Our Deep Scanner found indicators that this website may be a scam.  It has not yet been reviewed by our team of auditors, but you should be careful.</div>";
            }
        }
        else if(laststatus == "warning"){
            let warningicon = document.createElement("div");
            warningicon.id = "stdtf-site-chip-icon";
            warningicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
            warningicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'
            iconcontainer.style.backgroundColor = "#DD3333";
            iconcontainer.style.backgroundImage = "linear-gradient(to bottom left, #DD3333, #bf2020)"
            iconcontainer.appendChild(warningicon);

            if(sitechip){
                statusdiv.innerHTML = "<b style='font-size: 14px'>Scam!</b><div style = 'font-size: 10px;'>What does this mean?</div><div>This site was reviewed by our auditors and has been recorded as a scam.  You should leave this site!</div>";
            }
        }
        else if(laststatus == "userreported"){
            let reportedicon = document.createElement("div");
            reportedicon.id = "stdtf-site-chip-icon";
            reportedicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
            reportedicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'
            iconcontainer.style.backgroundColor = "#FCE148";
            iconcontainer.style.backgroundImage = "linear-gradient(to bottom left, #FCE148, #e7c504)"
            iconcontainer.appendChild(reportedicon);

            if(sitechip){
                statusdiv.innerHTML = "<b style='font-size: 14px'>User Reports Found</b><div style = 'font-size: 10px;'>What does this mean?</div><div>This website has been reported by users as potentially a scam.  Our team of Auditors has not yet reviewed these reports.</div>";
            }
        }
        else{
            let scanningicon = document.createElement("div");
            scanningicon.id = "stdtf-site-chip-icon";
            scanningicon.style = "width: 54px; height: 54px; margin-top: 50px; padding: unset; box-sizing: unset;"
            scanningicon.innerHTML = '<div class="flake flake-four"></div>'
            iconcontainer.appendChild(scanningicon);

            if(sitechip){
                statusdiv.innerHTML = "<b style='font-size: 14px'>Scanning Site</b><div style = 'font-size: 10px;'>What does this mean?</div><div>This website has been added to our Deep Scan queue and will be scanned for key indicators shortly.</div>";
            }
        }
    }
}

function fillVoteChip(){
    let iconcontainer = document.getElementById("stdtf-vote-chip-icon-container");
    let votechip = document.getElementById("stdtf-vote-chip");

    if(iconcontainer){
        let voteicon = document.createElement("div");
        voteicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
        voteicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'
        iconcontainer.appendChild(voteicon);

        if(votechip){
            let statusdiv = document.createElement("div");
            statusdiv.classList.add("stdtf-site-chip-status");
            statusdiv.innerHTML = "<b style='font-size: 16px'>Was this helpful?</b>";
            votechip.appendChild(statusdiv);

            let yesbutton = document.createElement("button");
            yesbutton.innerHTML = "Yes &#x1f44d;";
            yesbutton.style = "all: initial; background-color: rgb(160, 200, 135); border-radius: 7px; padding: 5px; width: calc(100% - 110px); font-size: 14px; margin-left: 10px; margin-right: 80px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
            yesbutton.onclick= function(){
                submitVote(1);
            }
            votechip.appendChild(yesbutton);

            let nobutton = document.createElement("button");
            nobutton.innerHTML = "No &#x1f44e;";
            nobutton.style = "all: initial; background-color: rgb(200, 135, 135); border-radius: 7px; padding: 5px; width: calc(100% - 110px); font-size: 14px; margin-left: 10px; margin-right: 80px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
            nobutton.onclick= function(){
                submitVote(-1);
            }
            votechip.appendChild(nobutton);

            function submitVote(vote){
                let reportdiv = document.createElement("div");
                reportdiv.textContent = "Thank you for your input, it helps improve our systems iin detecting scams!";
                reportdiv.classList.add("stdtf-site-chip-status");
                votechip.appendChild(reportdiv);

                vote(vote);

                yesbutton.remove();
                nobutton.remove();
            }
        }
    }
}

function fillShareChip(){
    let iconcontainer = document.getElementById("stdtf-share-chip-icon-container");
    let sharechip = document.getElementById("stdtf-share-chip");

    if(iconcontainer){
        let shareicon = document.createElement("div");
        shareicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
        shareicon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'
        iconcontainer.appendChild(shareicon);
    }

    if(sharechip){
        let headerdiv = document.createElement("div");
        headerdiv.classList.add("stdtf-site-chip-status");
        headerdiv.innerHTML = "<b style='font-size: 12px'>Share our links to help spread awareness!</b>";
        sharechip.appendChild(headerdiv);

        let buttondiv = document.createElement("div");
        buttondiv.style = "display: flex; margin-top: 5px; width: calc(100% - 80px);"
        sharechip.appendChild(buttondiv);

        let copylinkbutton = document.createElement("button");
        copylinkbutton.textContent = "📋";
        copylinkbutton.style = "all: initial; margin: auto; background-color: #D9D9D9; border-radius: 7px; padding: 10px; font-size: 40px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
        copylinkbutton.onclick= function(){
            copyFunction("https://scamtdtf.com/","Scam Takedown Task Force Website link copied to clipboard!");
        }
        buttondiv.appendChild(copylinkbutton);

        let facebookbutton = document.createElement("button");
        facebookbutton.innerHTML = '<svg style= "vertical-align: middle" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 14222 14222"><circle cx="7111" cy="7112" r="7111" fill="#1977f3"/><path d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z" fill="#fff"/></svg>';
        facebookbutton.style = "all: initial; margin: auto; background-color: #D9D9D9; border-radius: 7px; padding: 10px; height: 53px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
        facebookbutton.onclick= function(){
            copyFunction("https://www.facebook.com/STakedownTF","Scam Takedown Task Force Facebook link copied to clipboard!");
        }
        buttondiv.appendChild(facebookbutton);

        let youtubebutton = document.createElement("button");
        youtubebutton.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><path fill="#FF0000" d="M20,0.5L20,0.5c10.8,0,19.5,8.7,19.5,19.5l0,0c0,10.8-8.7,19.5-19.5,19.5l0,0C9.2,39.5,0.5,30.8,0.5,20l0,0 C0.5,9.2,9.2,0.5,20,0.5z"/> <path fill="#FFFFFF" d="M20,10.6c0,0-8.4,0-10.5,0.5c-1.1,0.3-2.1,1.2-2.4,2.4C6.5,15.6,6.5,20,6.5,20s0,4.4,0.5,6.5 c0.3,1.1,1.2,2.1,2.4,2.4c2.1,0.6,10.5,0.6,10.5,0.6s8.4,0,10.6-0.5c1.1-0.3,2.1-1.2,2.4-2.4c0.6-2.1,0.6-6.5,0.6-6.5s0-4.4-0.6-6.5 c-0.3-1.1-1.2-2.1-2.4-2.4C28.4,10.6,20,10.6,20,10.6z M17.3,16l7,4l-7,4V16L17.3,16z"/></svg>';
        youtubebutton.style = "all: initial; margin: auto; background-color: #D9D9D9; border-radius: 7px; padding: 10px; height: 53px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
        youtubebutton.onclick= function(){
            copyFunction("https://www.youtube.com/channel/UCa_flzcYuAfGSC9Oj9DQIPA","Scam Takedown Task Force Youtube link copied to clipboard!");
        }
        buttondiv.appendChild(youtubebutton);

        function copyFunction(url, message){
            if(navigator.clipboard){
                navigator.clipboard.writeText(url);
            } else{
                message = "Unable to copy link 🙁"
            }

            let copymessage = document.createElement("div");
            copymessage.classList.add("stdtf-site-chip-status");
            copymessage.style = "color: transparent; transition: 0.3s ease-in-out;";
            copymessage.textContent = message;
            sharechip.appendChild(copymessage);

            setTimeout(() => {
                copymessage.style.color = "#555"
            }, 50);

            setTimeout(() => {
                copymessage.style.color = "transparent";

                setTimeout(() => {
                    copymessage.remove();
                }, 400);
            }, 2000);
        }
    }
}

function fillNewsChip(){
    let iconcontainer = document.getElementById("stdtf-news-chip-icon-container");
    let newschip = document.getElementById("stdtf-news-chip");

    if(iconcontainer){
        let newsicon = document.createElement("div");
        newsicon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
        newsicon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABcCAYAAACV1WDTAAAFg0lEQVR4nO2dW4hWVRTHf41mahoTNZoM4ZRF1Kg9OEX1kNVDQWYRJUGEFPRSEfNSFEG3lx4iwh66EVF2eSkoyIhCqekCqdnFSuwmXcwizSJjsptjLNwTh+X5znfOPufMWd836wcH/Pz2/T9nn7XWPt/eh3CAXuBKYDaTl9+ANcCOpkZAxNgI7PeLncCcJkToAeYBpzVRuUH6gHObaJYIMc366EwwM5qodGrK/8lc+UgDbWmKC4FFTTciTYhfgVsbaEtTzLUgRE/TDXAO4EIYwYUwggthBBfCCC6EEVwII7gQRnAhDubOCoOfo8CXwCvALUB/VsUDKvPXDQ1AUzyR0v+6ItF/A6uAw3Vf/Y6YWA4FhoH1+u4oKsQQ8FUHrFtsAZYYFmQh8JqO9BaZmkY6aPHonZyDoqemqwsM6Isp9coAXwoMhoDiqcBK4P2UtPe7EOWFGEqp846M9FOAZ1X6f4H5MUJI5Z93gAifFpiaYoV4TOUbCcvOWcwEvlH57o4RohuJFeJ7le/8nPluVPnew62maPqV1bMHeD1nYc8FAcaRZ8gUFyKOY1Wuz8J8n4efgO2JdGLS9rkQcUxXuf4oWMqY+jzd/QgjFBXiPmBBB/TrFOABA+3IjU9NRigqxE3AFx3Qry0hptMxpL3XlMUm4KRO6mCn4FOTEVwII7gQRnAhjOBCGMGFMIILYQQXwgguhBFcCCO4EEaIEWIp8F2JtQIJGp7douyq1ju6fj2C8MqgXioswonAQy3SV7XeMSnWI9q9MuJEECPEcMlXbmRquq7Fd1Wtd3T9eoTwJnB8DW1hMq93uNVkBBfCCC6EEdyP6GAh3I+oAfcjjOB+hBHcjzCCW01GcCGMEDM11YkYAsuBk0vUIb892AysVb/MMU2MEOJHPF3ChJUtEa4F3kr57vbkj/tKIuXcZXr0E1jzIy4rUa5mRYVl1Y41P2KkwrLeqLCs2omZmobDT2KPi2xclh9xc/i+zB0nbAOeLFnGhGLNj5DdWx6sqWzTuPlqBBfCCO5HGMH9CCO4H2EE9yOM4H6EEdyPMIKbr0ZwIYxgzY+QnSFXVzD1bQ0m8taK2qXZrT7/UkWhRff0q/O9prUlytVXXqspZk+/nrCtqKT/M+LINL3b8oDcEXtVosPaFFKVH7Ew5Tu9M1gZ8h5j9ldEG8bCaV2LwyaLuwq2Ux85t7cnnLKVZFabQur0I24Le96VZUcwhfOwR6XpzZlvH/BhhAjCEYl/y16Au6YGk3E0sXH4rPDv0RaF1OlHvA0cAxwZWfY4+o8ri5/Vd30l627HNLVJ++7kHn8fqTlrqObGWOIi1fd1NbdtUNX3AQnzdaNKfIbpoauWzaq0JTVbk4vVZ5ne/hdivfpyeY0NscZ2Zeb2FtjVOIYLVJ5NyQ9HBeth/HaRB8gJ3TLSObhHTRcv1VTPjPBMGq9nLO1Z+4JqzDM1NcYi88MfX7L/59TQzhtUHe+mJTozKJRMeEnHDWk8T6m+f1uxBTUnmObJOq5plfh5lfB34KwaO2+J/tDfZP9lJ/ujK2jjtJSowbawL3gq/eG4+WQG8Seu6oqhbs/KlFCJLO2eXqLM2cCalHIvbpdRLIZ/UjK+nGJ6dSOrUvou4/Fw8vSTnCwNO+nr8h7PW8AVLcSQawNwfQWraFYRk/7RFn3fF86UW5ExZUlk4vJwtE6rYORB8bysuNGy8LZGVrhBbPBPQrxlZ8p2/J2MTFPzMtq/PxzzI7+C/TEcW7MgOISt5v514QUJHd9qy0Ai3OtX/CWm8b1ZD+e8LAvvIbkYxa9X88Tuioa0B8P8eF64BWeWVbgLkcH/OJirq8MJYG0ps7YggbFF4aE9N8RoJtsauPgdP4TQvazUycqlDLw8L/MD/Ac3Hbef6O58oQAAAABJRU5ErkJggg=="/></svg>'
        iconcontainer.appendChild(newsicon);
    }

    if(newschip){
        let loadingdiv = document.createElement("div");
        loadingdiv.classList.add("stdtf-site-chip-status");
        loadingdiv.style = "word-wrap: break-word;";
        loadingdiv.innerHTML = "<b style='font-size: 14px'>Loading Article...</b><div>Getting Latest Article from Scam Takedown Task Force</div>";
        newschip.appendChild(loadingdiv);

        fetch("https://scamtdtf.com:3000/api/getlatestarticle", { method: "POST" })
        .then (res => res.json())
        .then (res =>{
            let webdetails = res[0];

            loadingdiv.remove();

            let articlediv = document.createElement("div");
            articlediv.classList.add("stdtf-site-chip-status");
            articlediv.style = "word-wrap: break-word;";
            newschip.appendChild(articlediv);

            let articleheader = document.createElement("b");
            articleheader.style = "style='font-size: 14px'";
            articleheader.textContent = webdetails.title;
            articlediv.appendChild(articleheader);

            let articleDetails = document.createElement("div");
            articleDetails.textContent = webdetails.subtitle;
            articlediv.appendChild(articleDetails);
    
            let articlelink = document.createElement("a");
            articlelink.href = webdetails.url;
            articlelink.target = "_blank"
            articlelink.style = "all: initial; background-color: #D9D9D9; border-radius: 7px; padding: 5px; width: calc(100% - 110px); font-size: 14px; margin-left: 10px; margin-right: 80px; margin-top: 5px; font-size: 12px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
            articlelink.textContent = 'Read More';
            newschip.appendChild(articlelink);
        })
        .catch(err => {
            loadingdiv.remove();

            errordiv.classList.add("stdtf-site-chip-status");
            errordiv.style = "word-wrap: break-word;";
            errordiv.innerHTML = "<b style='font-size: 14px'>Couldn't Get Recent Article</b><div>Oops, looks like there is an issue getting our latest article.  We should have this fixed soon!</div>";
            newschip.appendChild(errordiv);
        });

    }
}

function fillSupportChip(){
    let iconcontainer = document.getElementById("stdtf-support-chip-icon-container");
    let supportchip = document.getElementById("stdtf-support-chip");

    if(iconcontainer){
        let supporticon = document.createElement("div");
        supporticon.style = "margin-top: 50px; padding: unset; box-sizing: unset;"
        supporticon.innerHTML = '<svg style="vertical-align: unset;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 60 60"><image x="4" width="54" height="54" xlink:href="data:img/png;base64,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"/></svg>'
        iconcontainer.appendChild(supporticon);
    }
    if(supportchip){
        let statusdiv = document.createElement("div");
        statusdiv.classList.add("stdtf-site-chip-status");
        statusdiv.innerHTML = "<b style='font-size: 14px'>Support Scam Takedown Task Force</b><div>We offer everything free and don't sell (or even collect) your personal information.  Our funding comes exclusively from your support.  If you would like to help continue the future development, consider supporting us.</div>";
        supportchip.appendChild(statusdiv);

        let kofilink = document.createElement("a");
        kofilink.href = "https://ko-fi.com/scamtdtf"
        kofilink.target = "_blank"
        kofilink.style = "all: initial; background-color: #D9D9D9; border-radius: 7px; padding: 5px; width: calc(100% - 110px); font-size: 14px; margin-left: 10px; margin-right: 80px; font-size: 12px; text-align: center; cursor: pointer; font-family: Avenir, Helvetica, Arial, sans-serif;"
        kofilink.textContent = 'Become a Member or Buy Us a Coffee';
        supportchip.appendChild(kofilink);
    }
}

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

addStyle(`
    .stdtf-chip {
        user-select: none;
        display: block;
        width : 360px;
        height : 160px;
        position: absolute;
        left: 10px;
        margin-bottom: 10px;
        text-align: center;
        border-radius: 13px;
        color : #000000;
        background-color: #FFFFFF;
        box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.2);
        font-size : 2em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
`);

addStyle(`
    .stdtf-chip-title {
        display: block;
        width : calc(100% - 80px);
        margin-top: 5px;
        text-align: right;
        color : #555;
        font-size : 16px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
`);

addStyle(`
    .stdtf-site-chip-status {
        width : calc(100% - 90px);
        margin-top: 5px;
        margin-left: 10px;
        text-align: left;
        color : #555;
        font-size : 12px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: unset;
    }
    .stdtf-site-chip-status b{
        font-weight: 600;
    }
`);

addStyle(`
    .stdtf-chip-icon-container {
        width : 70px;
        height : 160px;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        border-radius: 0 8px 8px 0;
        color : #000000;
        background-color: #F0F0F0;
        background-image: linear-gradient(to bottom left, #F0F0F0, #BBB);
        font-size : 2em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
`);

addStyle(`
    .stdtf-banner {
        all: initial;
        user-select: none;
        display: block;
        width : 100%;
        height : 400px;
        position: fixed;
        top: 0;
        z-index: 2147483500;
        text-align: center;
        margin: auto;
        padding : 10px;
        color : #000000;
        font-size : 2em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
`);
addStyle(`
    .warning-banner {
        background-color: #DD3333;
    }
`);

addStyle(`
    .caution-banner {
        background-color: #FCE148;
    }
`);

addStyle(`
    .reported-banner {
        background-color: #999;
    }
`);

addStyle(`
    .scanner-button{
        all: initial;
        width: 100px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
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
        z-index: 2147483601;
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
    .flake-four {
        width: 40px;
        height: 40px;
        border: 10px solid transparent;
        left:calc(50% - 30px);
        top: calc(50% - 30px);
        border-top-color: #ff2c2c;
        border-right-color: #ff2c2c;
        border-left-color: #ff2c2c;
        animation: counterspin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 3000ms;
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

browser.runtime.onMessage.addListener((request) => {
    if(document.getElementById("stdtf-sidebar")){
        destroySideBar();
    }else{
        if(document.getElementById("stdtf-scanner")) {
            destroyButton();
    
            setTimeout(() => {
                createSideBar()
            }, 350);
        } else{
            createSideBar();
        }
    }
});

checkSite();