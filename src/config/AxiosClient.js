import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.VUE_APP_RUTA_API
    // baseURL: 'http://190.85.232.138/UMG/'
});

export default clientAxios;