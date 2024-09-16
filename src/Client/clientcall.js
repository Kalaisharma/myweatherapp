import axios from 'axios'
export const MakeAxiosCall=async(url,method,payload=null)=>{
const config={
    url:url,
    method:method,
    data:payload
}
const response=await axios(config)
return response
}