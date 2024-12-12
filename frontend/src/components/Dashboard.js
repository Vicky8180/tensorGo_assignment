


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
    const [communicationHistory, setCommunicationHistory] = useState([]);

    useEffect(() => {
        const fetchCommunicationHistory = async () => {
            try {
                const result = await axios.get( `${process.env.REACT_APP_BASE_URL_PORT}/communication-history`, {
                    withCredentials: true
                });
                setCommunicationHistory(result.data);
               
            } catch (error) {
                console.error('Error fetching communication history:', error);
            }
        };

        fetchCommunicationHistory();
    }, []);

    console.log(user.profile.user)
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '800px', margin: '50px auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {/* Profile Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <img
                    src={user.profile.user?.picture || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    style={{
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        marginRight: '20px'
                    }}
                />
                <div>
                    <h2 style={{ color: '#333', fontSize: '24px', margin: '0' }}>{user.profile.user?.name || 'User Name'}</h2>
                    <p style={{ color: '#555', fontSize: '16px', marginTop: '5px' }}>{user.profile.user?.email || 'user@example.com'}</p>
                </div>
            </div>

      
            <h3 style={{ color: '#333', fontSize: '20px', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px' }}>Your Communication History</h3>
            
            {communicationHistory.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                    {communicationHistory.map((email, index) => (
                        <li key={index} style={{
                            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f1f1',
                            padding: '10px 15px',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{email.Subject}</span>
                            <span style={{ fontSize: '12px', color: '#666' }}>{email.Date}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: '#999', textAlign: 'center' }}>No communication history available.</p>
            )}
        </div>
    );
};

export default Dashboard;
