import React, { useState, useRef } from 'react';
import KTList from './KTList';
import ActionItemsListUser from './ActionItemsListUser';
import InitialSetupListUser from './InitialSetupListUser';

const UserDashboard = () => {
    const userId = 30;
    const [activeTab, setActiveTab] = useState('about'); // State for managing active tab

    // Create refs for each section
    const ktListRef = useRef(null);
    const actionItemsRef = useRef(null);
    const initialSetupRef = useRef(null);

    // Function to scroll to a section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Welcome Onboard!
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Onboarding Portal that consolidates all onboarding activities into a single, organized platform. This portal will streamline the onboarding process and improve communication and tracking.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <button
                            onClick={() => { scrollToSection(ktListRef); setActiveTab('ktList'); }}
                            className={`inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center rounded-lg border hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 ${activeTab === 'ktList' ? 'bg-gray-100 text-gray-900' : 'text-white'}`}
                        >
                            My KTs
                        </button>
                        <button
                            onClick={() => { scrollToSection(actionItemsRef); setActiveTab('actionItems'); }}
                            className={`inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center rounded-lg border hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 ${activeTab === 'actionItems' ? 'bg-gray-100 text-gray-900' : 'text-white'}`}
                        >
                            My Action Items
                        </button>
                        <button
                            onClick={() => { scrollToSection(initialSetupRef); setActiveTab('initialSetup'); }}
                            className={`inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center rounded-lg border hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 ${activeTab === 'initialSetup' ? 'bg-gray-100 text-gray-900' : 'text-white'}`}
                        >
                            Initial Setups
                        </button>
                    </div>
                </div>
            </section>
            {/* Assign refs to the respective components */}
            <div ref={ktListRef}><KTList userId={userId} /></div>
            <div ref={actionItemsRef}><ActionItemsListUser userId={userId} /></div>
            <div ref={initialSetupRef}><InitialSetupListUser userId={userId} /></div>
        </>
    );
};

export default UserDashboard;
