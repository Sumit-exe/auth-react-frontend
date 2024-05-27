// sumit Shamra

import axios from 'axios'
const BASE_URL =  'http://localhost:8000'   

async function handleGetAllEmps(){
    try {
        const response = await axios.get(`${BASE_URL}/all-emps`);
        console.log("auth service", response.data);
        return response.data;
      } catch (error) {
          console.log("auth service", error);
          throw new Error(error);
      }
}
async function handleLogin(employee){
    try {
        const response = await axios.post(`${BASE_URL}/login`, employee);
        console.log("auth service", response.data);
        return response.data;
      } catch (error) {
          console.log("auth service", error);
          throw new Error(error);
      }
}
async function handleRegister(employee){
    try {
        const response = await axios.post(`${BASE_URL}/register`, employee);
        console.log("auth service", response.data);
        return response.data;
      } catch (error) {
          console.log("auth service", error);
          throw new Error(error);
      }
}
async function handleUpdate(updateEmployee,token){
    try {
        const response = await axios.put(`${BASE_URL}/update`, updateEmployee,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log("auth service", response.data);
        return response.data;
      } catch (error) {
          console.log("auth service", error);
          throw new Error(error);
      }
}


export default {
    handleLogin,
    handleRegister,
    handleUpdate,
    handleGetAllEmps
}