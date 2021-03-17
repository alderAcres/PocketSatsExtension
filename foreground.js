
const satPriceBtn = document.createElement('button')
satPriceBtn.innerText = 'PRICE IN SATS'
satPriceBtn.id = "first"

const input = document.createElement('input')
input.type = "text";
input.id = 'input';

const header = document.createElement('p')
header.innerText = 'PocketSats';
header.style.float = top;
header.id = 'header'

const container = document.createElement('div')
container.id = 'container';

const divBox1 = document.createElement('div');
divBox1.id = 'divBox1';

const divBox2 = document.createElement('div');
divBox2.id = 'divBox2';

document.querySelector('body').appendChild(container);
container.appendChild(divBox1);
container.appendChild(divBox2);

divBox1.appendChild(header);

divBox2.appendChild(input);
divBox2.appendChild(satPriceBtn);


//send input to backend
//have backend fetch sat price adn convert to usd
//send back in repsonse
satPriceBtn.addEventListener('click', () => {

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/data", true);
  xhr.setRequestHeader("Content-Type", "application/json");;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    resp = JSON.parse(xhr.responseText);

    let satToBitcoin = Number(resp.currentPrice)
    const valInput = document.getElementById('input').value;
    const calc = valInput/ (satToBitcoin / 100000000)
   

   document.getElementById('input').value = `${calc.toFixed(2)} sats`;
   //take price of input --> divide by price of bitcoin/100,000,000 
  }
}
    xhr.send();


})

// chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
//   console.log('RECEIVED MESSAGE FRO BACKEND!', req)
// })



function gText(e) {
  let t = (document.all) ? document.selection.createRange().text : document.getSelection();
  document.getElementById('input').value = t;
}

document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);
