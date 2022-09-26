function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

/*** Chip Styles ***/

addStyle(`
  .stdtf-chip {
    user-select: none;
    display: block;
    width : 360px;
    height : 160px;
    position: absolute;
    left: 10px;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 13px;
    color : #000000;
    background-color: #FFFFFF;
    box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.2);
    font: unset;
    font-size : 2em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

addStyle(`
  .stdtf-chip-title {
    display: block;
    width : calc(100% - 80px);
    margin-top: 5px;
    text-align: right;
    color : #555;
    font-size : 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

addStyle(`
  .stdtf-site-chip-status {
    width : calc(100% - 90px);
    margin-top: 5px;
    margin-left: 10px;
    text-align: left;
    color : #555;
    font-size : 12px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: unset;
  }
  .stdtf-site-chip-status b{
    font-weight: 600;
  }
`);

addStyle(`
  .stdtf-chip-icon-container {
    width : 70px;
    height : 160px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    border-radius: 0 8px 8px 0;
    color : #000000;
    background-color: #F0F0F0;
    background-image: linear-gradient(to bottom left, #F0F0F0, #BBB);
    font-size : 2em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

/*** Sidebar Styles ***/

addStyle(`
  .stdtf-sidebar {
    all: initial;
    width: 380px;
    min-height: 100vh;
    position: fixed;
    top: 0px;
    left: -380px;
    overflow: auto;
    scrollbar-width: none;
    z-index: 2147483600;
    background-color: #F0F0F0;
    color : #000000;
    transition: 0.3s ease-in-out;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .stdtf-sidebar::-webkit-scrollbar { 
    display: none;
  }
`);

addStyle(`
  .stdtf-sidebar-chip-icon {
    vertical-align: top;
    height: 60px;
    width: 60px;
  }
`);

/*** Side Button Styles ***/

addStyle(`
  .stdtf-side-button-action{
    all: initial;
    width: 100px;
    height: 200px;
    position: absolute;
    z-index: 2147483610;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    border-radius: 0 13px 13px 0;
    background-color: rgba(0,0,0,0.5);
  }
  .stdtf-side-button-action:hover {
    background-color: rgba(130,130,130,0.3);
  }
`);
addStyle(`
  .stdtf-side-button {
    all: initial;
    background-color: rgba(255,255,255,0.3);
    user-select: none;
    width: 90px;
    height: 100px;
    position: fixed;
    top: 100px;
    left: -100px;
    z-index: 2147483501;
    transition: 0.3s all ease-in-out;
  }
`);

addStyle(`
  #stdtf-side-button-info {
    all: initial;
    background-color: rgba(255,255,255,0.3);
    user-select: none;
    width: 90px;
    font-size: 12px;
    height: 100px;
    position: absolute;
    bottom: -100px;
    left: 0;
    z-index: 2147483501;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

/*** Banner Styles ***/

addStyle(`
  .stdtf-banner {
    all: initial;
    user-select: none;
    display: block;
    width : 100%;
    height : 250px;
    position: fixed;
    top: 0;
    z-index: 2147483500;
    text-align: center;
    margin: auto;
    padding : 10px;
    color : #000000;
    font-size : 48px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

addStyle(`
  .stdtf-banner-sub {
    user-select: none;
    display: block;
    width: 80%
    text-align: center;
    margin: auto;
    color : #000000;
    font-size : 24px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

addStyle(`
  .stdtf-banner-button {
    all: initial;
    display : block;
    border-radius: 7px;
    margin: 10px auto;
    padding : 10px 50px;
    cursor: pointer;
    background-color: #D9D9D9;
    font-size: 24px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
`);

addStyle(`
  .stdtf-warning-banner {
    background-color: #DD3333;
  }
`);

addStyle(`
  .stdtf-caution-banner {
    background-color: #FCE148;
  }
`);

addStyle(`
  .stdtf-reported-banner {
    background-color: #999;
  }
`);

/*** Misc Styles ***/

addStyle(`
  .stdtf-flake {
    all: initial;
    position: absolute;
    border-radius: 50%;
    z-index: 2147483601;
  }
`);
addStyle(`
  .stdtf-flake-one {
    width: 46px;
    height: 46px;
    border: 10px solid transparent;
    left:calc(50% - 33px);
    top:calc(50% - 33px);
    border-top-color: #ff2c2c;
    border-right-color: #ff2c2c;
    border-left-color: #ff2c2c;
    animation: spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 1000ms;
  }
`);
addStyle(`
  .stdtf-flake-two {
    width: 40px;
    height: 40px;
    border: 10px solid transparent;
    left:calc(50% - 30px);
    top: calc(50% - 30px);
    border-top-color: black;
    animation: counterspin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 3000ms;
  }
`);
addStyle(`
  .stdtf-flake-three {
    width: 50px;
    height: 50px;
    border: 20px solid transparent;
    left:calc(50% - 45px);
    top: calc(50% - 45px);
    border-bottom-color: black;
    border-right-color: black;
    border-left-color: black;
    animation: counterspin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 10000ms;
  }
`);
addStyle(`
  .stdtf-flake-four {
    width: 40px;
    height: 40px;
    border: 10px solid transparent;
    left:calc(50% - 30px);
    top: calc(50% - 30px);
    border-top-color: #ff2c2c;
    border-right-color: #ff2c2c;
    border-left-color: #ff2c2c;
    animation: counterspin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 3000ms;
  }
`);

addStyle(`
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
`);

addStyle(`
  @keyframes counterspin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(-360deg);
    }
  }
`);