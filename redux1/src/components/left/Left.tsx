import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "./left.css"


function Left() {
    const answer = useSelector((state: AppState)=> state.answer)

    return (
        <div className="Left">
        {answer}
        </div>
    )
  }
  
  export default Left;