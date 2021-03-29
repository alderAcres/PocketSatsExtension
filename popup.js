let body = document.querySelector('body')

let myBtn = document.createElement('button')

body.appendChild(myBtn)
myBtn.id = 'myBtn';
myBtn.style.height = '3rem';
myBtn.style.width = '6rem';
myBtn.type = 'button';
myBtn.innerText = 'Enable';
let enabled = false;

const checkEnabledStatus = () => {
if(enabled) myBtn.innerHTML = 'Disable';
else myBtn.innerHTML = 'Enable';
}

setInterval(checkEnabledStatus, 200);
myBtn.addEventListener('click', () => {
  if(myBtn.innerText == 'Enable'){
    chrome.extension.sendMessage({ message: "turnOnExt"});
    enabled = true;
    console.log('enable from popup')
    window.close()
  }
  else if(myBtn.innerText == 'Disable'){
    chrome.extension.sendMessage({ message: "turnOffExt"});
    enabled = false;
    console.log('Disable from popup')
    window.close()
  }
});

//if we get an enable button click..
//send message to enable to background js
//background js send a message to foreground
//and foreground appens container to body again
