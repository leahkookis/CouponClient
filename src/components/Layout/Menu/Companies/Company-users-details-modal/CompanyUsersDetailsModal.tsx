import axios from "axios";
import { useState, useEffect } from "react";


import ICompanyData from "../../../../../models/ICompanyData";
import IUserData from "../../../../../models/IUserData";



interface ICompanyUsersDetailsModal {
  companyId: number;
  closeModel(): void;
};

function CompanyUsersDetailsModal(props: ICompanyUsersDetailsModal) {
  let companyUsers: IUserData[] = [];


  useEffect(() => {
    getUsersByCompany();
  }, []);

  async function getUsersByCompany() {
    try {
      let url = `http://localhost:8080/users/bycompany?companyid=${props.companyId}`;
      let response = await axios.get(url);
      companyUsers = response.data;
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve users");
    }
  }

  return (
    <div className="customer-details">
      <div className="buttons">
        <button onClick={() => props.closeModel()}>X</button>
      </div>

      <ul>
        {companyUsers.map((user, index) => (
          <li>{index}: {user.userName}</li>))}
      </ul>
    </div>
  )
}

export default CompanyUsersDetailsModal