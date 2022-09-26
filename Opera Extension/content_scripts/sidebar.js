function createSideBar(){
  destroySideBar();

  let div = document.createElement("div");
  div.id = "stdtf-sidebar";
  div.classList.add("stdtf-sidebar");
  document.body.insertBefore(div, document.body.firstChild);

  let headerbar = document.createElement("div");
  headerbar.style = "width: 380px; height: 50px; position: sticky; top: 0px; left: 0px; background-color: #F0F0F0; z-index: 2147483700;";
  headerbar.innerHTML = "<div style='margin: 5px 0 0 10px;'>Scam Takedown Task Force</div><div style='margin: 5px 0 0 10px;'>Site Scanner</div>";
  div.appendChild(headerbar);

  let closebutton = document.createElement("div");
  closebutton.style = "position: absolute; top: 8px; right: 10px; cursor: pointer; border: solid 1px #CCC; border-radius: 3px; padding: 4px;"
  closebutton.innerHTML = "&#x2715;"
  closebutton.onclick = function(){
      destroySideBar();
  }
  headerbar.appendChild(closebutton);

  setTimeout(function(){
      div.style.left = "0px";
  }, 100);

  div.appendChild(createChip("stdtf-site-chip", 0, "Site Check"));
  if(warningkey) {
    div.appendChild(createChip("stdtf-info-chip", 1, "Learn More"));
    div.appendChild(createChip("stdtf-vote-chip", 2, "Feedback"));
    div.appendChild(createChip("stdtf-share-chip", 3, "Share"));
    div.appendChild(createChip("stdtf-news-chip", 4, "News"));
    div.appendChild(createChip("stdtf-support-chip", 5, "Support"));
  }
  else {
    div.appendChild(createChip("stdtf-vote-chip", 1, "Feedback"));
    div.appendChild(createChip("stdtf-share-chip", 2, "Share"));
    div.appendChild(createChip("stdtf-news-chip", 3, "News"));
    div.appendChild(createChip("stdtf-support-chip", 4, "Support"));
  }

  fillAllChips();
}

function destroySideBar(){
  let div = document.getElementById("stdtf-sidebar")
  if(div){
      div.style.left = "-380px";

      setTimeout(function(){
          div.remove();
      }, 350);
  }
}