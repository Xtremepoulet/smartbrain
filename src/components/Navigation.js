import React from "react";
import './Navigation.css';



const Navigation = ( { onChangeRoute, isSignedIn }) => {

    if(isSignedIn){
        return(        
        <nav className="navigation">
            <div className="section1">

            </div>

            <div className="section2">
                <p>{'SmartBrain'}</p>
            </div>

            <div className="section3">
                <p>{'About'}</p>
                <p onClick={() => onChangeRoute('signin')}>{'Sign out'}</p>
                <p onClick={() => onChangeRoute('register')}>{'register'}</p>
            </div>
        </nav>);
    } else {
        <nav>
            <p>{'sign in'}</p>
            <p>{'register'}</p>
        </nav>
    }
}


export default Navigation