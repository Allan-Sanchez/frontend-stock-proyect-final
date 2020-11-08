import clientAxios from './AxiosClient';


const authToken = (token) =>{
    if(token){
        clientAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete clientAxios.defaults.headers.common['Authorization'];
    }
}

export default authToken;