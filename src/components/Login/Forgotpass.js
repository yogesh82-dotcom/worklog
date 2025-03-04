import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgotpass = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfrmPassword, setcfrmPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        if(password == "" || cfrmPassword == ""){
            seterrorMessage("Invalid credentials");
        }else{
            seterrorMessage("");
            const response = await fetch('http://localhost:8000/forgot-password' , {
                method : 'PUT',
                headers:{
                'Content-Type' : 'application/json',
                },
                body : JSON.stringify({email,password,cfrmPassword})
            })
            const data = await response.json()
            console.log(data)
            navigate("/");
        }
    }
    return(
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="login-container">
                    <h3 className="text-left mb-4">Reset your password!</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Email"/>
                        </div>
                        <div className="mb-3">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder="New Password"/>
                        </div>
                        <div className="mb-3">
                        <input type="password" onChange={(e) => setcfrmPassword(e.target.value)} value={cfrmPassword} className="form-control" id="password" placeholder="Confirm new password"/>
                        </div>
                        {errorMessage && (<div className="alert alert-danger" role="alert">{errorMessage}</div>)}
                        <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Forgotpass;