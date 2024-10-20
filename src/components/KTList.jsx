import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import SingleKT from "./SingleKT";

export default function KTList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKT, setSelectedKT] = useState(null); // State to hold the selected KT

  const handleRowClick = (kt) => {
    setSelectedKT(kt);
    onOpen(); // Open the modal
  };

  return (
    <div className="flex flex-col gap-3 mx-40 my-10">
      <Table
        color="primary"
        selectionMode="single"
        aria-label="Example static collection table"
        className="dark text-foreground bg-background"
      >
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Mentor</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {ktData.map((kt) => (
            <TableRow key={kt.id} onClick={() => handleRowClick(kt)}>
              <TableCell>{kt.title}</TableCell>
              <TableCell>{kt.mentor}</TableCell>
              <TableCell>{kt.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SingleKT isOpen={isOpen} onClose={onClose} kt={selectedKT} /> {/* Pass selected data to SingleKT */}
    </div>
  );
}

const ktData = [
    { id: "1", title: "Tony Reichert", mentor: "CEO", status: "Active" },
    { id: "2", title: "Zoey Lang", mentor: "Technical Lead", status: "Paused" },
    { id: "3", title: "Jane Fisher", mentor: "Senior Developer", status: "Active" },
    { id: "4", title: "William Howard", mentor: "Community Manager", status: "Vacation" },
  ];