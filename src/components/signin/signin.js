import React from "react";
import './signin.css'



class Signin extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword: ''
        }
    }
    
    
    onEmailChange = (event) => {
        this.setState({ signinEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({ signinPassword: event.target.value})
    }


    onSubmitSignin = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.id) {  //on verifie qu'un id existe et qu'il est bien valide
                    this.props.loadUser(data);
                    this.props.onChangeRoute('home');
                }

            })
    }
    
    
    render(){

        const { onChangeRoute } = this.props;

        return(
            <div className="signin">
    
                <div>
                    <h2>Sign in</h2>
                </div>
                
    
                <div className="form form1">
                    <label>Email</label>
                    <input onChange={this.onEmailChange}></input>
                </div>
    
                <div className="form form2">
                    <label>Password</label>
                    <input onChange={this.onPasswordChange}></input>
                </div>
                
                <div className="form form3">
                    <button onClick={this.onSubmitSignin}>submit</button>
                    <p onClick={() => onChangeRoute('register')}>register</p>
                </div>
    
            </div>
    
        );
    }
}


export default Signin;