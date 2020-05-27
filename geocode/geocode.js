const token="pk.eyJ1IjoiYW5pcnVkaC05NiIsImEiOiJjazZqNmdhZzUwNjYxM2xudmFsZ2tpaXY4In0.nBW6AVQkh5jaO0K6FnWLlw"
const request=require('request')
const latlong=(place,callback)=>{
    const placeEncode=encodeURI(place)
    console.log("hitting api")
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${placeEncode}.json?access_token=${token}&limit=1`
    request({'url':url,'json':true},(error,response,body)=>{
        if(error){
        console.log("Unable to connect location service! Try after some time.")  
        callback(error,undefined);
        } else if(!body.features[0]){
            console.log("unable to locate your given location, try another search") 
            callback("unable to locate your given location, try another search",undefined);
        } else{
           const ret=body.features[0].geometry.coordinates;
           callback(undefined,ret);
        }
    })
}

module.exports={
    'latlong':latlong
}