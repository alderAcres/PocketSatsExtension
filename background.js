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


//THIS IS FOR POPUP MESSAGING
let extState = false;

let current_tab_id;

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    current_tab_id = tab.tabId;
  })
});


function pocketSat(tab) {
  if(tab === current_tab_id && extState){
  chrome.tabs.insertCSS(null, {file: './styles.css'})
  chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
  }
}

chrome.tabs.onUpdated.addListener(pocketSat);

chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {
  if (request.message == "turnOnExt") {
      extState = true;
      chrome.tabs.insertCSS(null, {file: './styles.css'})
      chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
      chrome.tabs.sendMessage(current_tab_id, 'append-child', () => console.log('sending message to append from background'));
    }
    if (request.message == "turnOffExt") {
      console.log('EXIT')
      extState = false;
    }
    })
