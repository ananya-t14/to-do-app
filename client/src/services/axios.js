import axios from "axios"
import Cookies from "js-cookie"

const instance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
})

instance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken")
        if (token) {
            config.headers["Authorization"] = `${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance

