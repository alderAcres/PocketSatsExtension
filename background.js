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

function pocketSat(tab) {
  if(isExtensionOn && tab === current_tab_id){
  chrome.tabs.insertCSS(null, {file: './styles.css'})
  chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
  }
}

chrome.tabs.onUpdated.addListener(pocketSat);


let isExtensionOn = false;

chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {
  if (request.message == "turnOnExt") {
      isExtensionOn = true;
      chrome.tabs.insertCSS(null, {file: './styles.css'})
      chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
    }
    chrome.tabs.sendMessage(current_tab_id, 'append-child', () => console.log('sending message to append from background'));
    })
