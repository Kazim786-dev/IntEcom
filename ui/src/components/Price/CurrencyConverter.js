import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = ({ amount, displayCurrency = "PKR" }) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);

    // Function to fetch the exchange rate
    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            const rate = response.data.rates.PKR;
            setExchangeRate(rate);
        } catch (error) {
            console.error('Failed to fetch exchange rate:', error);
        }
    };

    // Effect to fetch the rate
    useEffect(() => {
        fetchExchangeRate();
    }, []);

    // Effect to convert amount whenever amount or rate changes
    useEffect(() => {
        if (exchangeRate != null) {
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        }
    }, [amount, exchangeRate]);

    return (
        <span>
            {convertedAmount ? `${displayCurrency} ${convertedAmount}` : 'Loading...'}
        </span>
    );
};

export default CurrencyConverter;
