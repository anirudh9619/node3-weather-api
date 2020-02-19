const path =require('path')
const express=require('express')
var bodyParser = require('body-parser')
const geocode=require('./geocode/geocode')
const weather=require('./weather/weather')
const hbs=require('hbs')
//const htm=require('./assets')
const app=express()
const port =process.env.PORT || 3000
const todos = [{
    "text": "Email back head office",
    "completed": true
  }, {
    "text": "Start training for 5K run",
    "completed": false 
  }, {
    "text": "Walk the dog",
    "completed": true
  }]
// console.log(path.join(__dirname,'assets/about'))
const assetDirectory=path.join(__dirname,'public')
const partialDirectory=path.join(__dirname,'views/partials')
app.set('view engine', 'hbs')
app.use(express.static(assetDirectory))
app.get('',(req,res)=>{
res.render('index',{
    'title':"Weather app",
    'name':"Anirudh",
    'lastName':"Gangwar"
})
})
hbs.registerPartials(partialDirectory)

app.get('/help',(req,res)=>{
    res.render('help',{
        'todo':todos,
        'name':'Anirudh'
    })
})
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/weather',urlencodedParser,(req,res)=>{
    console.log("body",req.body)
    if(req.body.twdata){
    geocode.latlong(req.body.twdata,(error,data)=>{
        if(data){
        weather.getWeather(data,(temp)=>{
            console.log("temp",temp)
            res.render('index',{
                'location':req.body.twdata,
                'temperature':temp
        })
        })
    } else{
        res.render('index',{
            'errormsg':"try another search or try after sometime"
    })
    }
    })  
} else{
    res.render('index',{
        'errormsg':"Pls provide some location in box",
    })
}
})
app.get('/weather',(req,res)=>{
    if(!req.query.twdata){
        req.query.twdata="bangalore"
    } 
    if(req.query.twdata){
        geocode.latlong(req.query.twdata,(error,data)=>{
            if(data){
            weather.getWeather(data,(temp)=>{
                console.log("temp",temp)
                if(req.query.twdata=='bangalore'){
                    res.render('index',{
                        'location':"developer's place",
                        'temperature':temp
                })  
                } else {
                res.send({
                    'location':req.query.twdata,
                    'temperature':temp
            })
        }
            })
        } else{
            res.send({
                'errormsg':"try another search or try after sometime"
        })
        }
        })  
    } else{
        res.send({
            'errormsg':"Pls provide some location in box",
        })
    }
   
})
// app.get('/weather',(req,res)=>{
//   res.send({
//       'location':"Kuiyan khera",
//       'body':"get temp body"
//   })
   
// })
app.get('/help/*',(req,res)=>{
    res.render('error',{
        'title':'Error on help'

    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        'title':"404 not found"
    })
})
app.listen(port,()=>{
    console.log("App Server started on ",port)
})