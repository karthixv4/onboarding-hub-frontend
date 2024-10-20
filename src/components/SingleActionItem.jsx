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
    CardBody
} from "@nextui-org/react";
import { updateActionItem } from '../services/api';
const SingleActionItem = ({ isOpen, onClose, actionItems }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [updatedItems, setUpdatedItems] = useState(actionItems);

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
                    <h2>Action Items</h2>
                </ModalHeader>
                <ModalBody>
                    <Tabs
                        aria-label="Action Items"
                        color='success'
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >
                        {updatedItems.map((item, index) => (
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
                                                checked={item.completed}
                                                onChange={() => handleStatusChange(index)} // Toggle the status
                                            />
                                            <span className="ml-2">Completed</span>
                                        </div>
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

export default SingleActionItem;
