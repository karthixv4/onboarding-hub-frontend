import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  useDisclosure,
  DateRangePicker,
} from "@nextui-org/react";
import SingleActionItem from './SingleActionItem';
import { parseDate } from "@internationalized/date";
import { updateKTPlan } from "../services/api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedKTAtom,ktDataAtom } from "../recoil/atom/user/userAtoms";
import UserSingleActionItem from "./UserSingleActionItem";

export default function SingleKT({ onClose, isOpen, kt }) {
  // Helper function to convert ISO 8601 to 'yyyy-mm-dd'
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const { isOpen: isSecondModalOpen, onOpen: openSecondModal, onClose: closeSecondModal } = useDisclosure();
  const [selectedKT, setSelectedKT] = useRecoilState(selectedKTAtom);
  const [ktData, setKtData] = useRecoilState(ktDataAtom); 
  
  const handleNewOnClick = () => {
    openSecondModal();
  };

  const handleUpdate = async () => {
    const payload = {
      progress: selectedKT?.progress,
      remarks: selectedKT?.remarks,
    };

    try {
      const updated = await updateKTPlan(kt?.id, payload);

      setSelectedKT(updated);

      const updatedKtData = ktData.map((item) =>
        item.id === kt.id ? { ...item, ...updated } : item
      );
      setKtData(updatedKtData); 
    } catch (error) {
      console.error("Error occurred:", error);
    }finally{
      onClose()
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2>{kt ? kt.name : "Details"}</h2>
          </ModalHeader>
          <ModalBody>
            {kt && (
              <>
                <Textarea
                  isDisabled
                  label="Description"
                  placeholder="What is this KT about?"
                  className="max-w"
                  value={kt.description}
                />
                <DateRangePicker
                  isReadOnly
                  defaultValue={{
                    start: parseDate(formatDate(selectedKT?.startDate)),
                    end: parseDate(formatDate(selectedKT?.endDate)),
                  }}
                  label="Date Range"
                />
              </>
            )}

            <RadioGroup
              label="Select Status"
              orientation="horizontal"
              value={selectedKT?.progress || "NOT_STARTED"}
              onChange={(e) => setSelectedKT((kt) => (
                {
                  ...kt,
                  progress: e.target.value
                }
              ))}
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
              Action items related to this
            </Button>

            <Textarea
              label="Remarks"
              value={selectedKT?.remarks || ""}
              onChange={(e) => setSelectedKT((kt) => (
                {
                  ...kt,
                  remarks: e.target.value
                }
              ))}
              placeholder="Enter your remarks"
              variant="bordered"
              rows={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal (SingleActionItem) */}
      <UserSingleActionItem
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal} // Pass actual action items
      />
    </>
  );
}
