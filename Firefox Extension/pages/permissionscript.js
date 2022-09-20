function saveSetting(){
  browser.runtime.sendMessage({ type : "updatepermission", message : true });

  let button = document.getElementById("agreebutton");
  if(button) button.remove();

  var agreedtext = document.createElement('div');
  agreedtext.textContent = "Thank you!  You can close this page now."
  document.body.appendChild(agreedtext);
}

let button = document.getElementById("agreebutton");
if(button) {
  button.addEventListener("click", saveSetting);
}