import React from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea,
    RadioGroup, Radio, DateRangePicker, Select, SelectItem
} from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import { KTDataAtom } from "../recoil/atom/atoms";
import axios from 'axios';
import { createKTPlan } from "../services/api";
export default function AssignKT({ isOpen, onClose }) {
    const [formData, setFormData] = useRecoilState(KTDataAtom);
    const handleSubmit = async () => {
        const { start, end } = formData.dateRange;
    
        try {
            // Create new Date objects for ISO format
            const startDate = new Date(start.year, start.month - 1, start.day); // month is 0-indexed
            const endDate = new Date(end.year, end.month - 1, end.day); // month is 0-indexed
    
            // Prepare the payload
            const payload = {
                resourceId: 1,
                description: formData.description,
                progress: formData.status,
                startDate: startDate.toISOString(), // Format to ISO 8601
                endDate: endDate.toISOString(),     // Format to ISO 8601
            };
    
            await createKTPlan(payload); // Adjust the API endpoint as necessary
            
            // Close the modal after successful submission
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error appropriately (e.g., show a notification)
        }
    };

    // Function to handle input changes
    const handleAssigneeChange = (value) => {
        setFormData(prev => ({
            ...prev,
            assignee: value.target.value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setFormData(prev => ({
            ...prev,
            description: value,
        }));
    };

    const handleStatusChange = (value) => {
        setFormData(prev => ({
            ...prev,
            status: value.target.value,
        }));
    };

    const handleDateRangeChange = (value) => {
        setFormData(prev => ({
            ...prev,
            dateRange: value,
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="top-center"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Assign KT</ModalHeader>
                        <ModalBody>
                            <Select
                                onChange={handleAssigneeChange} // Updated for Select
                                label="Select Assignee"
                                placeholder="Select an Assignee"
                                className="max-w"
                                items={animals}
                            >
                                {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                            </Select>
                            <Textarea
                                label="Description"
                                placeholder="What is this KT about?"
                                className="max-w"
                                onChange={(e) => handleDescriptionChange(e.target.value)} // Updated for Textarea
                            />
                            <RadioGroup
                                label="Select Status"
                                orientation="horizontal"
                                value={formData.status}
                                onChange={handleStatusChange} // Updated for RadioGroup
                            >
                                <Radio value="NOT_STARTED">Not Started</Radio>
                                <Radio value="IN_PROGRESS">In Progress</Radio>
                                <Radio value="COMPLETED">Completed</Radio>
                            </RadioGroup>
                            <DateRangePicker
                                label="Date"
                                className="max-w"
                                onChange={handleDateRangeChange} // Updated for DateRangePicker
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Assign
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
];
