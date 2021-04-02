import React, {useState,useEffect} from 'react';
import './index.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from './misc/Header';
import Homepage from './pages/Homepage';
import Register from './pages/Authpage/Register';
import Login from './pages/Authpage/Login';
import UserContext from './context/UserContext';
import Axios from "axios";

Axios.defaults.withCredentials=true;

function App() {

  const [userData , setUserData] = useState({
    
    user: undefined,
  });
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const checkLoggedIn = async () => {
      
      const tokenRes = await Axios.post(
        "http://localhost:5000/auth/tokenIsValid");
        
      if(tokenRes.data.user){
        
        setUserData({
          
          user: tokenRes.data.user.email,
        });
      }
      setLoading(1);
      
    }
    checkLoggedIn();
    
  },[]);
  if (loading===0) {
    return null;
  }

  return <>
    <BrowserRouter>
      <UserContext.Provider value={{userData , setUserData}}>
        <Header />
          <Switch>
            <Route path="/" component ={Homepage} exact />
            
            <Route path="/register" component ={Register} />
            <Route path="/login" component ={Login} />
            
          </Switch>
          </UserContext.Provider>
      </BrowserRouter>
  </>
}

export default App;
