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
  fetch(`http://localhost:3000/weather?addr=${location}`).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        //console.log(data.error);
          messageOne.textContent = data.error
      }
      else {
        //console.log(data.address);
        //console.log(data.temperature);
        //console.log(data.apparentTemperature);
        messageOne.textContent = 'Address: '+data.address;
        messageTwo.textContent = 'Actual temperature is '+data.temperature;
        messageThree.textContent = 'It feels like '+data.apparentTemperature;
      }
    })
  })

})
