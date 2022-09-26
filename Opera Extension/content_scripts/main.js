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

chrome.runtime.onMessage.addListener((request) => {
  if(document.getElementById("stdtf-sidebar")){
      destroySideBar();
  }else{
      if(document.getElementById("stdtf-side-button")) {
          partialHideButton();
  
          setTimeout(() => {
              createSideBar()
          }, 350);
      } else{
          createSideBar();
      }
  }
});

checkSite();