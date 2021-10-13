const html = document.URL;
let url = new URL(html).origin;

fetch("https://scamtdtf.com:3000/api/checksite", {
    method: "POST",
    headers : {
        siteurl : url
    }})
    .then( res => res.json())
    .then (res => {
        if(res.wasfound){
            let div = document.createElement("div");
            div.style = 'width : 100%; height : 200px; position: sticky; top: 0; z-index: 10000; background-color : #DD3333; text-align: center; padding : 10px; color : #000000; font-size : 2em;';
            div.innerHTML = "Warning!<br/>This website has been reported as a scam on Scam Takedown Task Force"
            document.body.insertBefore(div, document.body.firstChild);
            let button = document.createElement("button");
            button.style = "all: revert; display : block; margin: 10px auto; padding : 10px 50px;";
            button.innerHTML = "Close";
            button.onclick = function () {
                div.remove();
              };
            div.appendChild(button);
        }
});