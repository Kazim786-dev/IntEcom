import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryElement from './summary-element';

const OrderSummary = ({ user, setErrorText, selectedItem, duration }) => {
    const [orderSummary, setOrderSummary] = useState({
        totalAmount: 0,
        totalOrders: 0,
        totalUnits: 0
    });

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
        <div className='mb-4 d-flex justify-content-between summary-element-container'>
            <SummaryElement
                title={'Total Orders:'}
                count={orderSummary.totalOrders}
                className={'px-4 py-3 mr-1 bg-muted order-summary-element border-primary border-1'}
            />
            <SummaryElement
                title={'Total Units:'}
                count={orderSummary.totalUnits}
                className={'px-4 py-3 mr-1 bg-muted order-summary-element border-primary border-1'}
            />
            <SummaryElement
                title={'Total Amount:'}
                count={`PKR ${orderSummary.totalAmount}`}
                className={'px-4 py-3 bg-muted order-summary-element border-primary border-1'}
            />
        </div>
    );
};

export default OrderSummary;
