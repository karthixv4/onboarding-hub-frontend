import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    useDisclosure,
    Checkbox,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { actionItems, ktDataAtom } from "../recoil/atom/user/userAtoms"; // Update the path as necessary
import { updateActionItem } from "../services/api";

export default function ActionItemsListUser({ userId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ktData, setKtData] = useRecoilState(ktDataAtom); // Use the atom for KT data
    const [allActionItems, setAllActionItems] = useRecoilState(actionItems);

    const handleRowClick = (item) => {
        onOpen(); // Open the modal
    };

    const handleCheckboxChange = async (item) => {
        const updatedCompletedStatus = !item.completed; // Toggle the completed status
        const ktPlanId = allActionItems[0].ktPlanId;
        try {
            const updated = await updateActionItem(item.id, { ...item, completed: updatedCompletedStatus });
            setKtData((prevKTData) =>
                prevKTData.map((kt) =>
                    kt.id === ktPlanId
                        ? {
                              ...kt,
                              actionItems: kt.actionItems.map((it) => (it.id === item.id ? updated : it)),
                          }
                        : kt
                )
            );
        } catch (error) {
            console.error("Error updating action item:", error);
        }
    };

    return (
        <div className="flex flex-col gap-3 mx-40 my-10">
            <h1 className="text-2xl font-semibold">My Action Items</h1>
            {allActionItems && allActionItems.length > 0 ? (
                <Table
                    color="primary"
                    selectionMode="single"
                    aria-label="Action Items Table"
                    className="dark text-foreground bg-background"
                >
                    <TableHeader>
                        <TableColumn>Change</TableColumn>
                        <TableColumn>Action Item</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {allActionItems.map((item) => (
                            <TableRow key={item.id} onClick={() => handleRowClick(item)}>
                                <TableCell>
                                    <Checkbox
                                        color="success"
                                        isSelected={item?.completed}
                                        onChange={() => handleCheckboxChange(item)} // Call the handler on checkbox change
                                    ></Checkbox>
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item?.completed ? "Finished" : "Unfinished"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No action items assigned.</p>
            )}
            {/* Optionally, include SingleKT if you need it for additional functionality */}
            {/* <SingleKT isOpen={isOpen} onClose={onClose} kt={selectedKT} /> */}
        </div>
    );
}
