function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function openSettings() {
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {msg: "OpenSettings"});
    }); 
}

function openPermissionsOnInstall(){
    // browser.storage.sync.clear();

    browser.storage.sync.get("allowurls")
    .then(function(item){
        console.log(item);
        if(Object.keys(item).length < 1){
            browser.storage.sync.set({allowurls: false}, function() {
                openPermissions();
            });
        }
    }, function(error){
        console.log(error)
    });
}

function openPermissions(){
    browser.tabs.create({
        url: "pages/permissionpage.html"
    });
}

browser.runtime.onInstalled.addListener(openPermissionsOnInstall);

browser.runtime.onMessage.addListener(function(request) {
    if(request.type == "openpermissions"){
        openPermissions();
    }
    else if(request.type == "updatepermission"){
        browser.storage.sync.set({allowurls: request.message}, function() {});
    }
});

browser.browserAction.onClicked.addListener(() => {
    openSettings()
});