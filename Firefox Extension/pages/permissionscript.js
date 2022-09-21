let agreebutton = document.getElementById("agreebutton");
if(agreebutton) {
  agreebutton.addEventListener("click", function(){ saveSetting(true) });
}

let disagreebutton = document.getElementById("disagreebutton");
if(disagreebutton) {
  disagreebutton.addEventListener("click", function(){ saveSetting(false) });
}

let uninstallbutton = document.getElementById("uninstallbutton");
if(uninstallbutton) {
  function savePreference(){
    function onCanceled(error) {
      console.log(`Canceled: ${error}`);
    }
    
    let uninstalling = browser.management.uninstallSelf({
      showConfirmDialog: true
    });
    
    uninstalling.then(function(){
      removeButtons();
      var agreedtext = document.createElement('div');
      agreedtext.textContent = "Sorry to see you go, but still hope that you have a great rest of your day!<br/>You can close this tab now"
      document.body.appendChild(agreedtext);
    }, onCanceled);
  }

  uninstallbutton.addEventListener("click", savePreference);
}

function removeButtons(){
  let agreebutton = document.getElementById("agreebutton");
  let disagreebutton = document.getElementById("disagreebutton");
  let uninstallbutton = document.getElementById("uninstallbutton");

  if(agreebutton) agreebutton.remove();
  if(disagreebutton) disagreebutton.remove();
  if(uninstallbutton) uninstallbutton.remove();
}

function saveSetting(setting){
  console.log(setting)
  browser.runtime.sendMessage({ type : "updatepermission", message : setting });

  removeButtons();

  var agreedtext = document.createElement('div');
  agreedtext.textContent = "Your preferences have been saved."
  document.body.appendChild(agreedtext);
}