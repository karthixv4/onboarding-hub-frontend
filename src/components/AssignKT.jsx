import React, { useEffect, useState } from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea,
    RadioGroup, Radio, DateRangePicker, Select, SelectItem,
    Input
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { KTDataAtom } from "../recoil/atom/atoms";
import { createKTPlan, fetchAllResources } from "../services/api";
import { allItemsState, selectedResourceToCreateKT } from "../recoil/atom/manager/managerAtom";
import Loader from "./loader/Loader";

export default function AssignKT({ isOpen, onClose, dataObject }) {

    const [loading, setLoading] = useState(false);
    const [allItems, setAllItemsState] = useRecoilState(allItemsState);
    const [resources, setResources] = useState();
    const getUser = useRecoilValue(selectedResourceToCreateKT);
    useEffect(() => {
        console.log("All Items Updated: ", resources);
    }, [dataObject?.user]);

    const [formData, setFormData] = useRecoilState(KTDataAtom);
    const resetForm = useResetRecoilState(KTDataAtom);
    useEffect(() => {
        return () => {
            resetForm();
        }
    }, [])

    useEffect(() => {
        async function getAllResources() {
            try {
                const resources = await fetchAllResources();
                setResources(resources); // Ensure this is the correct structure
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        }
        if (dataObject.fromTable) {
            setResources(dataObject.user);
        } else {
            getAllResources();
        }
    }, [dataObject]);

    const handleSubmit = async () => {
        setLoading(true);
        const { start, end } = formData.dateRange;

        try {
            // Create new Date objects for ISO format
            const startDate = new Date(start.year, start.month - 1, start.day); // month is 0-indexed
            const endDate = new Date(end.year, end.month - 1, end.day); // month is 0-indexed


            const payload = {
                resourceId: Number(formData.assignee),
                description: formData.description,
                progress: formData.status,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                name: formData.name,
                remarks: formData.remarks
            };

            const response = await createKTPlan(payload);
            setAllItemsState((prevState) =>
                prevState.map((resource) => {
                    if (resource.id === response?.resourceId) {
                        console.log('Before Update:', resource.ktPlans); // Log before updating
                        const updatedKtPlans = [...resource.ktPlans, response];
                        console.log('After Update:', updatedKtPlans); // Log after updating
                        return {
                            ...resource,
                            ktPlans: updatedKtPlans, // Append response to existing ktPlans
                        };
                    }
                    return resource;
                })
            );
            console.log("All Items: ", allItems);
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false)
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
        if (dataObject.fromTable) {
            setFormData(prev => ({
                ...prev,
                assignee: getUser.id,
            }));
        }
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

    const handleNameChange = (value) => {
        setFormData(prev => ({
            ...prev,
            name: value,
        }));
    };

    const handleRemarksChange = (value) => {
        setFormData(prev => ({
            ...prev,
            remarks: value,
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
                {/* Overlay for loading */}
                {loading && (
                    <Loader />
                )}
                <ModalHeader className="flex flex-col gap-1">Assign KT</ModalHeader>
                <ModalBody>
                    {!dataObject.fromTable ? <Select
                        onChange={handleAssigneeChange} // Updated for Select
                        label="Select Assignee"
                        placeholder="Select an Assignee"
                        className="max-w"
                        items={resources || []}
                    >
                        {(resource) => <SelectItem key={resource.id}>{resource.user.name}</SelectItem>}
                    </Select>
                        :
                        <Input
                            isDisabled
                            type="email"
                            label="Email"
                            defaultValue={getUser?.user?.email}
                            className="max-w-xs"
                        />
                    }
                    <Input

                        type="text"
                        label="Name"
                        value={formData.name || ''}
                        placeholder="Name of KT"
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="max-w-xs"
                    />
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
                    <Textarea
                        label="Description"
                        placeholder="Any remarks ?"
                        className="max-w"
                        value={formData.remarks || ''}
                        onChange={(e) => handleRemarksChange(e.target.value)} // Updated for Textarea
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
            </ModalContent>
        </Modal>
    );
}
