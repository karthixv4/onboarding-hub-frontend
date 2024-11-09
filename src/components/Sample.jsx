import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sample = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    navigate(url);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl w-full">
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card - Total Users */}
          <div
            onClick={() => handleCardClick('/all/resource')}
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

          {/* Card - Sessions */}
          <div
            onClick={() => handleCardClick('/onboard/new')}
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
                  Onboard an User
                </h3>
              </div>
            </div>
          </div>
          {/* End Card */}

          {/* Card - Avg. Click Rate */}
          <div
            onClick={() => handleCardClick('/dummy-url-3')}
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
                  Assign KT plan
                </h3>
              </div>
            </div>
          </div>
          {/* End Card */}

          {/* Card - Pageviews */}
          <div
            onClick={() => handleCardClick('/dummy-url-4')}
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
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default Sample;
