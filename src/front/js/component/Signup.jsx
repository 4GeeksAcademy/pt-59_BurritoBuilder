import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";

const Signup = () => {    
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({email: "", password: ""});
    const navigate = useNavigate();

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    
    return (
        <div className="container mt-5" style={{ border: '8px solid #3b85fb', borderRadius: '10px', padding: '20px', width:'500px', height:'350px' }}>
            <form className="row g-3 rounded">
                <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                    <h2>Signup</h2>
                </div>                    
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} value={formValue.password} type="password" className="form-control" placeholder="Enter password" id="password" />
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <button 
                        type="button" 
                        onClick={() => actions.signUp(formValue, navigate)} 
                        className="btn btn-primary"
                        style={{ margin: 'auto' }} // Add this inline style to center the button vertically
                    >
                        Signup
                    </button>                      
                </div>

            </form>
        </div>
    );
    
    
}

export default Signup;