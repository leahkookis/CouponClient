import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { ActionType } from '../../../../redux/action-types';
import { AppState } from '../../../../redux/app-state';
import IPurchaseData from '../../../../models/IPurchaseData';
import Purchase from './Purchase';
import "./Purchases.css";


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
  const [companyId, setCompanyId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [amount, setAmount] = useState(0);
  const [timeStamp, setTimeStamp] = useState('');

  const [purchaseList, setPurchaseList] = useState<IPurchaseData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const companies = useSelector((state: AppState) => state.companiesData);
  const categories = useSelector((state: AppState) => state.categories);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const amountOfPage: number = 5;

  useEffect(() => {
    getAllCompanies(pageNumber, amountOfPage);
  }, [pageNumber]);

  useEffect(() => {
    getPurchaseByPage(pageNumber);
  }, [pageNumber]);

  async function getPurchaseByPage(pageNumber: number) {
    try {
      const url = `http://localhost:8080/purchase?page=${pageNumber}`;
      const response = await axios.get(url);
      const purchases = response.data;
      setPurchaseList(purchases);
    } catch (e) {
      console.error(e);
      alert('Failed to retrieve purchases');
    }
  }

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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <label>Name: </label>
          <input type="text" onChange={(event) => setName(event.target.value)} />
          <label>Coupon Name </label>
          <input type="text" onChange={(event) => setCouponName(event.target.value)} />
        </div>
        <div>
          <label>Company Name: </label>
          <select id="companies" onChange={handleCompanySelectChange}>
            {companies.map((company, index) => (
              <option value={company.id}>{company.name}</option>
            ))}
            <option value="none">none</option>
          </select>
        </div>
        <div>
          <label>Category Name: </label>
          <select id="categories" onChange={handleCategorySelectChange}>
            {categories.map((category, index) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input type="text" onChange={(event) => setAmount(+event.target.value)} />
          <label>Time: </label>
          <input type="text" onChange={(event) => setTimeStamp(event.target.value)} />
        </div>
      </Modal>

      <div className="purchases">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Coupon Price</th>
        <th>Coupon Name</th>
        <th>Category Name</th>
        <th>Company Name</th>
        <th>Amount</th>
        <th>Timestamp</th>
        <th>Edit</th>
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
