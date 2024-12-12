

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const GoogleLoginButton = ({ onLoginSuccess }) => {

    const googleLogin = async (token) => {
        try {
            const response = await axios.post( `${process.env.REACT_APP_BASE_URL_PORT}/auth/google/login`, { token });
            console.log('Login successful:from me', response.data.user);
            alert('Login successful!');
            return response.data; 
        } catch (error) {
            console.error('Error during Google login:', error.response?.data || error.message);
            alert('Login failed. Please try again.');
            throw error; 
        }
    };


    const handleLoginSuccess = (response) => {
        console.log("Login Success:", response);
        alert("User successfully verified!");
       const got_data= googleLogin(response.credential)
        onLoginSuccess(got_data); 
    };

    const handleLoginFailure = (error) => {
        console.error("Login Failed:", error);
        alert("Login failed. Please try again.");
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f0f4f8',
                padding: '20px',
            }}
        >
            <h2
                style={{
                    color: '#333',
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontSize: '24px',
                }}
            >
                Login with Google
            </h2>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#4285F4',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
            />
        </div>
    );
};

export default GoogleLoginButton;
