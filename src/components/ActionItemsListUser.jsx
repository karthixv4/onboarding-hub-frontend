import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    useDisclosure,
    getKeyValue,
    Checkbox,
} from "@nextui-org/react";
import SingleKT from "./SingleKT";
import { useRecoilState } from "recoil";
import { actionItems, ktDataAtom } from "../recoil/atom/user/userAtoms" // Update the path as necessary
import { updateActionItem } from "../services/api";

export default function ActionItemsListUser({ userId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ktData, setKtData] = useRecoilState(ktDataAtom); // Use the atom for KT data
    const [allActionItems, setAllActionItems] = useRecoilState(actionItems);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const handleRowClick = (item) => {

        onOpen(); // Open the modal
    };
    const handleCheckboxChange = async (item) => {
        // Make a PUT request to update the action item
        const updatedCompletedStatus = !item.completed; // Toggle the completed status
        const ktPlanId = allActionItems[0].ktPlanId
        try {
          const updated = await updateActionItem(item.id, {...item, completed: updatedCompletedStatus }); 
          setKtData((prevKTData) => 
            prevKTData.map((kt) => 
              kt.id === ktPlanId
                ? {
                    ...kt,
                    actionItems: kt.actionItems.map((it) => 
                      it.id == item.id ? updated : it
                    ),
                  }
                : kt
            )
          );
          // Optionally, you may want to update the local state or refetch the action items here
        } catch (error) {
          console.error('Error updating action item:', error);
        }
    };

    return (
        <div className="flex flex-col gap-3 mx-40 my-10">
            <h1 className="text-2xl font-semibold">My Action Items</h1>
            <Table
                color="primary"
                selectionMode="single"
                aria-label="Example static collection table"
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
            {/* <SingleKT isOpen={isOpen} onClose={onClose} kt={selectedKT} />  */}
            {/* <Table 
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={allActionItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table> */}
        </div>
    );
}

const columns = [
    {
        key: "name",
        label: "NAME",
    },
    {
        key: "status",
        label: "STATUS",
    },
];