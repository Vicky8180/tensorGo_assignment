// ComposeEmail.js
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
            const token = localStorage.getItem('authToken')
            const result = await axios.post('http://localhost:5000/send-email', emailData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                withCredentials: true
            });
            alert('Email sent successfully!');
        } catch (error) {
            alert('Error sending email');
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="to" value={emailData.to} onChange={handleChange} placeholder="Recipient" required />
            <input type="text" name="subject" value={emailData.subject} onChange={handleChange} placeholder="Subject" required />
            <textarea name="body" value={emailData.body} onChange={handleChange} placeholder="Email body" required></textarea>
            <button type="submit">Send Email</button>
        </form>
    );
};

export default ComposeEmail;
