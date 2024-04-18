import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryElement from './summary-element';

const OrderSummary = ({ user, setErrorText, selectedItem }) => {
    const [orderSummary, setOrderSummary] = useState({
        totalAmount: 0,
        totalOrders: 0,
        totalUnits: 0
    });
    const [duration, setDuration] = useState('1y'); // Default to 1 year
    const [isFocused, setIsFocused] = useState(false); // State to track focus

    const styles = {
        selectorContainer: {
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
           
            
        },
        select: {
            width: '15%',
            padding: '10px',
            border: `2px solid ${isFocused ? '#ff4500' : '#0056b3'}`,
            borderRadius: '5px',
            backgroundColor: 'white',
            fontSize: '16px',
            color: '#0056b3',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            boxShadow: isFocused ? '0 0 8px rgba(255, 69, 0, 0.6)' : 'none'
        }
    };

    useEffect(() => {
        const fetchSummary = async () => {
            if (selectedItem === 'Orders') {
                const data = await fetchOrderSummary(duration);
                setOrderSummary(data);
            } else if (selectedItem === 'Analytics') {
                const data = await fetchAnalytics();
                setOrderSummary(data);
            }
        };
        fetchSummary();
    }, [selectedItem, duration]);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/analytics`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            setErrorText('Error fetching analytics');
            console.error('Error fetching analytics:', error);
        }
    };

    const fetchOrderSummary = async (duration) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/orders/summary?duration=${duration}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            setErrorText('Error fetching order summary');
            console.error('Error fetching order summary:', error);
        }
    };

    return (
        <div>
            {selectedItem === 'Orders' && (
                <div style={styles.selectorContainer}>
                    <select
                        style={styles.select}
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="1y">Last 1 year</option>
                    </select>
                </div>
            )}
            <div className='mb-4 d-flex justify-content-between'>
                <SummaryElement 
                    title={'Total Orders:'} 
                    count={orderSummary.totalOrders}
                    className={'px-4 py-3 mr-1 bg-gray-200 order-summary-element'}
                />
                <SummaryElement 
                    title={'Total Units:'} 
                    count={orderSummary.totalUnits} 
                    className={'px-4 py-3 mr-1 bg-gray-200 order-summary-element'}
                />
                <SummaryElement 
                    title={'Total Amount:'} 
                    count={`PKR ${orderSummary.totalAmount}`} 
                    className={'px-4 py-3 bg-gray-200 order-summary-element'}
                />
            </div>
        </div>
    );
};

export default OrderSummary;
