import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import NProgress from "nprogress"
// import { store } from "../redux/store.js"




// NProgress.configure({
//     showSpinner: false,
//     trickleSpeed: 30
// })

const instance = axios.create({
    baseURL: "https://json-server-frs-manager-user.vercel.app/",
    // baseURL: "https://5d55-2401-d800-2e51-2057-6cbc-5693-7d5f-6bc0.ap.ngrok.io",
    // baseURL: "http://localhost:8000",

});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // NProgress.start();
    // Do something before request is sent
    // const access_token = store?.getState()?.user?.account?.access_token
    // config.headers.common = { 'Authorization': `Bearer ${access_token} ` }


    return config;
}, function (error) {
    // NProgress.done();
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // NProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    // NProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance