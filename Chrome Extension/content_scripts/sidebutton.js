//TODO: 10px status color on right side of button
//TODO: Add status icons for other statuses beyond scanning
//TODO: Cleaning up stylings and add classes instead
//TODO: Create side button pop out event for keyword warning indicators

function createButton(){
  let div = document.createElement("div");
  div.id = "stdtf-side-button"
  div.style = "all: initial; background-color: rgba(0,0,0,0.1); border-radius: 0 13px 0 0; user-select: none; width: 100px; height: 100px; position: fixed; top: 100px; left: -100px; z-index: 2147483501; transition: 0.3s all ease-in-out;"
  div.innerHTML = '<div class="flake flake-three"></div><div class="flake flake-one"></div><div class="flake flake-two"></div>'
  document.body.insertBefore(div, document.body.firstChild);
  
  setTimeout(function(){
      div.style.left = "0px";
  }, 100);

  let infodiv = document.createElement("div");
  infodiv.style = "all: initial; background-color: rgba(0,0,0,0.1); border-radius: 0 0 13px 0; user-select: none; width: 100px; height: 100px; position: absolute; bottom: -100px; left: 0; z-index: 2147483501; text-align: center; font-family: Avenir, Helvetica, Arial, sans-serif;"
  infodiv.textContent = "Scanning website"
  div.appendChild(infodiv);

  let clickoverlay = document.createElement("div");
  clickoverlay.classList.add("scanner-button")
  clickoverlay.onclick = function(){
      createSideBar();
      partialHideButton(div)
  }
  div.appendChild(clickoverlay);
}

function partialHideButton(){
  let div = document.getElementById("stdtf-side-button");
  if(div){
      div.style.left = "-90px";

      div.addEventListener("mouseover", function(){
        div.style.left = "0px";
      });

      div.addEventListener("mouseleave", function(){
        div.style.left = "-90px";
      });
  }
}

function destroyButton(){
  let div = document.getElementById("stdtf-side-button");
  if(div){
      div.style.left = "-100px";

      setTimeout(function(){
          div.remove();
      }, 350);
  }
}