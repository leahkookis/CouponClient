import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICouponsData from "../../../models/ICouponsData";
import { ActionType } from "../../../redux/action-types";
import { AppState } from "../../../redux/app-state";
import Coupon from "../../coupons/CouponCard";

import './Companies.css';
import ICompanyData from "../../../models/ICompanyData";
import Company from "../../company/Company";

function Companies(){
     const companyArray: ICompanyData[]= useSelector((state: AppState)=> state.companiesData)
     let[pageNumber, setPageNumber]  = useState(1);
     let amountOfPage: number = 5;
     let dispatch = useDispatch();
     useEffect(()=> {
        getAllCompanies(pageNumber,amountOfPage)
    }, [pageNumber]);
    


     async function getAllCompanies(pageNumber: number, amountOfPage: number) {
        try {
           
            let url= await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
            let response = url.data;
            dispatch({type: ActionType.GetCompanies, payload: {response}})

        } catch (error) {
            alert("something...");
            
        }
        
     }
    return(
        <div className="Companies-container">

            {companyArray
            .map((company, index) => <Company key={index} id={company.id} name={company.name} address={company.address} phoneNumber={company.phoneNumber} />)}
        
        </div>
    );

}
export default Companies;