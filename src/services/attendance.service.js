import axios from 'axios'

const springUrl = process.env.springUrl || 'http://localhost:8090/att'

async function handleAddAttendance(attendance){
    try {
        const response = await axios.post(`${springUrl}/add-att`, attendance);
        console.log("att service", response);
        return response;
      } catch (error) {
          console.log("att service", error);
          throw new Error(error);
      }
}
async function handleGetAttendanceByEmpId(eid){
    try {
        const response = await axios.get(`${springUrl}/get-att-by-id/${eid}`);
        console.log("att service", response);
        return response;
      } catch (error) {
          console.log("att service", error);
          throw new Error(error);
      }
}
async function handleUpdateEmpAttendance(eid,newAttendanceDetails){
    try {
        // const response = await axios.put(`http://localhost:8090/att/update-att/E00M9K5X`, newAttendanceDetails);
        const response = await axios.put(`${springUrl}/update-att/${eid}`, newAttendanceDetails);
        console.log("att service", response);
        return response;
      } catch (error) {
          console.log("att service", error);
          throw new Error(error);
      }
}



export default {
    handleAddAttendance,
    handleUpdateEmpAttendance,
    handleGetAttendanceByEmpId
}