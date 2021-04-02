import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Axios from "axios";

function Header() {

  const {userData,setUserData} = useContext(UserContext);
  
  const logout = async (e) => {
    e.preventDefault();
    try {
      
      await Axios.get("http://localhost:5000/auth/logout",{
        withCredentials:true
      });
    } catch (error) {
      console.log(error);
    }

    setUserData({
      user: undefined
    });
    
      
    
  }
  return (
    <div className="header">
        <div className="header-left">
            <div className="header-button">ABOUT</div>
            <div className="header-button">CONTACT</div>
        </div>
        <Link to="/"><div className="header-mid">HomeDecor</div></Link>
        
        <div className="header-right">
            <div className="header-button">CART</div>
            
            {
              userData.user ? <div className="header-button" onClick={logout}>LOGOUT</div> :
              <><Link to="/login"><div className="header-button">LOGIN</div></Link>
              <Link to="/register"><div className="header-button">Register</div></Link>
              </>
              
            }
            
        </div>
    </div>
  );
}

export default Header;