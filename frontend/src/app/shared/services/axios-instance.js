import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:5001/api/`,
});

axiosInstance.interceptors.request.use((confiq) => {
    token ? confiq.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    } : confiq.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    return confiq;
}, function (error) {

    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;