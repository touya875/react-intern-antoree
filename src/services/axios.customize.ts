import axios from "axios";

const createInstanceAxios = (baseURL: string) => {
    const instance = axios.create({
        // baseURL: import.meta.env.VITE_BACKEND_URL,
        baseURL: baseURL,
        withCredentials: true
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error && error.response && error.response.data) {
            return error.response.data;
        }
        return Promise.reject(error);
    });

    return instance;
}

export default createInstanceAxios;
