import React, { useEffect } from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { ktDataAtom, fetchKTDataSelector, selectedKTAtom} from "../recoil/atom/user/userAtoms" // Update the path as necessary

export default function KTList({ userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ktData, setKtData] = useRecoilState(ktDataAtom); // Use the atom for KT data
  const fetchedKTs = useRecoilValue(fetchKTDataSelector); // Use the selector to fetch KT data
  const [selectedKT, setSelectedKT] = useRecoilState(selectedKTAtom);
  useEffect(() => {
    // Set the fetched data into the atom
    setKtData(fetchedKTs);
  }, [fetchedKTs, setKtData]);

  const handleRowClick = (kt) => {
    setSelectedKT(kt);
    onOpen(); // Open the modal
  };

  return (
    <div className="flex flex-col gap-3 mx-40 my-10">
      <h1 className="text-2xl font-semibold">My KT Plans</h1> 
      <Table
        color="primary"
        selectionMode="single"
        aria-label="Example static collection table"
        className="dark text-foreground bg-background"
      >
        <TableHeader>
          <TableColumn>KT Name</TableColumn>
          <TableColumn>KT Description</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {ktData.map((kt) => (
            <TableRow key={kt.id} onClick={() => handleRowClick(kt)}>
              <TableCell>{kt.name}</TableCell>
              <TableCell>{kt.description}</TableCell>
              <TableCell>{kt.progress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SingleKT isOpen={isOpen} onClose={onClose} kt={selectedKT} /> {/* Pass selected data to SingleKT */}
    </div>
  );
}
