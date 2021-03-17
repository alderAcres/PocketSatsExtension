// let current_tab_id;
// chrome.tabs.onActivated.addListener(tab => {
//   chrome.tabs.get(tab.tabId, current_tab_info => {
//     current_tab_id = tab.tabId;
//     if(/^https:\/\/www\.amazon/.test(current_tab_info.url)){
//       chrome.tabs.insertCSS(null, {file: './styles.css'})
//      chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
//     }
//   })
// });

// function pocketSat() {
//   chrome.tabs.insertCSS(null, {file: './styles.css'})
//   chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
// }



// chrome.tabs.onUpdated.addListener(pocketSat);


//THIS IS FOR POPUP MESSAGING

let current_tab_id;

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    current_tab_id = tab.tabId;
  })
});

function pocketSat() {
  if(isExtensionOn){
  chrome.tabs.insertCSS(null, {file: './styles.css'})
  chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
  }
}

chrome.tabs.onUpdated.addListener(pocketSat);


let isExtensionOn = false;

chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {
  console.log(request.message)
    if (request.message == "turnOffExt") {
        isExtensionOn = false;
        chrome.tabs.insertCSS(null, {file: './stylesOff.css'}, () => {
         console.log('styles OFF')
        })
    }
    else if (request.message == "turnOnExt") {
      isExtensionOn = true;
  
      chrome.tabs.insertCSS(null, {file: './styles.css'})
      chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))

    }
    })
