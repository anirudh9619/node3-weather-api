console.log("testing for client js")
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weather=document.querySelector('form')
const search=document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#msg-2')
const name=document.querySelector('#name1')
name.textContent='@Temperature data placed by Anirudh Gangwar'

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    msgOne.textContent='Loading...'
    msgTwo.textContent=''
    
    if(loc){
    fetch(`http://localhost:3000/weather?twdata=${loc}`).then((response)=>{
    //  console.log(response)
    response.json().then((data)=>{
        msgOne.textContent="Location: "+data.location
        msgTwo.textContent="Temperature of provided location is "+data.temperature
        if(data.errormsg){
            msgOne.textContent=data.errormsg
        }
    })
})
.catch((err)=>{
    console.log("error:",err)
})
    } else{
        msgOne.textContent="Enter A location address"
    }
})