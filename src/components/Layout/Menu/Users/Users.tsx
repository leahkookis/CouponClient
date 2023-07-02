import { useDispatch, useSelector } from "react-redux";
import IUserData from "../../../../models/IUserData";
import { AppState } from "../../../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../../redux/action-types";
import User from "./User/User";

function Users() {
    const userArray: IUserData[]= useSelector((state: AppState)=> state.users)
    let[pageNumber, setPageNumber]  = useState(1);
    let dispatch = useDispatch();
    useEffect(()=> {
       getAllUsers(pageNumber)
   }, [pageNumber]);

async function getAllUsers(pageNumber:number) {
    try {
           
        let url= await axios.get(`http://localhost:8080/users?page=${pageNumber}`);
        let response = url.data;
        dispatch({type: ActionType.GetUsers, payload: {response}})

    } catch (error) {
        alert("something went wrong");
        
    }
    
}
    return (
        <div className="users">
        <table>
          <tr>
            <th>User name</th>
            <th>User Type</th>
            <th>Company</th>
            <th>Edit</th>
          </tr>
          {userArray.map((user) => (
            <User id={user.id} userName={user.userName} userType={user.userType} companyId={user.companyId} companyName={user.companyName}/>
          ))}
        </table>
      </div>   );
}
export default Users;