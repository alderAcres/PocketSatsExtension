let body = document.querySelector('body')

let myBtn = document.createElement('button')
body.appendChild(myBtn)
body.style.backgroundColor = 'red';
myBtn.id = 'myBtn';
myBtn.style.height = '3rem';
myBtn.style.width = '6rem';
myBtn.textContent = 'Enable';
myBtn.value = 'Disable';

body.style.height = '200px';
body.style.width = '200px';
let enabled = false;
myBtn.onclick = () => {
   if(myBtn.value === 'Disable'){
    chrome.extension.sendMessage({ message: "turnOnExt"});
    myBtn.textContent = 'Enable';
   } else if (myBtn.value === 'Enable'){
    chrome.extension.sendMessage({ message: "turnOffExt"});
    myBtn.textContent = 'Disable';
   }
    enabled = !enabled;
    myBtn.value = enabled ? 'Disable' : 'Enable';
    window.close();
};

