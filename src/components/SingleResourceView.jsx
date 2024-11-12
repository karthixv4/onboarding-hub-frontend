import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress, CheckboxGroup, Checkbox } from "@nextui-org/react";
import AssignKT from './AssignKT';
import ListOfKTAssigned from './ListOfKTAssigned';
import { AssignInitialTasks, fetchAllResourcesWithKT, UpdateInitialTasks } from '../services/api';
import { allItemsState, initialSetupTasksAtom, resourceByIdSelector, resourceCompletionPercentageSelector } from '../recoil/atom/manager/managerAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ListOfInitialSetupsAssigned from './ListOfInitialSetupsAssigned';
import Loader from './loader/Loader';
const SingleResourceView = ({ isOpen, onClose, item }) => {
  const resource = useRecoilValue(resourceByIdSelector(item.id));
  const [initialSetupTasks, setInitialSetupTasks] = useRecoilState(initialSetupTasksAtom);
  const [loading, setLoading] = useState(false);
  const { ktCompletion, setupCompletion, totalSetupTasks,
    completedKTPlans, totalKTPlans,
    completedSetupTasks } = useRecoilValue(resourceCompletionPercentageSelector(item.id));
    const setAllItems = useSetRecoilState(allItemsState);
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  const { isOpen: isISOpen, onOpen: onISOpen, onClose: onISClose } = useDisclosure();
  const { isOpen: isIS2Open, onOpen: onIS2Open, onClose: onIS2Close } = useDisclosure();


  useEffect(() => {
    setInitialSetupTasks(
      resource?.initialSetup?.setupTasks?.map(task => ({
        id: task.id,
        completed: task.completed,
        name: task.name,
        description: task.description
      })) || []
    );


  }, [resource, setInitialSetupTasks]);
  // Handle checkbox selection change
  const handleCheckboxChange = (selectedTaskIds) => {
    const updatedTasks = initialSetupTasks.map(task => ({
      ...task,
      completed: selectedTaskIds.includes(task.id.toString())
    }));
    setInitialSetupTasks(updatedTasks);
  };
  const handleAssignITSubmit = async () => {
    setLoading(true);
    try {

      const setupCompleted = initialSetupTasks.length > 0 && initialSetupTasks.every(task => task.completed === true);
      const payload = {
        resourceId: resource.id,
        setupCompleted: setupCompleted,
        setupTasks: initialSetupTasks
      }

      const response = await AssignInitialTasks(payload);

      if (response) {
        const data = await fetchAllResourcesWithKT();
        setAllItems(data);

      } else {
        console.error("Failed to update initial setup");
      }
    } catch (error) {
      console.error("Error submitting initial setup:", error);
    } finally {
      setLoading(false);
      onIS2Close();
    }
  }

  const selectedIds = initialSetupTasks?.map((step) => step.id) || [];

  const handleISChange = (newValues) => {

    const updatedSetup = newValues.map((id) => {
      const step = initialSetupSteps.find((step) => step.id === id);
      return step ? { id: step.id, name: step.name, description: step.description, completed: false } : null;
    }).filter(Boolean);
    setInitialSetupTasks(updatedSetup)
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} size='4xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Resource Details</ModalHeader>
              <ModalBody>
                <div className='grid grid-cols-4 place-items-center'>
                  <div>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col items-center p-10 pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://i.pravatar.cc/300" alt="User" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{resource.user.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{resource.position} | {resource.team}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-3 gap-4'>
                    <div className='grid grid-cols-2 gap-10'>
                      {resource?.ktPlans?.length > 0 ? (
                        <a onClick={onOpen3} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>
                          <p className="font-normal text-gray-700 dark:text-gray-400">
                            {completedKTPlans}/{totalKTPlans} KT plans completed
                          </p>
                          <Progress label="Setup completion" size="sm" value={ktCompletion} maxValue={100} color="success" formatOptions={{ style: "percent" }} showValueLabel={true} className="mt-2" />
                        </a>
                      ) : (
                        <a onClick={onOpen2} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>
                          <p className="font-normal text-gray-700 dark:text-gray-400">No KT planned</p>
                        </a>
                      )}
                      <a href="#" onClick={onISOpen} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Initial Setup</h5>
                        {totalSetupTasks > 0 ? (
                          <>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                              {completedSetupTasks}/{totalSetupTasks} tasks completed

                            </p>
                            <Progress label="Setup completion" size="sm" value={setupCompletion} maxValue={100} color="success" formatOptions={{ style: "percent" }} showValueLabel={true} className="mt-2" />
                          </>
                        ) : (
                          <>
                            <p className="font-normal text-gray-700 dark:text-gray-400">No Initial setup assigned</p>
                            <Button className="" auto onPress={onIS2Open}>
                              Assign Intial Setup
                            </Button>
                            <Modal
                              isOpen={isIS2Open}
                              onOpenChange={onIS2Close}
                              placement="top-center"
                            >
                              <ModalContent>
                                {/* Overlay for loading */}
                                {loading && (
                                  <Loader />
                                )}

                                <ModalHeader className="flex flex-col gap-1">Assign Initial Setup</ModalHeader>
                                <ModalBody>
                                  <div className="flex flex-col gap-3">
                                    <CheckboxGroup
                                      label="Select Activities"
                                      color="warning"
                                      value={selectedIds} // Pass only the IDs of selected items
                                      onValueChange={handleISChange}
                                    >
                                      {initialSetupSteps.map((step) => (
                                        <Checkbox value={step.id} key={step.id}>{step.name}</Checkbox>
                                      ))}
                                    </CheckboxGroup>
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="danger" variant="flat" onPress={onIS2Close}>
                                    Close
                                  </Button>
                                  <Button color="primary" onPress={handleAssignITSubmit}>
                                    Assign
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                          </>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>

                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ListOfInitialSetupsAssigned isOpen={isISOpen} onClose={onISClose} resource={resource} />
      <AssignKT isOpen={isOpen2} onClose={onClose2} dataObject={{ fromTable: true, user: resource }} />
      <ListOfKTAssigned isOpen={isOpen3} onClose={onClose3} KTs={resource?.ktPlans} />

    </>
  );
};

export default SingleResourceView;


const initialSetupSteps = [
  {
    id: 1,
    name: "Profile Creation",
    description: "Ensure that the resource's profile is created in the system with all relevant personal and professional details."
  },
  {
    id: 2,
    name: "Office Access",
    description: "Provide the resource with access to office premises, including ID badges and necessary security clearances."
  },
  {
    id: 3,
    name: "Software Installation",
    description: "Install necessary software required for the resource's role, specifying the exact software and versions needed."
  }
];
