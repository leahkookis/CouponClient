import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { ActionType } from '../../../../redux/action-types';
import { AppState } from '../../../../redux/app-state';
import IPurchaseData from '../../../../models/IPurchaseData';
import Purchase from './Purchase';
import ICompanyData from '../../../../models/ICompanyData';



const customStyles = {
  content: {
    top: '60%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Purchases: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [couponName, setCouponName] = useState('');  
  const [couponPrice, setCouponPrice] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [amount, setAmount] = useState(1);
  const [timeStamp, setTimeStamp] = useState('');
  const purchaseList: IPurchaseData[] = useSelector((state: AppState) => state.purchases);
  const [pageNumber, setPageNumber] = useState(1);
  const companies: ICompanyData[] = useSelector((state: AppState) => state.companiesData);
  const categories = useSelector((state: AppState) => state.categories);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const amountOfPage: number = 5;
  let loginData = useSelector((state: AppState) => state.token)
  const [companyId, setCompanyId] = useState(loginData?.companyId || 1);
  const [customerId, setCustomerId] = useState(loginData?.id);


  useEffect(() => {
    getAllCompanies(pageNumber, amountOfPage);
  }, [pageNumber]);
  useEffect(() => {
    getPurchaseByPage(pageNumber);
  }, [pageNumber]);
  useEffect(() => {
    getPurchaseByCompanyId(companyId,pageNumber);
  }, [pageNumber]);
  
  async function getPurchaseByPage(pageNumber: number) {
    if(loginData?.userType=="admin"){
    try {
      const url = `http://localhost:8080/purchase?page=${pageNumber}`;
      const response1 = await axios.get(url);
      const response = response1.data;
      dispatch({ type: ActionType.GetPurchase, payload: { response } });
    } catch (e) {
      console.error(e);
      alert('Failed to retrieve purchases');
    }
  }
}

  async function getPurchaseByCompanyId(companyId:number, pageNumber: number) {
    if(loginData?.userType=="company"){

    try {
      const url = `http://localhost:8080/purchase/bycompany?companyId=${companyId}&page=${pageNumber}`;
      const response1 = await axios.get(url);
      const response = response1.data;
      dispatch({ type: ActionType.GetPurchase, payload: { response } });
    } catch (e) {
      console.error(e);
      alert('Failed to retrieve purchases');
    }
  }
}
  // async function getPurchaseByCustomerId(customerId:number, pageNumber: number) {
  //   if(loginData?.userType=="customer"){
  //   try {
  //     const url = `http://localhost:8080/purchase/bycustomer?customerId=${customerId}&page=${pageNumber}`;
  //     const response1 = await axios.get(url);
  //     const response = response1.data;
  //     dispatch({ type: ActionType.GetPurchase, payload: { response } });
  //   } catch (e) {
  //     console.error(e);
  //     alert('Failed to retrieve purchases');
  //   }
  // }
  // }
  async function getAllCompanies(pageNumber: number, amountOfPage: number) {
    try {
      const url = await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
      const response = url.data;
      dispatch({ type: ActionType.GetCompanies, payload: { response } });
    } catch (error) {
      alert('Something went wrong');
    }
  }

  function openUserModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    setText('Enter a user:');
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCompanySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = +event.target.value;
    setCompanyId(selectedCompany);
  };

  const handleCategorySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = +event.target.value;
    setCategoryId(selectedCategory);
  };

  return (
    <div className='padding-top'>


      <div className="users">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Coupon Price</th>
        <th>Coupon Name</th>
        <th>Category Name</th>
        <th>Company Name</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {purchaseList.map((purchase) => (
        <Purchase
          key={purchase.id}
          id={purchase.id}
          name={purchase.name}
          couponPrice={purchase.couponPrice}
          couponName={purchase.couponName}
          categoryName={purchase.categoryName}
          companyName={purchase.companyName}
          amount={purchase.amount}
          timeStamp={purchase.timeStamp}
        />
      ))}
    </tbody>
  </table>
</div>
</div>
  );
};

export default Purchases;
