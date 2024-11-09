import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllUsers } from '../../services/api';

const OnboardingTracker = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllUsers(); // Replace with your API endpoint
                setData(response); // Store the raw data
                formatData(response); // Format it for chart
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    // Format the data into chart-friendly format
    const formatData = (data) => {
        const started = data.filter(user => user.onBoardingStartedFlag === true).length;
        const notStarted = data.filter(user => user.onBoardingStartedFlag === null).length;

        setChartData([
            { name: 'Onboarding Started', value: started },
            { name: 'Onboarding Not Started', value: notStarted },
        ]);
    };

    // Pie chart visualization
    const COLORS = ['#0088FE', '#FF8042'];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default OnboardingTracker;
