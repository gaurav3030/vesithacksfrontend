import React, { useContext } from 'react';
import UserContext from '../context/UserContext';



 
function Homepage(props) {
  
  const {userData} = useContext(UserContext);

  return (
    <div>
      {
        userData.user ? <>Hello {userData.user} </>:<>Homepage</>
        
      }
    </div>
  );
}

export default Homepage;