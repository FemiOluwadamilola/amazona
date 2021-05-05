import axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';

export const getProduct = async (id) => {
  try{
    const res = await axios({
      url:`${apiUrl}/api/products/${id}`,
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }    
    }); 
    
    if(res.statusText !== 'OK'){
      throw new Error(res.data.message);
    }
      return res.data;
  }catch(err){
    console.log(err);
    return {error:err.response.data.message || err.message}
  }
}

export const signin = async ({email,password}) => {
  try{
    const res = await axios({
      url:`${apiUrl}/api/user/signin`,
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        email,
        password
      }
    });

    if(res.statusText !== 'OK'){
      throw new Error(res.data.message);
    }
      return res.data;
      
  }catch(err){
    console.log(err);
    return {error:err.response.data.message || err.message}
  }
}

export const register = async ({name,email,password}) => {
  try{
    const res = await axios({
      url:`${apiUrl}/api/user/register`,
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        name,
        email,
        password
      }
    });

    if(res.statusText !== 'OK'){
      throw new Error(res.data.message);
    }
      return res.data;
      
  }catch(err){
    console.log(err);
    return {error:err.response.data.message || err.message}
  }
}

export const update= async ({name,email,password}) => {
  try{
    const {_id, token} = getUserInfo();
    const res = await axios({
      url:`${apiUrl}/api/user/${_id}`,
      method:'PUT',
      header:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      data:{
        name,
        email,
        password
      }
    });

    if(res.statusText !== 'OK'){
      throw new Error(res.data.message);
    }
      return res.data;
      
  }catch(err){
    console.log(err);
    return {error:err.response.data.message || err.message}
  }
}
