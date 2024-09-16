import {Fetchdata} from '../Services/weatherservice'
import search from '../Assets/search.png'
import temp from '../Assets/temperature.png'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../App'
import ThemeSet from './Theme'
const WeatherApp=()=>{
    const[theme,settheme]=useContext(ThemeContext)
    const[isError,seterror]=useState(false)
    const main=useRef()
    const error=useRef()
    useEffect(()=>{
        fetchcitydata("Tiruvannamalai")
        if(theme){
            main.current.style.background="linear-gradient(rgb(205, 63, 63),orange,rgb(221, 221, 30),rgb(205, 63, 63))"
            error.current.style.color="black"
        }else{
            main.current.style.background="linear-gradient(black,darkblue,black)"
            error.current.style.color="white"
        }
    },[theme])
   
   
    const searchcity=async(e)=>{
        //e.persist() // Keeps the event around bcoz while using async the event become nullified after the callback
        if(e.currentTarget.id==="citysearch" || e.key === "Enter" ){
        fetchcitydata(city)
        }
        
    }
    const fetchcitydata=async(city)=>{
        try{
        const response=await Fetchdata(city)
        console.log(response);
        setweather(response.data)
        setimg("https://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png")
        const timestamp = response?.data.dt;
    const timezoneOffset = response?.data.timezone;
    if (timestamp !== undefined && timezoneOffset !== undefined) {
        const date = new Date((timestamp + timezoneOffset) * 1000);
        const converted_date = date.toUTCString();
        const dateParts = converted_date.split(' ');
        const dateday = dateParts.slice(0, 4).join(' ');
        const time = dateParts[4];
const timeParts = time.split(':');
const hoursAndMinutes = timeParts.slice(0, 2).join(':');
const sunrise = new Date((response?.data.sys.sunrise+timezoneOffset) * 1000);
const converted_date1 = sunrise.toUTCString();
const dateParts1 = converted_date1.split(' ');
const time1 = dateParts1[4];
const timeParts1 = time1.split(':');
const hoursAndMinutes1 = timeParts1.slice(0, 2).join(':');
const sunset = new Date((response?.data.sys.sunset  + timezoneOffset) * 1000);
const converted_date2 = sunset.toUTCString();
const dateParts2 = converted_date2.split(' ');
const time2 = dateParts2[4];
const timeParts2= time2.split(':');
const hoursAndMinutes2 = timeParts2.slice(0, 2).join(':');
        setsun({sunrise:hoursAndMinutes1,sunset:hoursAndMinutes2})
        
    
    
    console.log(dateday.toLocaleString('en-US', { month: 'short', day: 'numeric' }));
        console.log(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
        
        setdatetime({ date: dateday, time: hoursAndMinutes });}
seterror(false)
    }
    catch(error){
        console.log(error);
        seterror(true)
    }
    }
    const[city,setcity]=useState('')
    const[image,setimg]=useState('')
    const[timedate,setdatetime]=useState({date:"",time:""})
    const[sun,setsun]=useState({sunrise:"",sunset:""})
    const[weather,setweather]=useState(
        {
            "coord": {
                "lon": -0.1257,
                "lat": 51.5085
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 15.03,
                "feels_like": 14.44,
                "temp_min": 13.21,
                "temp_max": 16.11,
                "pressure": 1014,
                "humidity": 71,
                "sea_level": 1014,
                "grnd_level": 1011
            },
            "visibility": 10000,
            "wind": {
                "speed": 0.89,
                "deg": 281,
                "gust": 1.79
            },
            "clouds": {
                "all": 100
            },
            "dt": 1725907764,
            "sys": {
                "type": 2,
                "id": 2075535,
                "country": "GB",
                "sunrise": 1725859588,
                "sunset": 1725906561
            },
            "timezone": 3600,
            "id": 2643743,
            "name": "London",
            "cod": 200
        })
    const handlechange=(e)=>{
setcity(e.target.value.toLocaleUpperCase())
    }
return<>
<div className="main" ref={main}>
<div className="searchpanel">
    <div className="mainsearch">
        <input type="text" className='inputfield' onChange={handlechange} value={city} onKeyUp={(e)=>searchcity(e)}/>
    <button className="searchicon" id="citysearch" onClick={(e)=>searchcity(e)}><img src={search} alt="search icon" /></button>
    </div>
    <ThemeSet></ThemeSet>
</div>
<h4 className='error' ref={error}>{isError?"No Result Found !":""}</h4>
<div className="card">
    <div className="cardtop">
    <div className="temphigh">
        <img src="https://cdn-icons-png.flaticon.com/256/16835/16835278.png" alt="" className='icon'/>
        <div>
        <h5>Min Temp</h5>
        <span className="hightemp">{weather?.main.temp_min}°C</span>
            </div>
    </div>
<div className='country'>
<span className='placename'>🌏{weather?.name},{weather?.sys.country}</span>
</div>
<div className="temphigh">
<div>
        <h5>Max Temp</h5>
        <span className="hightemp">{weather?.main.temp_max}°C</span>
            </div>
        <img src="https://cdn-icons-png.flaticon.com/256/9839/9839947.png" alt="" className='icon'/>
    </div>
    </div>
<div className="iconandtemp">
 <div className='spandiv'>
    <span className='temp'>{weather?.main.temp}°C</span>
 <img src={temp} alt="" className='icon'/>
 </div>
 <div className='icondiv'><img src={image} alt="weather icon" className='weathericon'/></div>
 </div>
  <div className="weatherdesc"><h3>{weather?.weather[0].description.toLocaleUpperCase()}</h3></div>
  <div className="timedate">
  <span className='margin'>{timedate.date}</span>
  <span className='margin'>{timedate?.time}</span>
  </div>
</div>
<div className="row1">
<div className="cloudiness">
<video autoPlay muted loop>
        <source src="https://videos.pexels.com/video-files/3129752/3129752-sd_640_360_30fps.mp4" type="video/mp4" />
      </video>
      <h3 className='cloudhead'>CLOUDINESS</h3>
      <h3 className='cloudhead' style={{marginTop:"10%",fontSize:"3rem",color:"skyblue"}}>{weather?.clouds.all} %</h3>
</div>
<div className="sun">
    <div className="sunrise"><h1>Sunrise</h1>
    <h3>{sun.sunrise} AM</h3></div>
    <div className="sunset"><h1>Sunset</h1>
    <h3>{sun.sunset} PM</h3></div>
</div>
<div className="extrafields">
    <div className='winddetails'>
        <h4>Wind</h4>
        <img src="https://cdn-icons-png.flaticon.com/128/545/545932.png" alt="" 
className='wind'/>
<span>{weather.wind.speed} m/s</span>
    </div>
    <div className='humiditydetails'>
    <h4>Humidity</h4>
    <img src="https://cdn-icons-png.flaticon.com/128/6142/6142706.png" alt="humidity" 
className='humidity'/>
<span>{weather.main.humidity} %</span>
    </div>
    <div className='pressuredetails'>
    <h4>Pressure</h4>
    <img src="https://cdn-icons-png.flaticon.com/128/12446/12446243.png" alt="" 
className='pressure'/>
<span>{weather.main.pressure} hPa</span>
    </div>
    <div className='groundleveldetails'>
    <h4>Ground Level</h4>

    <img src="https://cdn-icons-png.flaticon.com/128/4958/4958454.png" alt="" 
className='groundlevel'/>
<span>{weather.main.grnd_level} hPa</span>
    </div>
</div>
</div>
</div>
</>
}
export default WeatherApp