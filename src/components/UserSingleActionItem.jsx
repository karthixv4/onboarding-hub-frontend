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
} from "@nextui-org/react";
import { updateActionItem } from '../services/api';
import { useRecoilState } from 'recoil';
import { ktDataAtom, selectedKTAtom } from '../recoil/atom/user/userAtoms';
const UserSingleActionItem = ({ isOpen, onClose }) => {
    const [selectedKT, setSelectedKT] = useRecoilState(selectedKTAtom);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ktData, setKtData] = useRecoilState(ktDataAtom); 
  

    const handleStatusChange = (index) => {
        if (!selectedKT || !selectedKT.actionItems) return;
    
        const newActionItems = selectedKT.actionItems.map((item, i) => 
          i === index ? { ...item, completed: !item.completed } : item // Toggle completed status
        );
    
        setSelectedKT({
          ...selectedKT, 
          actionItems: newActionItems, 
        });
      };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log("Selected KT: ", selectedKT);
            const currentItem = selectedKT.actionItems[activeTab]; 
            const payload = {
                description: currentItem.description,
                completed: currentItem.completed
            }
            const response = await updateActionItem(currentItem.id, payload)
            setSelectedKT((prevKT) => {
                const updatedActionItems = prevKT.actionItems.map((item) =>
                  item.id === response.id ? { ...item, completed: response.completed } : item
                );
                // Return the updated selectedKT
                return {
                  ...prevKT,
                  actionItems: updatedActionItems,
                };
              });

              const updatedKtData = ktData.map((item) =>
                item.id === selectedKT.id ? selectedKT : item
              );
              setKtData(updatedKtData);

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
                </div>
                <ModalBody>
                    <Tabs
                        aria-label="Action Items"
                        color='success'
                        selectedValue={activeTab}
                        onSelectionChange={setActiveTab}
                    >

                        {!selectedKT?.actionItems?.length > 0 ? <Tab title="No Action Items">
                            <Card>
                                <CardBody>
                                    <h4>No action items assigned.</h4>
                               </CardBody>
                            </Card>
                        </Tab> :
                            selectedKT?.actionItems.map((item, index) => (
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

export default UserSingleActionItem;
