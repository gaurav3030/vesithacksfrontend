import React,{useState,useContext} from 'react';
import {  useHistory } from 'react-router-dom';
import Error from '../../misc/Error';
import UserContext from '../../context/UserContext';
import Axios from 'axios';



export default function Login() {

    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [error , setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const login =  async  (e) =>{
        e.preventDefault();
        try{
            const newUser = {email , password};
            await Axios.post("http://localhost:5000/auth/login",newUser,{
                withCredentials:true
            });
            const tokenRes = await Axios.post(
                "http://localhost:5000/auth/tokenIsValid");
                
            setUserData({
          
                user: tokenRes.data.user.email,
            });
            history.push("/");
            
            
        }
        catch(err){
            err && setError(err);
        }
        
    }
    
    

    return (
        <>
        <div className="auth-page">
            <h2>Login</h2>
            {error && <Error message = {error} clearError={()=> setError(undefined) }/>}
            <form onSubmit={login}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" onChange={e=> setEmail(e.target.value)}/>
                <label htmlFor="login-pass">Password</label>
                <input id="login-pass" type="password" onChange={e=> setPassword(e.target.value)}/>
                <input type="submit" value="Login"/>
            </form>
            
        </div>
        </>
    )
}