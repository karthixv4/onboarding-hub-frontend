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
  useDisclosure
} from "@nextui-org/react";
import SingleActionItem from './SingleActionItem';
import Sample from "./Sample";

export default function SingleKT({ onClose, isOpen, kt }) {
  console.log("KT: ", kt)
  const [status, setStatus] = useState(kt ? kt.status : "NOT_STARTED");
  const [remarks, setRemarks] = useState("");
  const { isOpen: isSecondModalOpen, onOpen: openSecondModal, onClose: closeSecondModal } = useDisclosure();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNewOnClick = () => {
    console.log("Opening second modal");
    openSecondModal(); // This should open the second modal
  };

  const handleUpdate = async () => {
    const payload = {
      id: kt.id,
      status,
      remarks,
    };

    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Update successful!");
      } else {
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2>{kt ? kt.title : "Details"}</h2>
            <span>{kt ? kt.mentor : "N/A"}</span>
          </ModalHeader>
          <ModalBody>
            <RadioGroup
              label="Select Status"
              orientation="horizontal"
              value={status}
              onChange={handleStatusChange}
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
              Open Action Item Details
            </Button>

            <Textarea
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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
      <SingleActionItem
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal}
        actionItems={[
          { description: "Task 1", completed: false },
          { description: "Task 2", completed: true },
          { description: "Task 3", completed: false },
        ]}
      />
    </>
  );
}
