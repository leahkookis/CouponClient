import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ICouponsData from "../../../models/ICouponsData";
import { AppState } from "../../../redux/app-state";
import EditCoupon from "../editCoupon/editCoupon";
import './couponCard.css';
import Modal from 'react-modal';
import { useState } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
function Coupon(props: ICouponsData) {
    let loginData = useSelector((state: AppState) => state.loginData)
    function editCoupon() {
        <EditCoupon id={props.id} name={props.name} price={props.price} description={props.description} startDate={props.startDate} endDate={props.endDate} categoryName={props.categoryName} companyName={props.companyName} amount={props.amount} />
    }


    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    console.log("Rendered");
    console.log("Text = " + text);


    function openCouponModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        setText("Hello!");
    }

    function closeModal() {
        setIsOpen(false);
    }
    function buyNow(id:number): void {
        throw new Error("Function not implemented.");
    }

    function addToCart(id:number): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="coupon-card">
            <button className="enter-coupon" onClick={openCouponModal}>
                <img className="img-coupon" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
                <div className="coupon-name">
                    {props.name}
                </div>
                <div>
                    {props.price} ILS
                </div>
                <div>
                    {props.description}
                </div>
                <div className="edit-button">
                    {loginData?.userType == "admin" && (<input type="button" value={"edit"} onClick={editCoupon} />)}
                </div>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div className="coupon-card-modal">
                    <img className="img-coupon-modal" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
                    <div className="coupon-name">
                        {props.name}
                    </div>
                    <div>
                        {props.price} ILS
                    </div>
                    <div>
                        {props.description}
                    </div>
                    <div>
                        {props.categoryName}
                    </div>
                    <div>
                        {props.endDate}
                    </div>
                    <button className="button-modal" onClick={event=> addToCart(props.id)}>Add to cart</button>
                    <button className="button-modal" onClick={event => buyNow(props.id)}>buy now</button>
                    <div className="edit-button">
                        {loginData?.userType == "admin" && (<input type="button" value={"edit"} onClick={editCoupon} />)}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Coupon;
