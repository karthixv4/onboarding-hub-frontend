import React, { useState } from 'react';
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
    useDisclosure
} from "@nextui-org/react";
import { updateActionItem } from '../services/api';
import AssignActionItem from './AssignActionItem';
const SingleActionItem = ({ isOpen, onClose, item }) => {

    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [updatedItems, setUpdatedItems] = useState(item?.actionItems);

    // Handle the status change of the switch for the currently active item
    const handleStatusChange = (index) => {
        const newItems = [...updatedItems];
        newItems[index].completed = !newItems[index].completed; // Toggle the completion status
        setUpdatedItems(newItems); // Update the state with new values
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Prepare the payload with only the active action item
            const currentItem = updatedItems[activeTab]; // Get the active action item
            const payload = {
                description: currentItem.description,
                completed: currentItem.completed
            }
            const response = await updateActionItem(currentItem.id, payload)

            if (response) {
                onClose();
                // Handle success (optional)
            } else {
                console.error("Update failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
            <ModalContent>
                <div className="flex justify-between items-center">
                    <ModalHeader>
                        <h2>Action Items</h2>
                    </ModalHeader>
                    <ModalHeader className="mr-4">
                    <Button color="primary" onPress={onOpen2}>
                        Assign one!
                    </Button>
                 <AssignActionItem isOpen={isOpen2} onClose={onClose2} dataObject={{ fromTable: true, resourceId: item?.resourceId, kt: item }} />
                    </ModalHeader>
                </div>
                <ModalBody>
                    <Tabs
                        aria-label="Action Items"
                        color='success'
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >

                        {!updatedItems?.length > 0 ? <Tab title="No Action Items">
                            <Card>
                                <CardBody>
                                    <h4>No action items assigned. You can create one.</h4>
                                    <Button color="primary" onPress={onOpen2}>
                                        Click here to create one
                                    </Button>
                                    <AssignActionItem isOpen={isOpen2} onClose={onClose2} dataObject={{ fromTable: true, resourceId: item?.resourceId, kt: item }} />
                                </CardBody>
                            </Card>
                        </Tab> :
                            updatedItems.map((item, index) => (
                                <Tab key={index} title={item.description}>
                                    <Card>
                                        <CardBody>
                                            <Textarea
                                                isDisabled
                                                label="Action Item Description"
                                                placeholder="What is the action item?"
                                                className="max-w"
                                                value={item.description}
                                            />
                                            <div className="flex items-center py-2">

                                                <Switch
                                                    isSelected={item.completed || false}
                                                    onChange={() => handleStatusChange(index)} // Toggle the status
                                                />
                                                <span className="ml-2">Completed</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                            ))
                        }
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

export default SingleActionItem;
