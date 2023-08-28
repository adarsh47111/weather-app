
const apiKey='56ca2ae0163c4b30e88bb3ac67cc1530';
const search_icon=document.querySelector(".search-icon")
const search_bar=document.querySelector(".search-bar")
const weather_icon=document.querySelector(".weather-icon")
const speech_icon=document.querySelector(".text-to-speech")
const temperature=document.querySelector(".temp")
const city_name=document.querySelector(".city-name")
const humidity=document.querySelector(".humidity .val")
const wind=document.querySelector(".wind .val")

const speech=window.speechSynthesis

const mic=document.querySelector(".microphone")
const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let recognising=false

updateWeather("New Delhi")

search_icon.addEventListener("click", ()=>{
    city=search_bar.value
    speech.cancel();
    updateWeather(city)
})

async function updateWeather(city)
{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    const data=await response.json();

    weather_icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    temperature.innerHTML=Math.round(data.main.temp)+"°C"
    city_name.innerHTML=data.name
    humidity.innerHTML=data.main.humidity+"%"
    wind.innerHTML=data.wind.speed+" km/h"
}

speech_icon.addEventListener("click", ()=>{
    if(speech.speaking==true)
    {
        speech.cancel()
    }
    else
    {
        const text=`Todays weather in ${city_name.innerHTML}:
            Temperature is ${temperature.innerHTML},
            Humidity is ${humidity.innerHTML},
            and wind speed is ${wind.innerHTML} `;
    
            speech.cancel();
            let utterence= new SpeechSynthesisUtterance();
            utterence.text=text;
            utterence.voice=window.speechSynthesis.getVoices()[0];
            speech.speak(utterence);
            console.log("hi")
    }
})

mic.addEventListener("click", ()=>{
    GetSpeech();
})

const GetSpeech = () => {
    if(recognising==true)
    {
        recognition.stop();
        mic.src="microphone_off.png"
        recognising=false
    }
    else
    {
        speech.cancel()
        recognition = new SpeechRecognition();
        recognition.onstart = () => {
                mic.src="microphone_on.gif"
                recognising=true
            }
        recognition.onspeechend = () => {
                recognition.stop();
                mic.src="microphone_off.png"
                recognising=false
            }
        recognition.onresult = (result) => {
                ct=result.results[0][0].transcript;
                search_bar.value=result.results[0][0].transcript.substring(0, ct.length-1)
                updateWeather(search_bar.value)
            }
        recognition.start();
    }
    
}
