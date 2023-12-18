import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:5001/api/`,
});

axiosInstance.interceptors.request.use((confiq) => {
    const token = localStorage.getItem('access_token');

    token ? confiq.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    } : confiq.headers = {
        'Accept': 'application/json', 'Content-Type': 'application/json',
    }

    return confiq;
}, function (error) {

    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const ACCESS_TOKEN = localStorage.getItem("access_token");

    if (error?.response?.status === 401 && ACCESS_TOKEN) {
        window.location.href = "sign-out";
    }

    if (error?.response?.status === 404) {
        window.location.href = "404";
    }

    return Promise.reject(error);
});

export default axiosInstance;