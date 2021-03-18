let body = document.querySelector('body')

let myBtn = document.createElement('button')
body.appendChild(myBtn)
myBtn.id = 'myBtn';
myBtn.style.height = '3rem';
myBtn.style.width = '6rem';
myBtn.textContent = 'Enable';
myBtn.value = 'Disable';

body.style.height = '200px';
body.style.width = '200px';

let enabled = false;

myBtn.onclick = () => {
    chrome.extension.sendMessage({ message: "turnOnExt"});
  
    enabled = !enabled;
    myBtn.value = enabled ? 'Disable' : 'Enable';
    window.close();
};

//if we get an enable button click..
//send message to enable to background js
//background js send a message to foreground
//and foreground appens container to body again
