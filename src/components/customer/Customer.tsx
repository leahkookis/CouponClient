import axios from "axios";
import { useEffect, useState } from "react";

function Customer() {
    let [pageNumber, setPageNumber] = useState(1);
    useEffect(()=>{
        getAllCoupons();
    },[])
    async function getAllCoupons() {
    let url = `http://localhost:8080/coupons?page=${pageNumber}`;
            let response = await axios.get(url);
            let coupons = response.data;
            console.log(coupons);
    }
    return (
        <h1>Welcome</h1>
    )
}
export default Customer;