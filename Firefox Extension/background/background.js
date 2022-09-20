function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function openSettings() {
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {msg: "OpenSettings"});
    }); 
}

function openPermissions(){
    browser.storage.sync.clear()
    browser.storage.sync.set({allowurls: false}, function() {
        browser.tabs.create({
            url: "pages/permissionpage.html"
        });
    });
}

browser.runtime.onInstalled.addListener(openPermissions);

browser.runtime.onMessage.addListener(function(request) {
    if(request.type = "openpermissions"){
        openPermissions();
    }
    else if(request.type = "updatepermission"){
        browser.storage.sync.set({allowurls: request.message}, function() {
            getActiveTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {msg: "UpdatePermissions"});
            }); 
        });
    }
});

browser.browserAction.onClicked.addListener(() => {
    openSettings()
});