import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/action-types";
import "./right.css"



function Right() {
    function mult():void{
        let multResult = number1* number2;
        const onMultClicked = () => {
            dispatch({type: ActionType.Answer, payload: multResult})
        }
    }

    let[number1, setNumber1]= useState(0);
    let[number2, setNumber2]= useState(0);
    const dispatch = useDispatch();

  

    return (
        <div className="Right">
            <input type="text" placeholder="number 1" onChange={event => setNumber1(+event.target.value)}/>
            <input type="text" placeholder="number 2" onChange={event => setNumber2(+event.target.value)}/>
            <button onClick={() => mult()}>submit</button>
        </div>
    )
  }
  
  export default Right;


