function destroyAllBanners(){
  let div = document.getElementById("stdtf-banner")
  if(div) div.remove();
}

function createBanner(status, bannerclass, header, message){
  if(status == "clear" || status == "queue") return;

  destroyAllBanners();

  let div = document.createElement("div");
  div.id = "stdtf-banner";
  div.classList.add("stdtf-banner", bannerclass)
  div.textContent = header
  document.body.insertBefore(div, document.body.firstChild);

  let messagediv = document.createElement("div");
  messagediv.classList.add("stdtf-banner-sub");
  messagediv.textContent = message
  div.append(messagediv);

  let button = document.createElement("button");
  button.classList.add("stdtf-banner-button");
  button.textContent = "Close";
  button.onclick = function () {
      div.remove();
      bannerclosed = true;
  };
  div.appendChild(button);

  let sidebarbutton = document.createElement("button");
  sidebarbutton.classList.add("stdtf-banner-button");
  sidebarbutton.textContent = "See More Details";
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