// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
    const [communicationHistory, setCommunicationHistory] = useState([]);

    useEffect(() => {
        const fetchCommunicationHistory = async () => {
            try {
                const result = await axios.get('http://localhost:5000/communication-history', {
                    withCredentials: true
                });
                setCommunicationHistory(result.data);
            } catch (error) {
                console.error('Error fetching communication history:', error);
            }
        };

        fetchCommunicationHistory();
    }, []);

    return (
        <div>
            {/* <h1>Welcome {user.profile.displayName}</h1> */}
            <h2>Your Communication History</h2>
            <ul>
                {communicationHistory.map((email, index) => (
                    <li key={index}>{email.Subject} - {email.Date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
