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
    Radio
} from "@nextui-org/react";
import { updateActionItem } from '../services/api';
const ListOfKTAssigned = ({ isOpen, onClose, KTs }) => {
  
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [updatedItems, setUpdatedItems] = useState(KTs);
    useEffect(()=>{
            setUpdatedItems(KTs)
    },[KTs])
    console.log("KTT: ", updatedItems)
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

            const response = await fetch("YOUR_API_ENDPOINT_HERE", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentItem), // Send only the active item in the request payload
            });

            if (response.ok) {
                console.log("Update successful!");
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
                <ModalHeader>
                    <h2>All KTs</h2>
                </ModalHeader>
                <ModalBody>
                    <Tabs
                        aria-label="KTs"
                        color='success'
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >
                        {updatedItems?.map((item, index) => (
                            <Tab key={index} title={item.name}>
                                {console.log("SINGLE KT: " , item)}
                                <Card>
                                    <CardBody>
                                        <Input
                                            isDisabled
                                            type="text"
                                            label="Name"
                                            value={item.name}
                                            className="max-w-xs"
                                        />
                                        <Textarea
                                            isDisabled
                                            label="Action Item Description"
                                            placeholder="What is the action item?"
                                            className="max-w"
                                            value={item.description}
                                        />
                                        <RadioGroup
                                            label="Select Status"
                                            orientation="horizontal"
                                            value={item.progress}
                                            // onChange={handleStatusChange} // Updated for RadioGroup
                                        >
                                            <Radio value="NOT_STARTED">Not Started</Radio>
                                            <Radio value="IN_PROGRESS">In Progress</Radio>
                                            <Radio value="COMPLETED">Completed</Radio>
                                        </RadioGroup>
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
