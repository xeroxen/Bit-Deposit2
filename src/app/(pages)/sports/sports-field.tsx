"use client"

import SportsMenu from '@/components/cricket/SportsMenu';
import React, { useEffect, useState } from 'react';

const SportsField = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://1xbet-api.p.rapidapi.com/sports?mode=line&lng=en', {
                    headers: {
                        'x-rapidapi-host': '1xbet-api.p.rapidapi.com',
                        'x-rapidapi-key': '4eb1d4d6efmsh109c40afa051154p14132cjsnb793a15cc704'
                    }
                });
                
                if (!res.ok) {
                    throw new Error(`API request failed with status ${res.status}`);
                }
                
                const responseData = await res.json();
                //console.log("Client side data:", responseData);
                setData(responseData);
            } catch (err) {
                console.error("Error fetching sports data:", err);
            }
        }
        
        fetchData();
    }, []);

    // if (loading) return <div className='text-center text-2xl font-bold'>Loading sports data...</div>;
    // if (!data) return <div className='text-center text-2xl font-bold'>No sports data available</div>;

    return (
        <div>
            <h1 className="text-center my-8 text-2xl font-bold">Sports Field</h1>
            <SportsMenu data={data} />
        </div>
    );
};

export default SportsField;