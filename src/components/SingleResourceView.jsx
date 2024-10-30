import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress } from "@nextui-org/react";
import AssignKT from './AssignKT';
import SingleKT from './SingleKT';
import ListOfKTAssigned from './ListOfKTAssigned';

const SingleResourceView = ({ isOpen, onClose, item }) => {
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  console.log("ITEM: ", item);
  const totalKTPlans = item?.ktPlans?.length || 0;
  const completedKTPlans = item?.ktPlans?.filter(plan => plan.progress === "COMPLETED").length || 0;
  const completionKTPercentage = totalKTPlans > 0 ? (completedKTPlans / totalKTPlans) * 100 : 0;

  const totalSetupTasks = item?.initialSetup?.setupTasks?.length || 0;
  const completedSetupTasks = item?.initialSetup?.setupTasks?.filter(task => task.completed).length || 0;
  const completionTasksPercentage = totalSetupTasks > 0 ? (completedSetupTasks / totalSetupTasks) * 100 : 0;

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} size='4xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className='grid grid-cols-4 place-items-center'>
                  <div>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                      <div className="flex flex-col items-center p-10 pb-10">
                        <img
                          className="w-24 h-24 mb-3 rounded-full shadow-lg"
                          src="https://i.pravatar.cc/300"
                          alt="Bonnie Green"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.user.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.position} | {item.team}</span>
                      </div>
                    </div>


                  </div>
                  <div className='col-span-3 gap-4'>
                    <div className='grid grid-cols-2 gap-10'>
                      {
                        totalKTPlans > 0 ? (
                          <>
                            <a onClick={onOpen3} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>

                              <p className="font-normal text-gray-700 dark:text-gray-400">
                                {completedKTPlans}/{totalKTPlans} KT plans completed
                              </p>
                              <Progress
                                label="Setup completion"
                                size="sm"
                                value={completionKTPercentage}
                                maxValue={100}
                                color="success"
                                formatOptions={{ style: "percent" }}
                                showValueLabel={true}
                                className="mt-2"
                              />
                            </a>
                          </>
                        ) : (
                          <>
                            <a onClick={onOpen2} className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>

                              <p className="font-normal text-gray-700 dark:text-gray-400">No KT planned</p>
                            </a>
                          </>

                        )
                      }
                      <a href="#" className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Initial Setup</h5>
                        {totalSetupTasks > 0 ? (
                          <>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                              {completedSetupTasks}/{totalSetupTasks} tasks completed
                            </p>
                            <Progress
                              label="Setup completion"
                              size="sm"
                              value={completionTasksPercentage}
                              maxValue={100}
                              color="success"
                              formatOptions={{ style: "percent" }}
                              showValueLabel={true}
                              className="mt-2"
                            />
                          </>
                        ) : (
                          <p className="font-normal text-gray-700 dark:text-gray-400">No Initial setup assigned</p>
                        )}
                      </a>
                      <a href="#" className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>
                        {totalKTPlans > 0 ? (
                          <>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                              {completedKTPlans}/{totalKTPlans} KT plans completed
                            </p>
                            <Progress
                              label="Setup completion"
                              size="sm"
                              value={completionKTPercentage}
                              maxValue={100}
                              color="success"
                              formatOptions={{ style: "percent" }}
                              showValueLabel={true}
                              className="mt-2"
                            />
                          </>
                        ) : (
                          <p className="font-normal text-gray-700 dark:text-gray-400">No KT planned</p>
                        )}

                      </a>
                      <a href="#" className="block max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KT Plans</h5>
                        {totalKTPlans > 0 ? (
                          <>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                              {completedKTPlans}/{totalKTPlans} KT plans completed
                            </p>
                            <Progress
                              label="Setup completion"
                              size="sm"
                              value={completionKTPercentage}
                              maxValue={100}
                              color="success"
                              formatOptions={{ style: "percent" }}
                              showValueLabel={true}
                              className="mt-2"
                            />
                          </>
                        ) : (
                          <p className="font-normal text-gray-700 dark:text-gray-400">No KT planned</p>
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




