

// App.js
import React, { useState } from 'react';
import GoogleLoginButton from './components/GoogleLoginButton';
import Dashboard from './components/Dashboard';
import ComposeEmail from './components/ComposeEmail';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        setUser({
            profile: response.profileObj,
            token: response.tokenId
        });

    };

    return (
        <div>
            {!user ? (
                <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
            ) : (
                <>
                    <Dashboard user={user} />
                    <ComposeEmail />
                </>
            )}
        </div>
    );
};

export default App;
