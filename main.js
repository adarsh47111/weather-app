
const apiKey='56ca2ae0163c4b30e88bb3ac67cc1530';
const search_icon=document.querySelector(".search-icon")
const search_box=document.querySelector(".search-box")
const weather_icon=document.querySelector(".weather-icon")
const temperature=document.querySelector(".temp")
const city_name=document.querySelector(".city-name")
const humidity=document.querySelector(".humidity .val")
const wind=document.querySelector(".wind .val")

updateWeather("New Delhi")

search_icon.addEventListener("click", ()=>{
    city=search_box.value
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
