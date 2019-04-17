const path = require('path')
const express = require('express')
const hbs = require('hbs')

var geocode = require('./geocode/geocode.js');
var weather = require('./weather/weather.js')

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));
//console.log(__filename);

const app = express()
const port = process.env.PORT || 3000

//defining express config
const publicDir = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handle bars engine and views
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir))

app.get('/',(req , res) => {
  res.render('index',{
    title:'Home',
    name:'Randhir',
    message:'click the image to download'
  });
});

app.get('/help', (req , res) =>{
  res.render('help',{
    title: 'Help',
    name: 'Randhir',
    message: 'The page is under construction'
  })
});

app.get('/about', (req , res) =>{
  res.render('about',{
    title: 'About',
    name: 'Randhir',
    appName: 'Weather App'
  })
});

app.get('/weather',(req, res)=>{
  if (!req.query.addr) {
    return res.send({error : "Adrres must be entered"})
  }

  geocode.geocodeAddress(req.query.addr, (errorMessageG, results) => {
    if(errorMessageG){
      return res.send({error: errorMessageG})
    }
    //console.log(JSON.stringify(results.address, undefined, 2));
      weather.weatherInfo(results.lat,results.lng, (errorMessageW, weatherResults)=> {
        if (errorMessageW) {
          //console.log(errorMessage);
          res.send({error:errorMessageW})
        } else {
          //console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
          //console.log(weatherResults);
          res.send({
            address: results.address,
            temperature : weatherResults.temperature,
            apparentTemperature : weatherResults.apparentTemperature,
            dayMax: weatherResults.dayMax,
            dayMin: weatherResults.dayMin
          })
        }
      });
    });
});






    //res.send({
    //  message: 'Success',
    //  address: req.query.addr
  //  });
//});


app.get('/products',(req , res)=>{
  if(!req.query.search){
    return res.send("Error: enter search query");
  }
  res.send({
    products:[]
  })
})



app.get('/help/*', (req, res)=>{
  res.render('404',{
    title: '404',
    name: 'Randhir',
    message: 'Help content not found'
  })
})

app.get('*' , (req , res)=>{
  res.render('404',{
    title : '404',
    name : 'Randhir',
    message : 'Page not found'
  })
});

app.listen(port, () => {
  console.log('server is up on '+ port);
});
