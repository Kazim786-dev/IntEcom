import React from "react";
import { useState } from "react";


const OrderSummaryFilter = ({duration, setDuration}) => {

    const [isFocused, setIsFocused] = useState(false); // State to track focus

    const styles = {
        selectorContainer: {
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
        },
        select: {
            padding: '4px',
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

    return (
            <div style={styles.selectorContainer}>
                <label className="text-light text-semibold mr-2">Time Range: </label>
                <select
                    style={styles.select}
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <option value="">All Orders</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="1y">Last 1 year</option>
                </select>
            </div>
    )
}

export default OrderSummaryFilter