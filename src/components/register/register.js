import React from "react";
import './register.css'



class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nameRegister: '',
            emailRegister: '',
            passwordRegister: ''
        }
    }


    onNameChange = (event) => {
        this.setState({ nameRegister: event.target.value})
    }


    onEmailChange = (event) => {
        this.setState({ emailRegister: event.target.value })
    }

    onPasswordChange = (event) =>  {
        this.setState({ passwordRegister: event.target.value})  
    }


    onSubmitRegister = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.nameRegister,
                email: this.state.emailRegister,
                password: this.state.passwordRegister
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data[0].id){
                    this.props.loadUser(data[0])
                    this.props.onChangeRoute('home')
                }else {
                    console.log("error")
                }
            }).catch(err => console.log("impossinle to signin"))
    }
    


    render(){

        const { onChangeRoute } = this.props;
        return(
            <div className="register">
    
                <div>
                    <h2>Register</h2>
                </div>
                
                <form className="form form0">
                    <label>Name</label>
                    <input onChange={this.onNameChange} minLength={6} maxLength={24}></input>
                </form>
            
                <form className="form form1">
                    <label>Email</label>
                    <input onChange={this.onEmailChange} minLength={6} maxLength={24} required></input>
                </form>
    
                <form className="form form2">
                    <label>Password</label>
                    <input onChange={this.onPasswordChange} minLength={6} maxLength={16} required></input>
                </form>
                
                <div className="form form3">
                    <button onClick={this.onSubmitRegister}>submit</button>
                    <p onClick={() => onChangeRoute('signin')}>sign in</p>
                </div>
    
            </div>
    
        );
    }

}


export default Register;