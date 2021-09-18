const path = require('path');
const express=require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app=express();

// define path for express config
const viewPath = path.join(__dirname, '../views')
const partialviewPath = path.join(__dirname, '../views/partials')

app.set('view engine' , 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialviewPath)

app.use(express.static(path.join(__dirname , '../public')));

app.get('/', ( req , res ) => {
    res.render('index', {
        title: 'Weather App'
    });
})

app.get('/about' , ( req , res )=> {
    res.render('about', {
        title : "About",
        name : 'Abhishek Kumar'
    });
})

app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }
    geocode(req.query.address , (error , {lat , lon , location}={}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat,lon,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location , forecast : forecastdata , address : req.query.address
            })
        })
    })

})

app.get('*' , (req,res)=>{
    res.render('404', {
        title : "404"
    })
})

app.listen(5050, () => {
    console.log("Server is up on port 5050");
})