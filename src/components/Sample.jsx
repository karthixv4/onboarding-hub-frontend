import React, { useState } from 'react';
import { Modal, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const Sample = () => {
  const { isOpen: isFirstModalOpen, onOpen: openFirstModal, onClose: closeFirstModal } = useDisclosure();
  const { isOpen: isSecondModalOpen, onOpen: openSecondModal, onClose: closeSecondModal } = useDisclosure();

  return (
    <>
      {/* Button to open the first modal */}
      <Button color="primary" onPress={openFirstModal}>
        Open First Modal
      </Button>

      {/* First Modal */}
      <Modal isOpen={isFirstModalOpen} onOpenChange={closeFirstModal}>
        <ModalContent>
          <ModalHeader>
            <h2>First Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is the content of the first modal.</p>
            {/* Button to open the nested modal */}
            <Button color="secondary" onPress={openSecondModal}>
              Open Second Modal
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={closeFirstModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal (nested modal) */}
      <Modal isOpen={isSecondModalOpen} onOpenChange={closeSecondModal}>
        <ModalContent>
          <ModalHeader>
            <h2>Second Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is the content of the second nested modal.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={closeSecondModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sample;
