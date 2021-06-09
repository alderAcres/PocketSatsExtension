let extState = false;

let current_tab_id;

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    current_tab_id = tab.tabId;
  })
});

function pocketSat(tab) {
  if(extState && (tab === current_tab_id)){
  chrome.tabs.insertCSS(null, {file: './styles.css'})
  chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log('foreground injected'))
  }
}

chrome.tabs.onUpdated.addListener(pocketSat);

chrome.extension.onMessage.addListener(
function (request) {
  if (request.message == "turnOnExt") {
      extState = true;
      chrome.tabs.insertCSS(null, {file: './styles.css'})
      chrome.tabs.executeScript(null, {file: './foreground.js'})
      chrome.tabs.sendMessage(current_tab_id, 'append-child');
    
    }
    else if (request.message == "turnOffExt") {
      chrome.tabs.sendMessage(current_tab_id, 'unappend-child');
      extState = false;
    }
    })
