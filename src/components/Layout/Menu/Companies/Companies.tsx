import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICouponsData from "../../../../models/ICouponsData";
import { ActionType } from "../../../../redux/action-types";
import { AppState } from "../../../../redux/app-state";
import Coupon from "../../../coupons/CouponCard";
import Modal from 'react-modal';

import './Companies.css';
import ICompanyData from "../../../../models/ICompanyData";
import Company from "./company/Company";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
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
function Companies() {
    let loginData = useSelector((state: AppState) => state.token)
    let companiesList: ICompanyData[] = useSelector((state: AppState) => state.companiesData)
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    let [pageNumber, setPageNumber] = useState(1);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    let dispatch = useDispatch();



    useEffect(() => {
        getAllCompanies(pageNumber)
    }, [pageNumber]);


    async function getAllCompanies(pageNumber: number) {
        try {

            let url = await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
            let response = url.data;
            dispatch({ type: ActionType.GetCompanies, payload: { response } })

        } catch (error) {
            alert("something went wrong");

        }

    }



    async function addCompany() {
        let company = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            
        };

        try {
            const response = await axios.post("http://localhost:8080/company", company)
            closeModal()
            let newCompany: ICompanyData = {
                id: response.data,
                name: name,
                address: address,
                phoneNumber: phoneNumber
            }
            dispatch({ type: ActionType.AddCompanies, payload: { newCompany } })
            setAddCompanyOpen(true);
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.message) {
                alert(e.response.data.error.message)
            } else {
                alert("failed to add Company")
            }
        }
    };


    function openCompanyModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        setText("Enter a Company:");
    }

    function closeModal() {
        setIsOpen(false);
    }
    



    let [addCompanyOpen, setAddCompanyOpen] = useState(false);

    function closeAddCompanyOpen() {
        setAddCompanyOpen(false);
    }


    return (
        <div>

            <button className="add-user-button" onClick={() => openCompanyModal()}>
                add Company
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>
                    <label>Company Name: </label>
                    <input type="text" onChange={event => setName(event.target.value)}></input>
                    <label>Address: </label><input type="text" onChange={event => setAddress(event.target.value)} ></input>
                    <label>Phone Number: </label><input type="text" onChange={event => setPhoneNumber(event.target.value)} ></input>
                </div>
                
                    <button onClick={() => addCompany()}>Save</button>

                
            </Modal>
            <div className="users">
                <table>
                    <tr>
                        <th>Company name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Edit</th>
                        <th>Remove</th>
                        
                    </tr>

                    {companiesList.map((company, index) => (
                        <Company id={company.id}  name={company.name} address={company.address} phoneNumber={company.phoneNumber} />
                    ))}

                </table>
            </div>
            <Modal
                className="modal"
                isOpen={addCompanyOpen}
                onRequestClose={closeAddCompanyOpen}
            >
                <ConfirmationModal title="Success!!" massage={"Company added successfully."} closeModel={() => closeAddCompanyOpen()} />
            </Modal>


        </div>
    );
}


export default Companies;