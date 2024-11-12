import { Button, Checkbox, CheckboxGroup, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { allItemsState, initialSetupTasksAtom } from '../recoil/atom/manager/managerAtom';
import { useState } from "react";
import { UpdateInitialTasks } from "../services/api";
import Loader from "./loader/Loader";


const ListOfInitialSetupsAssigned = ({ isOpen, onClose, resource }) => {

  const [loading, setLoading] = useState(false);

  const [initialSetupTasks, setInitialSetupTasks] = useRecoilState(initialSetupTasksAtom);
  const setAllItemsState = useSetRecoilState(allItemsState);

  const handleCheckboxChange = (selectedTaskIds) => {
    const updatedTasks = initialSetupTasks.map(task => ({
      ...task,
      completed: selectedTaskIds.includes(task.id.toString())
    }));
    setInitialSetupTasks(updatedTasks);
  };

  const modalClose = () => {
    onClose();
  }
  const handleInitialSetupSubmit = async () => {
     setLoading(true);
    try {

      const setupCompleted = initialSetupTasks.length > 0 && initialSetupTasks.every(task => task.completed === true);
      const payload = {
        setupCompleted: setupCompleted,
        setupTasks: initialSetupTasks
      }

      const response = await UpdateInitialTasks(resource.initialSetup.id, payload);

      if (response) {
        setAllItemsState(prevItems => {
          const hey = prevItems.map(prev =>
            prev.id == response?.resourceId
              ? {
                ...prev,
                initialSetup: response
              }
              : prev
          )
          return hey
        }
        );
        console.log("Initial setup updated successfully");
      } else {
        console.error("Failed to update initial setup");
      }
    } catch (error) {
      console.error("Error submitting initial setup:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {/* Overlay for loading */}
        {loading && (
          <Loader />
        )}

        <ModalHeader className="flex flex-col gap-1">Initial Setups Assigned</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3">
            <CheckboxGroup
              label="Select Activities"
              color="warning"
              value={initialSetupTasks.filter(task => task.completed).map(task => task.id.toString())}
              onChange={handleCheckboxChange}
            >
              {resource?.initialSetup?.setupTasks?.map((step) => (
                <Checkbox value={step.id.toString()} key={step.id}>{step.name}</Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleInitialSetupSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ListOfInitialSetupsAssigned