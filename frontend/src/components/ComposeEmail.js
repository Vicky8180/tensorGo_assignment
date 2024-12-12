
import React, { useState } from 'react';
import axios from 'axios';

const ComposeEmail = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData({
            ...emailData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const result = await axios.post( `${process.env.REACT_APP_BASE_URL_PORT}/send-email`, emailData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
            alert('Email sent successfully!');
        } catch (error) {
            alert('Please use Businees ID!');
           
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            style={{
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '50px auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h2 style={{
                color: '#333',
                fontSize: '24px',
                borderBottom: '2px solid #4CAF50',
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                Compose Email
            </h2>
            <input 
                type="email" 
                name="to" 
                value={emailData.to} 
                onChange={handleChange} 
                placeholder="Recipient" 
                required 
                style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px 0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}
            />
            <input 
                type="text" 
                name="subject" 
                value={emailData.subject} 
                onChange={handleChange} 
                placeholder="Subject" 
                required 
                style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px 0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}
            />
            <textarea 
                name="body" 
                value={emailData.body} 
                onChange={handleChange} 
                placeholder="Email body" 
                required 
                style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px 0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    height: '120px',
                    resize: 'none'
                }}
            />
            <button 
                type="submit" 
                style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px'
                }}
            >
                Send Email
            </button>
        </form>
    );
};

export default ComposeEmail;
