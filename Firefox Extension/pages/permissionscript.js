function saveSetting(){
  browser.runtime.sendMessage({ type : "updatepermission", message : true });
}