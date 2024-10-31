import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Tabs,
    Tab,
    Textarea,
    Switch,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    Card,
    CardBody,
    Input,
    RadioGroup,
    Radio,
    useDisclosure
} from "@nextui-org/react";
import { fetchResourceById, updateActionItem, updateKTPlan } from '../services/api';
import SingleActionItem from './SingleActionItem';
import AssignKT from './AssignKT';

const ListOfKTAssigned = ({ isOpen, onClose, KTs }) => {
    console.log("KTs: ", KTs);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [updatedItems, setUpdatedItems] = useState(KTs);
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    const [resource, setResource]= useState();
    useEffect(() => {
        setUpdatedItems(KTs);
    }, [KTs]);

    const handleStatusChange = (index, newStatus) => {
        const newItems = [...updatedItems];
        newItems[index].progress = newStatus; // Update the progress status
        setUpdatedItems(newItems);
    };

    const handleRemarksChange = (index, newRemarks) => {
        const newItems = [...updatedItems];
        newItems[index].remarks = newRemarks; // Update the remarks for the specific tab
        setUpdatedItems(newItems);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const currentItem = updatedItems[activeTab]; // Get the active item

            const payload = {
                progress: currentItem.progress,
                remarks: currentItem.remarks
            }

            const response = await updateKTPlan(currentItem.id, payload);

            if (response) {
                // Move to the next tab if it exists, otherwise close the modal
                if (activeTab < updatedItems.length - 1) {
                    setActiveTab(activeTab + 1); // Move to the next tab
                } else {
                    onClose(); // Close the modal if there are no more tabs
                }
            } else {
                console.error("Update failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewOnClick = () => {
        onOpen2(); // This should open the second modal
    };

    const handleCreateKTClick = async () => {
        const resourceId = KTs.length > 0 ? KTs[0].resourceId : null;
        try{
            await fetchResourceById(resourceId).then((data)=>setResource(data))
        }catch(error){

        }finally{
            console.log("Resource: ", resource);
            onOpen3();
        }
       
        // setResource(resourceq)
        
      
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
            <ModalContent>
            <div className="flex justify-between items-center">
                <ModalHeader>
                    <h2>All KTs</h2>
                </ModalHeader>
                <ModalHeader className="mr-4">
                <Button color="primary" onPress={handleCreateKTClick}>
                       Create a KT
                    </Button>
                    <AssignKT isOpen={isOpen3} onClose={onClose3} dataObject={{fromTable: true, user: resource}} /> 
                </ModalHeader>
                </div>
                <ModalBody>
                    <Tabs
                        aria-label="KTs"
                        color="success"
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >
                        {updatedItems?.map((item, index) => (
                            <Tab key={index} title={item.name || "Placeholder KT"}>
                                <Card>
                                    <CardBody className=''>
                                        <Input
                                            isDisabled
                                            type="text"
                                            label="Name"
                                            value={item.name || "Placeholder KT"}
                                            className="max-w-xs pb-5"
                                        />
                                        <Textarea
                                            isDisabled
                                            label="KT Description"
                                            placeholder="What is the KT about ?"
                                            className="max-w pb-5"
                                            value={item.description}
                                        />
                                        <RadioGroup
                                            label="Select Status"
                                            orientation="horizontal"
                                            className='pb-5'
                                            value={item.progress}
                                            onChange={(e) => handleStatusChange(index, e.target.value)} // Update on status change
                                        >
                                            <Radio value="NOT_STARTED">Not Started</Radio>
                                            <Radio value="IN_PROGRESS">In Progress</Radio>
                                            <Radio value="COMPLETED">Completed</Radio>
                                        </RadioGroup>
                                        <Button
                                            color="secondary"
                                            onPress={handleNewOnClick}
                                            className="my-4"
                                        >
                                            Action items related to this KT
                                        </Button>
                                        <Textarea
                                            label="Remarks"
                                            placeholder="Please add remarks"
                                            className="max-w pb-5"
                                            value={item.remarks}
                                            onChange={(e) => handleRemarksChange(index, e.target.value)} // Update on remarks change
                                        />
                                        <SingleActionItem isOpen={isOpen2} onClose={onClose2} item={item} />
                                    </CardBody>
                                </Card>
                            </Tab>
                        ))}
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={handleSubmit} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </ModalFooter>
            </ModalContent>
            
        </Modal>
    );
};

export default ListOfKTAssigned;
