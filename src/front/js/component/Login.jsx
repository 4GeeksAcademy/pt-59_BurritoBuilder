import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({email: "", password: ""})
    const navigate = useNavigate();

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    const handleSubmit = async() => {
        let result = await actions.login(formValue)
        if (result){
            navigate("/private")
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="login-wrapper  p-3" style={{ width: '500px', height: '350px', border: '8px solid #3b85fb', borderRadius: '10px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                            <h2>Login</h2>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={onChange} value={formValue.password} type="password" className="form-control" placeholder="Enter password" id="password" />
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <button type="button" onClick={handleSubmit} className="btn btn-primary mb-2">Login</button>
                            {/* <Link to="/signup" className="btn btn-secondary mb-2">Signup</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Login;