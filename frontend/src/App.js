

// App.js
import React, { useState } from 'react';
import GoogleLoginButton from './components/GoogleLoginButton';
import Dashboard from './components/Dashboard';
import ComposeEmail from './components/ComposeEmail';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
    response.then((data)=>{
      setUser({
        profile: data,
        token: response.tokenId
    })
      console.log(data)})
      ;

    };

    return (
        <div>
            {!user ? (
                <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
            ) : (
                <>
                <div style={{display:"flex"}}>
                <Dashboard user={user} />
                <ComposeEmail />
                </div>
                  
                </>
            )}
        </div>
    );
};

export default App;
