import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../../redux/action-types";

import Modal from 'react-modal';

import Company from "../Companies/company/Company";
import ICompanyData from "../../../../models/ICompanyData";
import IUserData from "../../../../models/IUserData";
import ICouponsData from "../../../../models/ICouponsData";
import ICategory from "../../../../models/ICategory";
import Coupon from "./Coupon/Coupon";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBInput, MDBModalFooter } from "mdb-react-ui-kit";
import UpdateModal from "../../../ConfirmationModals/UpdateModal";


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

function Coupons() {


  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [url, setUrl] = useState("");

  let couponsList: ICouponsData[] = useSelector((state: AppState) => state.coupons)
  let [pageNumber, setPageNumber] = useState(1);
  let companies: ICompanyData[] = useSelector((state: AppState) => state.companiesData)
  let categories: ICategory[] = useSelector((state: AppState) => state.categories)


  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  let amountOfPage: number = 5;


  useEffect(() => {
    getAllCompanies(pageNumber, amountOfPage)
  }, [pageNumber]);

  useEffect(() => {
    getCouponsByPage(pageNumber);
  }, [pageNumber]);

  async function getCouponsByPage(pageNumber: number) {
    try {
      let url = `http://localhost:8080/coupons?page=${pageNumber}`;
      let response1 = await axios.get(url);
      let response = response1.data;

      dispatch({ type: ActionType.GetCoupons, payload: { response } });
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve users");
    }
  }
  async function getAllCompanies(pageNumber: number, amountOfPage: number) {
    try {

      let url = await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
      let response = url.data;
      dispatch({ type: ActionType.GetCompanies, payload: { response } })

    } catch (error) {
      alert("something went wrong");

    }

  }



  async function addCoupon() {

    let coupon = { name, price, description, startDate, endDate, company: { id: companyId, name: companyName }, category: { id: categoryId, name: categoryName }, amount, url };
    try {
      const response = await axios.post("http://localhost:8080/coupons", coupon)
      closeModal()
      let newCoupon: ICouponsData = {
        id: response?.data,
        name: name,
        price: price,
        description: description,
        startDate: startDate,
        endDate: endDate,
        companyId: companyId,
        companyName: companyName,
        categoryId: categoryId,
        categoryName: categoryName,
        amount: amount,
        url: url
      }
      couponsList.push(newCoupon);
      setAddCouponOpen(true);
    }
    catch (e: any) {
      console.error(e);
      if (e.response?.data?.error?.message) {
        alert(e.response.data.error.message)
      } else {
        alert("failed to add coupon")
      }
    }
  };


  function openCouponModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    setText("Enter a coupon details:");
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleCompanySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCompany = +event.target.value;
    setCompanyId(selectedCompany);
  };
  const handleCategorySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = +event.target.value;
    setCategoryId(selectedCategory);
  };


  let [addCouponOpen, setAddCouponOpen] = useState(false);

  function closeAddCouponOpen() {
    setAddCouponOpen(false);
  }


  return (
    <div>

      <button className="add-user-button" onClick={() => openCouponModal()}>
        add coupon
      </button>
      <MDBModal
        show={modalIsOpen}

        setShow={setIsOpen}


      ><MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add new Coupon:</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
             
                
                <MDBInput label="Name" className="form-label" type="text" onChange={event => setName(event.target.value)}></MDBInput>
                <MDBInput label="Price" className="form-label" type="number" onChange={event => setPrice(+event.target.value)}></MDBInput>
                <MDBInput label="Description" className="form-label" type="text" onChange={event => setDescription(event.target.value)}></MDBInput>
                <MDBInput label="Start Date" className="form-label" type="date" onChange={event => setStartDate(event.target.value)}></MDBInput>
                <MDBInput label="Expiration Date" className="form-label" type="date" onChange={event => setEndDate(event.target.value)}></MDBInput>
                <MDBInput label="Amount" className="form-label" type="number" onChange={event => setAmount(+event.target.value)}></MDBInput>
                <MDBInput label="Image URL" className="form-label" type="text" onChange={event => setUrl(event.target.value)}></MDBInput>

              
              
                
                <select aria-labelledby="Default select example" className="form-select sele" placeholder="User Type" id="dropdown" onChange={handleCategorySelectChange}>
                <option>Select Category</option>
                {categories.map((category, index) => <option value={category.id}>{category.name}</option>)}
            <option value="none">none</option>

                </select>
                 
                <select aria-labelledby="Default select example" className="form-select sele"  id="companies" onChange={handleCompanySelectChange}>
                  <option>Select Company</option>
                  {companies.map((comapny, index) => <option value={comapny.id}>{comapny.name}</option>)}
                  <option value="none">none</option>

                </select>
                
              

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={addCoupon}>
                Save
              </MDBBtn>

            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>


      </MDBModal>
      
      <div className="users">
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Category Name</th>
            <th>Company Name</th>
            <th>Amount</th>
            <th>Image Url</th>
            <th>Actions</th>

          </tr>

          {couponsList.map((coupon, index) => (
            <Coupon id={coupon.id} name={coupon.name} price={coupon.price} description={coupon.description} startDate={coupon.startDate} endDate={coupon.endDate} categoryName={coupon.categoryName} categoryId={coupon.categoryId} companyName={coupon.companyName} companyId={coupon.companyId} amount={coupon.amount} url={coupon.url} />
          ))}

        </table>
      </div>
      <Modal
        className="modal"
        isOpen={addCouponOpen}
        onRequestClose={closeAddCouponOpen}
      >
        <UpdateModal title="Success!!" massage={"Coupon added successfully."} closeModel={() => closeAddCouponOpen()} />
      </Modal>


    </div>
  );
}


export default Coupons;