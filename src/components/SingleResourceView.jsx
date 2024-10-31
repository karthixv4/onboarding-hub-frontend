import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress, CheckboxGroup, Checkbox } from "@nextui-org/react";
import AssignKT from './AssignKT';
import ListOfKTAssigned from './ListOfKTAssigned';
import { AssignInitialTasks, UpdateInitialTasks } from '../services/api';

const SingleResourceView = ({ isOpen, onClose, item }) => {
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  const { isOpen: isISOpen, onOpen: onISOpen, onClose: onISClose } = useDisclosure();
  const { isOpen: isIS2Open, onOpen: onIS2Open, onClose: onIS2Close } = useDisclosure();
  const totalKTPlans = item?.ktPlans?.length || 0;
  const completedKTPlans = item?.ktPlans?.filter(plan => plan.progress === "COMPLETED").length || 0;
  const completionKTPercentage = totalKTPlans > 0 ? (completedKTPlans / totalKTPlans) * 100 : 0;

  const totalSetupTasks = item?.initialSetup?.setupTasks?.length || 0;
  const completedSetupTasks = item?.initialSetup?.setupTasks?.filter(task => task.completed).length || 0;
  const completionTasksPercentage = totalSetupTasks > 0 ? (completedSetupTasks / totalSetupTasks) * 100 : 0;

  // State to track setup tasks and their completion
  const [initialSetupTasks, setInitialSetupTasks] = useState([]);
  useEffect(() => {
    // Initialize state with the initial setup tasks from the API response
    setInitialSetupTasks(
      item?.initialSetup?.setupTasks?.map(task => ({ id: task.id, completed: task.completed, name: task?.name, description: task?.description })) || []
    );
  }, [item]);

  // Handle checkbox selection change
  const handleCheckboxChange = (selectedTaskIds) => {
    const updatedTasks = initialSetupTasks.map(task => ({
      ...task,
      completed: selectedTaskIds.includes(task.id.toString())
    }));
    setInitialSetupTasks(updatedTasks);
  };
  const handleAssignITSubmit = async ()=> {
    try {

      const setupCompleted = initialSetupTasks.length > 0 && initialSetupTasks.every(task => task.completed === true);
      const payload = {
        resourceId: item.id,
        setupCompleted: setupCompleted,
        setupTasks: initialSetupTasks
      }

      const response = await AssignInitialTasks(payload);

      if (response) {
        console.log("Initial setup updated successfully");
      onIS2Close();
      } else {
        console.error("Failed to update initial setup");
      }
    } catch (error) {
      console.error("Error submitting initial setup:", error);
    } finally {
      onISClose();
    }
  }
  const handleInitialSetupSubmit = async () => {
    try {

      const setupCompleted = initialSetupTasks.length > 0 && initialSetupTasks.every(task => task.completed === true);
      const payload = {
        setupCompleted: setupCompleted,
        setupTasks: initialSetupTasks
      }

      const response = await UpdateInitialTasks(item.initialSetup.id, payload);

      if (response) {
        console.log("Initial setup updated successfully");
      } else {
        console.error("Failed to update initial setup");
      }
    } catch (error) {
      console.error("Error submitting initial setup:", error);
    } finally {
      onISClose();
    }
  };
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
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.user.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.position} | {item.team}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-3 gap-4'>
                    <div className='grid grid-cols-2 gap-10'>
                      {totalKTPlans > 0 ? (
                        <a onClick={onOpen3} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>
                          <p className="font-normal text-gray-700 dark:text-gray-400">
                            {completedKTPlans}/{totalKTPlans} KT plans completed
                          </p>
                          <Progress label="Setup completion" size="sm" value={completionKTPercentage} maxValue={100} color="success" formatOptions={{ style: "percent" }} showValueLabel={true} className="mt-2" />
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
                            <Progress label="Setup completion" size="sm" value={completionTasksPercentage} maxValue={100} color="success" formatOptions={{ style: "percent" }} showValueLabel={true} className="mt-2" />
                            <Modal isOpen={isISOpen} onOpenChange={onISClose} placement="top-center">
                              <ModalContent>
                                {(onISClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1">Assign Initial Setup</ModalHeader>
                                    <ModalBody>
                                      <div className="flex flex-col gap-3">
                                        <CheckboxGroup
                                          label="Select Activities"
                                          color="warning"
                                          value={initialSetupTasks.filter(task => task.completed).map(task => task.id.toString())}
                                          onChange={handleCheckboxChange}
                                        >
                                          {item?.initialSetup?.setupTasks?.map((step) => (
                                            <Checkbox value={step.id.toString()} key={step.id}>{step.name}</Checkbox>
                                          ))}
                                        </CheckboxGroup>
                                      </div>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button color="danger" variant="flat" onPress={onISClose}>
                                        Close
                                      </Button>
                                      <Button color="primary" onPress={handleInitialSetupSubmit}>
                                        Update
                                      </Button>
                                    </ModalFooter>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>
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
                                        {(onIS2Close) => (
                                            <>
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
                                            </>
                                        )}
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AssignKT isOpen={isOpen2} onClose={onClose2} dataObject={{ fromTable: true, user: item }} />
      <ListOfKTAssigned isOpen={isOpen3} onClose={onClose3} KTs={item?.ktPlans} />

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
