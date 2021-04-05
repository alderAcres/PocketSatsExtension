let displayValue;
let extState = true;

const satPriceBtn = document.createElement('button')
satPriceBtn.innerText = 'PRICE IN SATS'
satPriceBtn.id = "first";

const input = document.createElement('input')
input.type = "text";
input.id = 'input';

const header = document.createElement('p')
header.innerText = 'PocketSats';
header.id = 'header'

const container = document.createElement('div')
container.id = 'container';

const divBox1 = document.createElement('div');
divBox1.id = 'divBox1';

const divBox2 = document.createElement('div');
divBox2.id = 'divBox2';

const exit = document.createElement('div');
exit.id = 'exit';
exit.textContent = 'X';

const body = document.querySelector('body');

body.appendChild(container);
container.appendChild(divBox1);
container.appendChild(divBox2);

divBox1.appendChild(header);
divBox2.appendChild(input);
divBox2.appendChild(satPriceBtn);
divBox1.appendChild(exit);



// input.addEventListener('click', () => {
//   console.log(input.value)
//   handler()
//   console.log(input.value)
// })

document.getElementById('first').addEventListener('click', handler)
//send input to backend
//have backend fetch sat price adn convert to usd
//send back in repsonse
function handler(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/data", true);
  xhr.setRequestHeader("Content-Type", "application/json");;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    const resp = JSON.parse(xhr.responseText);
    const satToBitcoin = Number(resp.currentPrice);
    let valInput = document.getElementById('input').value;
    if(valInput.toString()[0] === '$') {
      valInput = parseFloat(valInput.toString().replace(/\$|,/g, ''))
      valInput = Number(valInput);
    }

    const calc = valInput/ (satToBitcoin / 100000000)

    displayValue = `${calc.toFixed(2)} sats`

   document.getElementById('input').value = displayValue;
   //take price of input --> divide by price of bitcoin/100,000,000 
  }
}
    xhr.send(null);
}


chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  console.log(req)
if(req === 'append-child' && !extState){
  extState = true;
  document.querySelector('body').appendChild(container);
  console.log('appending')
}
else if(req === 'unappend-child' && extState){
  extState = false;
  document.querySelector('body').removeChild(container);
  console.log('unappending')
}
})


//dragging container functionality/ movement within window
dragElement(document.getElementById("container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("divBox1")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("divBox1").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    document.onmouseup = gText;
  }
}

// //getting highlighted input into input field
function gText(e) {
  displayValue = (document.all) ? document.selection.createRange().text : document.getSelection();
  document.getElementById('input').value = displayValue 
}

document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);



//listener events for keydown functionality
document.addEventListener('keydown', function (event) {
  // CTRL + S combo to START
  if (event.ctrlKey && event.key === 's' && !extState) {
    extState = true;
    document.querySelector('body').appendChild(container);
    chrome.extension.sendMessage({ message: "turnOnExt"});
  }
  // CTRL + E combo to EXIT
  if (event.ctrlKey && event.key === 'e' && extState) {
    extState = false;
    document.querySelector('body').removeChild(container);
    chrome.extension.sendMessage({ message: "turnOffExt"});
  }
});

exit.onclick = () => {
  extState = false;
  document.querySelector('body').removeChild(container);
  chrome.extension.sendMessage({ message: "turnOffExt"});
};