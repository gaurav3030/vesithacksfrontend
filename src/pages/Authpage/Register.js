import React, {useState , useContext} from 'react';
import {  useHistory } from 'react-router-dom';

import Axios from 'axios';
import UserContext from '../../context/UserContext';
import Error from '../../misc/Error';


export default function Register() {
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [passwordVerify , setPasswordVerify] = useState();
    
    const [error , setError] = useState();
    
    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const register =  async  (e) =>{
        e.preventDefault();
        try{
            const newUser = {email , password , passwordVerify};
            await Axios.post("http://localhost:5000/auth/",newUser,{
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
            <h2>Register </h2>
            {error && <Error message = {error} clearError={()=> setError(undefined) }/>}
            <form onSubmit={register}> 
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={e=> setEmail(e.target.value)}/>
                <label htmlFor="register-pass">Password</label>
                <input id="register-pass" type="password" onChange={e=> setPassword(e.target.value)}/>
                <label htmlFor="register-cpass">Comfirm Password</label>
                <input id="register-cpass" type="password" onChange={e=> setPasswordVerify(e.target.value)}/>
                
                <input type="submit" value="Register"/>
            </form>
            
        </div>
        </>
    )
}