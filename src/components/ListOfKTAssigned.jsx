import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Tabs,
    Tab,
    Textarea,
    RadioGroup,
    Radio,
    useDisclosure,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    Card,
    CardBody,
    Input
} from "@nextui-org/react";
import { fetchResourceById, updateKTPlan } from '../services/api';
import SingleActionItem from './SingleActionItem';
import AssignKT from './AssignKT';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { allItemsState, resourceByIdSelector, selectedResourceToCreateKT } from '../recoil/atom/manager/managerAtom';
import Loader from './loader/Loader';

const ListOfKTAssigned = ({ isOpen, onClose, KTs }) => {
    console.log("KYS: ", KTs);
    const [allItems, setAllItemsState] = useRecoilState(allItemsState);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    const [localKTItems, setLocalKTItems] = useState(KTs);
    const [resource, setResource] = useState();
    // const Thisresource = useRecoilValue(resourceByIdSelector());
    const [getUser, SetUser] = useRecoilState(selectedResourceToCreateKT);

    // Update local state when KTs prop changes
    useEffect(() => {
        setLocalKTItems(KTs);
    }, [KTs]);

    const handleStatusChange = (index, newStatus) => {
        const newItems = localKTItems.map((item, i) =>
            i === index ? { ...item, progress: newStatus, modified: true } : item
        );
        setLocalKTItems(newItems);
    };

    const handleRemarksChange = (index, newRemarks) => {
        const newItems = localKTItems.map((item, i) =>
            i === index ? { ...item, remarks: newRemarks, modified: true } : item
        );
        setLocalKTItems(newItems);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const modifiedItems = localKTItems.filter(item => item.modified);
            const responses = await Promise.all(modifiedItems.map(item =>
                updateKTPlan(item.id, {
                    progress: item.progress,
                    remarks: item.remarks,
                })
            ));

            // Check if all updates were successful
            if (responses.every(response => response)) {
                setAllItemsState((prevState) =>
                    prevState.map((resource) => {
                        if (resource.id == responses[0]?.resourceId) {
                            const updatedKTIds = new Set(responses.map((kt) => kt.id));
                            const filteredKTPlans = resource.ktPlans.filter((kt) => !updatedKTIds.has(kt.id));
                            return {
                                ...resource,
                                ktPlans: [...filteredKTPlans, ...responses],
                            };
                        }
                        return resource;
                    })
                );
                setLocalKTItems(prevItems => prevItems.map(item => ({ ...item, modified: false })));
                onClose();
            } else {
                console.error("Update failed for some items");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateKTClick = async () => {
        const resourceId = localKTItems.length > 0 ? localKTItems[0].resourceId : null;
        try {
            const resource = allItems.find(item => item.id == resourceId);
            console.log("resource items: ", resource);
            SetUser(resource);
            onOpen3();
        } catch (error) {
            console.error("Error fetching resource:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
            <ModalContent>
                {/* Overlay for loading */}
                {loading && (
                    <Loader />
                )}
                <div className="flex justify-between items-center">
                    <ModalHeader>
                        <h2>All KTs</h2>
                    </ModalHeader>
                    <ModalHeader className="mr-4">
                        <Button color="primary" onPress={handleCreateKTClick}>
                            Create a KT
                        </Button>
                        <AssignKT isOpen={isOpen3} onClose={onClose3} dataObject={{ fromTable: true, user: getUser }} />
                    </ModalHeader>
                </div>
                <ModalBody>
                    <Tabs
                        aria-label="KTs"
                        color="success"
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >
                        {localKTItems?.map((item, index) => (
                            <Tab key={index} title={item.name || "Placeholder KT"}>
                                <Card>
                                    <CardBody>
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
                                            placeholder="What is the KT about?"
                                            className="max-w pb-5"
                                            value={item.description}
                                        />
                                        <RadioGroup
                                            label="Select Status"
                                            orientation="horizontal"
                                            className='pb-5'
                                            value={item.progress}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                        >
                                            <Radio value="NOT_STARTED">Not Started</Radio>
                                            <Radio value="IN_PROGRESS">In Progress</Radio>
                                            <Radio value="COMPLETED">Completed</Radio>
                                        </RadioGroup>
                                        <Button
                                            color="secondary"
                                            onPress={onOpen2}
                                            className="my-4"
                                        >
                                            Action items related to this KT
                                        </Button>
                                        <Textarea
                                            label="Remarks"
                                            placeholder="Please add remarks"
                                            className="max-w pb-5"
                                            value={item.remarks}
                                            onChange={(e) => handleRemarksChange(index, e.target.value)}
                                        />
                                        <SingleActionItem isOpen={isOpen2} onClose={onClose2} item={item} />
                                    </CardBody>
                                </Card>
                            </Tab>
                        ))}
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose} disabled={loading}>
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
