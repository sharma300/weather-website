console.log('client side js file is here');




const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
//messageOne.textContent = "jsdhksj";


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location=address.value;
  messageOne.textContent = "";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageOne.textContent = "Loading....";
  fetch(`/weather?addr=${location}`).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        //console.log(data.error);
          messageOne.textContent = data.error
      }
      else {
        //console.log(data.address);
        //console.log(data.dayMax);
        //console.log(data.dayMin);
        messageOne.textContent = 'Address: '+data.address;
        messageTwo.textContent = 'Actual temperature is '+data.temperature + '. It feels like '+data.apparentTemperature + '. ';
        messageThree.textContent = 'Today\'s Maximum temprature  is '+ data.dayMax+ ' and minimum is '+data.dayMin + '.';
      }
    })
  })

})
