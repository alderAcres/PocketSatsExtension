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

const instructions = document.createElement('div')
const instructionsP = document.createElement('p')
instructionsP.innerText = 'Highlight price with cursor to begin.'
instructions.id = 'instructions'
instructionsP.id = 'instructionsP'

body.appendChild(container);
container.appendChild(divBox1);
container.appendChild(divBox2);
instructions.appendChild(instructionsP)
container.appendChild(instructions)

divBox1.appendChild(header);
divBox1.appendChild(exit);
divBox2.appendChild(input);
divBox2.appendChild(satPriceBtn);

document.getElementById('first').addEventListener('click', handler)

function handler(){
  // let xhr = new XMLHttpRequest();
  const KEY = '008150ff-e99d-4cb4-93c0-27b6b7d4d02f';
     fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc. 
      mode: 'no-cors',
      headers: {
        'X-CMC_PRO_API_KEY': KEY,
      },
     })
    .then(response => {
      response.json()
    })
    .then(resp => {
      console.log('resp', resp)
      console.log('DEBUG :: resp', resp.data[0].quote.USD.price)
      const satToBitcoin = Number(resp.data[0].quote.USD.price);
      let valInput = document.getElementById('input').value;
      if(valInput.toString()[0] === '$') {
        valInput = parseFloat(valInput.toString().replace(/\$|,/g, ''))
        valInput = Number(valInput);
      }
      const calc = valInput/ (satToBitcoin / 100000000)

      displayValue = `${calc.toFixed(2)} sats`

      document.getElementById('input').value = displayValue;
    })
    .catch(err => {
      console.log('ERROR', err)
    })
  
}
//   xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest");
//   xhr.setRequestHeader('X-CMC_PRO_API_KEY', KEY);
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState) {
//     // JSON.parse does not evaluate the attacker's scripts.
//     const resp = JSON.parse(xhr.responseText);
//     console.log('DEBUG :: resp', resp.data[0].quote.USD.price)
//     const satToBitcoin = Number(resp.data[0].quote.USD.price);
//     let valInput = document.getElementById('input').value;
//     if(valInput.toString()[0] === '$') {
//       valInput = parseFloat(valInput.toString().replace(/\$|,/g, ''))
//       valInput = Number(valInput);
//     }
//     const calc = valInput/ (satToBitcoin / 100000000)

//     displayValue = `${calc.toFixed(2)} sats`

//    document.getElementById('input').value = displayValue;
//    //take price of input --> divide by price of bitcoin/100,000,000 
//   } 
// }
//     xhr.send(null);



chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
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