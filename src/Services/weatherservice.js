import {MakeAxiosCall} from '../Client/clientcall'

export const Fetchdata=async(city)=>{
const response=await MakeAxiosCall("https://api.openweathermap.org/data/2.5/weather?q="+city+"+&appid=f64e8c9a2a3c40a7ff0756dd2cf6ab94&units=metric"
    ,"get"
)
return response
}

export const Fetchiconid=async(iconid)=>{
    const response=await MakeAxiosCall("https://openweathermap.org/img/wn/"+iconid+"@2x.png"
        ,"get"
    )
    return response
    }