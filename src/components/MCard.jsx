import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from "@nextui-org/react";
import AssignKT from './AssignKT';
import AssignActionItem from './AssignActionItem';
import ProgressPieChart from './charts/TrackerChart';
import OnboardingTracker from './charts/OnboardingTracker';
import { fetchAllResourcesWithKT } from '../services/api';
import { useSetRecoilState } from 'recoil';
import { allItemsState } from '../recoil/atom/manager/managerAtom';
import OnboardUser from './OnboardUser';

const HomePage = () => {
    const navigate = useNavigate();
    const setAllItems = useSetRecoilState(allItemsState)
    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchAllResourcesWithKT();
          setAllItems(data);
        };
        fetchData();
      }, []);
    const handleCardClick = (url) => {
      navigate(url);
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    return (
        <>
            <div className="flex justify-center w-full">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl w-full">
                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Card - Total Users */}
                        <div
                            onClick={() => handleCardClick('/all/resources')}
                            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Resource List
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        All Resources
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}

                        {/* Card - Onboard */}
                        <div
                            onClick={() => onOpen3()}
                            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Onboard
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        Onboard a User
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}

                        {/* Card - KT Plan */}
                        <div
                            onClick={() => onOpen()}
                            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Quick Assign
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        Assign KT Plan
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}

                        {/* Card - Action Items */}
                        <div
                            onClick={() => onOpen2()}
                            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                            <div className="p-4 md:p-5">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Quick Assign
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        Assign a Task
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {/* End Card */}

                        {/* Card - Progress Pie Chart (Double height) */}
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 row-span-2 col-span-2 p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Overall 
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    KT Plan Status
                                </h3>
                            </div>
                            <div className="mt-6">
                                <ProgressPieChart />
                            </div>
                        </div>
                        {/* Card - Onboarding Pie Chart (Double height) */}
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 row-span-2 col-span-2 p-4 md:p-5">
                            <div className="flex items-center gap-x-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                    Overall 
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                    Onboarding Status
                                </h3>
                            </div>
                            <div className="mt-6">
                                <OnboardingTracker />
                            </div>
                        </div>
                        {/* End Card */}
                    </div>
                    {/* End Grid */}
                </div>
            </div>
            <OnboardUser isOpen={isOpen3} onClose={onClose3} />
            <AssignKT isOpen={isOpen} onClose={onClose} dataObject={{ fromTable: false, item: null }} />
            <AssignActionItem isOpen={isOpen2} onClose={onClose2} dataObject={{ fromTable: false, item: null }} />
        </>
    );
};

export default HomePage;
