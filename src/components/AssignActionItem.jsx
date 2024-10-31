import React, { useEffect, useState } from "react";
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
    SelectItem,
    Input
} from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import { KTDataAtom } from "../recoil/atom/atoms";
import { createActionItem, fetchAllResourcesWithKT, fetchResourceById } from "../services/api"; // Ensure this API function is defined

export default function AssignActionItem({ isOpen, onClose, dataObject }) {
    const [formData, setFormData] = useRecoilState(KTDataAtom);
    const [resources, setResources] = useState();
    const [selectedResource, setSelectedResource] = useState();
    useEffect(() => {
        async function getAllResources() {
            const resources = await fetchAllResourcesWithKT();
            setResources(resources);
        }

        async function getResourceById(id) {
            const resource = await fetchResourceById(id);
            setResources(resource);
        }



        if (dataObject.fromTable) {
            getResourceById(dataObject?.resourceId);
        } else {
            getAllResources();
        }

    }, [dataObject]);
    const handleSubmit = async () => {
        try {
            
            const payload = {
                ktPlanId: dataObject?.fromTable ? Number(dataObject?.kt?.id): Number(formData.selectedKT), // Update according to your form state
                description: formData.description,
                completed: formData.isCompleted || false,
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

    const handleAssigneeChange = (value) => {
        const id = value.target.value;
        const res = resources.find((resource) => resource.id == id);
        setFormData(prev => ({
            ...prev,
            assignee: res,
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

                            {!dataObject.fromTable ? <Select
                                onChange={handleAssigneeChange} // Updated for Select
                                label="Select Assignee"
                                placeholder="Select an Assignee"
                                className="max-w"
                                items={resources}
                            >
                                {(resource) => <SelectItem key={resource.id}>{resource.user.name}</SelectItem>}
                            </Select>
                                :
                                <Input
                                    isDisabled
                                    type="email"
                                    label="Email"
                                    defaultValue={resources.userEmail}
                                    className="max-w-xs"
                                />
                            }
                            {!dataObject.fromTable ?
                                <Select
                                    onChange={handleKTChange}
                                    label="Select KT"
                                    placeholder="Select a KT"
                                    className="max-w"
                                >
                                    {/* Replace with actual KTs */}
                                    {formData?.assignee?.ktPlans?.map(kt => (
                                        <SelectItem key={kt.id}>{kt.name || "placeholder KT name"}</SelectItem>
                                    ))}
                                </Select>
                                :
                                <Input
                                    isDisabled
                                    type="text"
                                    label="KT"
                                    defaultValue={dataObject?.kt?.name}
                                    className="max-w-xs"
                                />
                            }
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
