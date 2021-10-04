let linknodes = document.querySelectorAll("[data-jsarwt]");

let filter = [];

for(let i = 0; i < linknodes.length; i++){
    let href = linknodes[i].href

    if(!href.includes('google') && !href.includes('preferences?') && !href.includes('setprefs?') ) {
        filter.push(linknodes[i]);
        continue;
    };
}

for(let i = 0; i < filter.length; i++){
  const html = sanitizeGoogle(escapeHTML(filter[i].href));
  const sourcehtml = escapeHTML(document.URL);
  let url = new URL(html).origin;
  
  fetch("http://scamtdtf.com:3000/api/checksite", {
    method: "POST",
    headers : {
      siteurl : html
    }})
    .then( res => res.json())
    .then (res => {
      if(res.wasfound){
        let div = document.createElement("div");
        div.style = 'width : 50%; background-color : #DDDDDD; border-radius: 13px; padding : 10px; color : #993333';
        div.innerHTML = "This website has been reported as a scam on Scam Takedown Task Force"
        filter[i].parentElement.appendChild(div);
        filter[i].reported = true;
      }
    });
}

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  
  function sanitizeFB(str){
    var linkurl = str;
  
    if(str.includes('l.facebook.com')){
      linkurl = decodeURIComponent(str.split('u=')[1].split('%3Futm_source')[0]);
      
      if(linkurl.includes('fbclid')){
        linkurl = linkurl.split('?fbclid')[0];
      }
    }
    else if(str.includes('?')){
      linkurl = decodeURIComponent(str.split('?')[0]);
    }
  
    return linkurl;
  }
  
  function sanitizeGoogle(str){
    var linkurl = str;
  
    if(str.includes('https://www.google.com')){
      linkurl = decodeURIComponent(str.split("https://www.google.com")[1].split('url=')[1]);
    }
    else if(str.includes('?')){
      linkurl = decodeURIComponent(str.split('?')[0]);
    }
  
    return linkurl;
  }