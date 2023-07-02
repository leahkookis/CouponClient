import { useState } from "react";
import IUserData from "../../../../../models/IUserData";

function User(props: IUserData) {
    const [id, setId] = useState(props.id);
    const [userName, setUserName] = useState(props.userName);
    const [userType, setUserType] = useState(props.userType);
    const [companyName, setCompanyName] = useState(props.companyName);
    const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false);
    const [customerDetailsModalIsOpen, setCustomerDetailsModalIsOpen] = useState(false);
    const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
    const [editClicked, setEditClicked] = useState(false);

    return (
        <div></div>
    )
}
export default User;
