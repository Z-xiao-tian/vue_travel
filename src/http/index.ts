/**
 * @author Z-xiao-tian
 * axios封装,添加所有接口所需的请求头，设置baseURL、、、
 */
import axios from "axios";

export default  axios.create({
    baseURL:"http://123.56.149.216:8080",
    headers:{
        "x-icode": "0092585BEAADFC1F"
    }
})