function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function openSettings() {
    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {msg: "OpenSettings"});
    }); 
}

browser.browserAction.onClicked.addListener(() => {
    openSettings()
});