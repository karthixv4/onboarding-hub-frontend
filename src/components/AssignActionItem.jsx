import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
    Switch,
    Select,
    SelectItem
} from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import { KTDataAtom } from "../recoil/atom/atoms";
import { createActionItem } from "../services/api"; // Ensure this API function is defined

export default function AssignActionItem({ isOpen, onClose }) {
    const [formData, setFormData] = useRecoilState(KTDataAtom);

    const handleSubmit = async () => {
        try {
            const payload = {
                ktPlanId: 1, // Update according to your form state
                description: formData.description,
                isCompleted: formData.isCompleted,
            };

            await createActionItem(payload); // Adjust the API endpoint as necessary
            
            // Close the modal after successful submission
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error appropriately (e.g., show a notification)
        }
    };

    const handleKTChange = (value) => {
        setFormData(prev => ({
            ...prev,
            selectedKT: value.target.value, // Update the selected KT
        }));
    };

    const handleDescriptionChange = (value) => {
        setFormData(prev => ({
            ...prev,
            description: value,
        }));
    };

    const handleToggleChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            isCompleted: checked.target.checked,
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
                        <ModalHeader className="flex flex-col gap-1">Assign Action Item</ModalHeader>
                        <ModalBody>
                            <Select
                                onChange={handleKTChange}
                                label="Select KT"
                                placeholder="Select a KT"
                                className="max-w"
                            >
                                {/* Replace with actual KTs */}
                                {ktOptions.map(kt => (
                                    <SelectItem key={kt.key}>{kt.label}</SelectItem>
                                ))}
                            </Select>
                            <Textarea
                                label="Action Item Description"
                                placeholder="What is the action item?"
                                className="max-w"
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />
                            <div className="flex items-center py-2">
                                <Switch
                                    checked={formData.isCompleted}
                                    onChange={handleToggleChange}
                                />
                                <span className="ml-2">Completed</span>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Update
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

const ktOptions = [
    { key: "kt1", label: "KT Plan 1" },
    { key: "kt2", label: "KT Plan 2" },
    { key: "kt3", label: "KT Plan 3" },
    // Add more KT options as needed
];
