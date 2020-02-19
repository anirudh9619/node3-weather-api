const request=require('request')
const getWeather=(ret,callback)=>{
console.log(ret)
            const urlW=`https://api.darksky.net/forecast/b4a78172f3d5a2a1b8252369c69b5030/${ret[1]},${ret[0]}`;
             
            request({"url":urlW,"json":true},(error,res,body)=>{
                if(error){
                    console.log("Unable to connect weather api",error.code)
                } else{
                    console.log("response",res.statusCode)
                   const temp= (body.currently.temperature-32)*5/9
            
                   callback(temp)
                }
            })
        }
    module.exports={
        'getWeather':getWeather
    }    