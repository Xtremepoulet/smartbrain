import React from "react";
import './Inputfield.css'


const Inputfield = ({ onInput, onSubmit, user }) => {
    return(

        <div className="inputfield">
            <p>{`${user.name} your current rank is ${user.entries}`}</p>
            <div className="submitForm">
                <input onChange={onInput} type="text" placeholder="put your image here..."></input>
                <button onClick={onSubmit}>
                    {'Submit'}
                </button>
            </div>
        </div>
    );
}

export default Inputfield