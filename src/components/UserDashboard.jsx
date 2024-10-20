import React, { useState } from 'react';
import KTList from './KTList';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('about'); // State for managing active tab

    return (
        // <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        //     <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" role="tablist">
        //         <li className="me-2">
        //             <button
        //                 id="about-tab"
        //                 data-tabs-target="#about"
        //                 type="button"
        //                 role="tab"
        //                 aria-controls="about"
        //                 aria-selected={activeTab === 'about'}
        //                 className={`inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 ${activeTab === 'about' ? 'bg-gray-100' : ''}`}
        //                 onClick={() => setActiveTab('about')}
        //             >
        //                 About
        //             </button>
        //         </li>
        //         <li className="me-2">
        //             <button
        //                 id="services-tab"
        //                 data-tabs-target="#services"
        //                 type="button"
        //                 role="tab"
        //                 aria-controls="services"
        //                 aria-selected={activeTab === 'services'}
        //                 className={`inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${activeTab === 'services' ? 'bg-gray-100' : ''}`}
        //                 onClick={() => setActiveTab('services')}
        //             >
        //                 Services
        //             </button>
        //         </li>
        //         <li className="me-2">
        //             <button
        //                 id="statistics-tab"
        //                 data-tabs-target="#statistics"
        //                 type="button"
        //                 role="tab"
        //                 aria-controls="statistics"
        //                 aria-selected={activeTab === 'statistics'}
        //                 className={`inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${activeTab === 'statistics' ? 'bg-gray-100' : ''}`}
        //                 onClick={() => setActiveTab('statistics')}
        //             >
        //                 Facts
        //             </button>
        //         </li>
        //     </ul>
        //     <div id="defaultTabContent">
        //         {activeTab === 'about' && (
        //             <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
        //                 <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        //                     Powering innovation & trust at 200,000+ companies worldwide
        //                 </h2>
        //                 <p className="mb-3 text-gray-500 dark:text-gray-400">
        //                     Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.
        //                 </p>
        //                 <a href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
        //                     Learn more
        //                     <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        //                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
        //                     </svg>
        //                 </a>
        //             </div>
        //         )}
        //         {activeTab === 'services' && (
        //             <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
        //                 <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        //                     We invest in the world’s potential
        //                 </h2>
        //                 <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">Dynamic reports and dashboards</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">Templates for everyone</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">Development workflow</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">Limitless business automation</span>
        //                     </li>
        //                 </ul>
        //             </div>
        //         )}
        //         {activeTab === 'statistics' && (
        //             <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
        //                 <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        //                     Empowering teams with trust and innovation
        //                 </h2>
        //                 <p className="mb-3 text-gray-500 dark:text-gray-400">
        //                     Create value through results that matter.
        //                 </p>
        //                 <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">9M+ users every day</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">3B+ API requests monthly</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">10+ Global offices</span>
        //                     </li>
        //                     <li className="flex space-x-2 rtl:space-x-reverse items-center">
        //                         <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        //                         </svg>
        //                         <span className="leading-tight">70+ Employees in India</span>
        //                     </li>
        //                 </ul>
        //             </div>
        //         )}
        //     </div>
        // </div>
        <>
        <KTList />
        </>
    );
};

export default UserDashboard;
