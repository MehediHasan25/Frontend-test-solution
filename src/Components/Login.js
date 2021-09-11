import React,{useState} from 'react';
import '../CSS/login.css';
import { useHistory ,withRouter} from "react-router-dom";
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import { loginAPI } from '../Url/ApiList';

const Login = () => {
    const [login, setLogin] = useState({
        email:'',
        password:''
    });

    const history = useHistory();
    
    let {email, password} = login;   // destructuring

    // Handle Change function
    let handleChange = (e) =>{
        setLogin({...login, [e.target.name]: e.target.value});
    }

    // onSubmit function name loginSubmit
    const loginSubmit =async(e) =>{
        e.preventDefault();
        
        // Validation Start////
        if(email === ""){
            NotificationManager.warning(" Please Provide Email Address", "Warning", 5000);
            return;
        }

        if(password === ""){
            NotificationManager.warning(" Please Provide Password", "Warning", 5000);
            return;
        }

        if(password !== "meld123"){
            NotificationManager.warning("Invalid Credentials", "Warning", 5000);
            return;
        }

        // Validation Start////

        // Object for api call
        const userData = {
            email,
            password
        }
        

        // Api call
        try{
            let userLogin = await axios.post(loginAPI, userData);

            NotificationManager.success("Login Successfull", "Success", 5000);

            // Token saved in local storage named as token
            localStorage.setItem('token', userLogin.data);

             // Navigate Route
            history.push('/devices');
        }catch(err){
            
            // let errorStatus = err.response.status;
            let errorMessage = err.response.data;
            NotificationManager.error(errorMessage, "Error", 5000);
        }

    }

    return (
        <div className="container">
        <div className="loginform">
            <div className="wrapper">
                <div className="heading">
                    <p>Login</p>
                </div>
                <form >
                    <div className="form-group">
                    
                        <i className="fas fa-envelope"></i>
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={handleChange}/>
                    
                    </div>

                    <div className="form-group">
                    <span>
                    <i className="fas fa-exclamation-circle"></i>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                    </span>
                </div>
                    <button type="button"  className="btnLogin" onClick={loginSubmit} >LOG IN</button>

                </form>
            </div>
        </div>
    </div>
    )
}

export default withRouter(Login);
