function getActiveTab() {
    return chrome.tabs.query({active: true, currentWindow: true});
}

function openSettings() {
    getActiveTab().then((tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "OpenSettings"});
    }); 
}

chrome.action.onClicked.addListener(() => {
    openSettings()
});