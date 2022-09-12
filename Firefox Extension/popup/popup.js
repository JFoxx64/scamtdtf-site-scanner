function saveOptions() {
    browser.storage.sync.set({
        slideout: document.getElementById("slideout").checked
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        if(result) document.getElementById("slideout").checked = result.slideout;
        else {
            browser.storage.sync.set({ slideout: true });
            document.getElementById("slideout").checked = true;
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("slideout");
    getting.then(setCurrentChoice, onError);
}

setTimeout(function(){
    document.getElementById("slideout").addEventListener('input', function(){
        saveOptions();
    })
}, 100)


restoreOptions();