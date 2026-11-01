import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("institution");

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(!email || !password){
            alert("Please enter email and password");
            return;
        }
        if(role === "institution"){
            navigate("/institution/dashboard");
        }
        else{
            navigate("/officer/dashboard");
        }
    }
    return (
        <div className="loginPage">
            <div className="loginCard">
                <div className="loginLogo">
                    <h1>VisionX</h1>
                    <p> AICTE Approval Portal</p>
                </div>
                <h2>Welcome Back</h2>
                <p>Sign in to access your workspace</p>
                <form onSubmit={handleSubmit}>
                    <label>Email</label><input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <label>Password</label><input type="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <label>Select your Portal</label>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="institution">Institution Administrator</option>
                        <option value="officer">AICTE Officer</option>
                    </select>
                    <button type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;