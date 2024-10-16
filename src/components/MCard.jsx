import React from 'react';

const MCard = ({ title, description }) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            <a 
                href="#" 
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Read more
                <svg 
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 14 10"
                >
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>
        </div>
    );
};

const HomePage = () => {
    const cardsData = [
        { title: "Noteworthy technology acquisitions 2021", description: "Here are the biggest enterprise technology acquisitions of 2021 so far." },
        { title: "Innovative Solutions in Tech", description: "Exploring the latest trends in technology and innovation." },
        { title: "Future of AI", description: "Understanding the implications of artificial intelligence in our daily lives." },
        // Add more card data as needed
    ];

    return (
        <div className="flex flex-wrap justify-center p-6">
            {cardsData.map((card, index) => (
                <MCard key={index} title={card.title} description={card.description} />
            ))}
        </div>
    );
};

export default HomePage;