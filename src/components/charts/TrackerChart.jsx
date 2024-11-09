import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FetchAllKtPlan } from '../../services/api';

const COLORS = ['#82ca9d', '#8884d8', '#ffbb28']; // Added color for "Not Started"

const ProgressPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FetchAllKtPlan(); // Replace with your API endpoint

                // Count occurrences of each progress status
                const progressCounts = response.reduce(
                    (acc, item) => {
                        if (item.progress === 'COMPLETED') acc.COMPLETED += 1;
                        else if (item.progress === 'IN_PROGRESS') acc.IN_PROGRESS += 1;
                        else acc.NOT_STARTED += 1;
                        return acc;
                    },
                    { COMPLETED: 0, IN_PROGRESS: 0, NOT_STARTED: 0 }
                );

                // Format data for the PieChart
                const chartData = [
                    { name: 'COMPLETED', value: progressCounts.COMPLETED },
                    { name: 'IN_PROGRESS', value: progressCounts.IN_PROGRESS },
                    { name: 'NOT_STARTED', value: progressCounts.NOT_STARTED },
                ];

                setData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ProgressPieChart;
