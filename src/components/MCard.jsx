import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from "@nextui-org/react";
import AssignKT from './AssignKT';
import AssignActionItem from './AssignActionItem';

const MCard = ({ title, description, onClick }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <a 
                    onClick={onClick}
                    href="#" 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg 
                        className="rtl:rotate-180 w-3.5 h-3.5 ml-2" 
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
        </div>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const handleCardClick = (title) => {
        if (title === "All resources") {
            navigate("/all/resources");
        } else if (title === "Onboard an User") {
            navigate("/onboard/new");
        } else if (title === "Assign KT") {
            onOpen(); // Open the AssignKT modal if the card title is "Assign KT"
        }else if (title === "Assign Action Item") {
            onOpen2(); 
        }
        // Add more conditions for other cards as needed
    };

    const cardsData = [
        { title: "All resources", description: "Here are the biggest enterprise technology acquisitions of 2021 so far." },
        { title: "Onboard an User", description: "Do all the onboarding formalities" },
        { title: "Assign KT", description: "Exploring the latest trends in technology and innovation." },
        { title: "Assign Action Item", description: "Understanding the implications of artificial intelligence in our daily lives." },
    ];

    return (
        <div className="flex flex-wrap justify-center p-6 gap-4">
            {cardsData.map((card, index) => (
                <MCard 
                    key={index} 
                    title={card.title} 
                    description={card.description}  
                    onClick={() => handleCardClick(card.title)} 
                />
            ))}
            <AssignKT isOpen={isOpen} onClose={onClose} />
            <AssignActionItem isOpen={isOpen2} onClose={onClose2}/>
        </div>
    );
};

export default HomePage;
