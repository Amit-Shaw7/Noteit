import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email : "" , password : ""});

    const onChange = (e) => {
        setCredentials({...credentials , [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/user/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ email : credentials.email , password : credentials.password })
        });
        const json = await response.json();
        // console.log(json.success);
        if(json.success){
            // set Token And Redirect To home
            localStorage.setItem('token' , json.token);
            navigate('/');
        }else{
            alert("Invalid Credentials");
        }
    }
    return (
        <div className='my-5 container'>
            <form className='container' onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input minLength="5" name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login