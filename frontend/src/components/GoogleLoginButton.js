
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onLoginSuccess }) => {
    const handleLoginSuccess = (response) => {
        console.log("Login Success:", response);
        onLoginSuccess(response); 
    };

    const handleLoginFailure = (error) => {
        console.error("Login Failed:", error);
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
        />
    );
};

export default GoogleLoginButton;

