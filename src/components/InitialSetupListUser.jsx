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
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { actionItems, fetchInitialSetupSelector, initialSetups, ktDataAtom } from "../recoil/atom/user/userAtoms"; // Update the path as necessary
import { updateActionItem, UpdateInitialTasks } from "../services/api";

export default function InitialSetupListUser({ userId }) {
    const [allSetups, setAllSetups] = useRecoilState(initialSetups);
    const fetchInitialSetup = useRecoilValue(fetchInitialSetupSelector);

    useEffect(() => {
        // Set the fetched data into the atom
        setAllSetups(fetchInitialSetup);
    }, [fetchInitialSetup, setAllSetups]);

    const handleTaskToggle = async (taskId) => {
        const updatedTasks = allSetups.setupTasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed }; // Toggle the completion status
            }
            return task; // Return other tasks unchanged
        });

        const setupCompleted = updatedTasks.every((task) => task.completed); // Check if all tasks are completed

        const payload = {
            setupCompleted,
            setupTasks: updatedTasks,
        };

        try {
            // Send the update request to the API
            await UpdateInitialTasks(fetchInitialSetup.id, payload);

            // Update Recoil state with the new tasks
            setAllSetups((prev) => ({ ...prev, setupTasks: updatedTasks, setupCompleted }));
        } catch (error) {
            console.error("Error updating setup tasks:", error);
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRowClick = (item) => {
        onOpen(); // Open the modal
    };

    return (
        <div className="flex flex-col gap-3 mx-40 my-10">
            <h1 className="text-2xl font-semibold">My Initial Setups</h1>
            {allSetups?.setupTasks && allSetups.setupTasks.length > 0 ? (
                <Table
                    color="primary"
                    selectionMode="single"
                    aria-label="Initial Setup Table"
                    className="dark text-foreground bg-background"
                >
                    <TableHeader>
                        <TableColumn>Change</TableColumn>
                        <TableColumn>Initial Setup</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {allSetups.setupTasks.map((item) => (
                            <TableRow key={item.id} onClick={() => handleRowClick(item)}>
                                <TableCell>
                                    <Checkbox
                                        color="success"
                                        isSelected={item?.completed}
                                        onChange={() => handleTaskToggle(item.id)} // Call the handler on checkbox change
                                    ></Checkbox>
                                </TableCell>
                                <TableCell>
                                    <Popover placement="right" showArrow={true}>
                                        <PopoverTrigger>
                                            <Button>{item.name}</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2">
                                                <div className="text-small font-bold">{item.name}</div>
                                                <div className="text-tiny">{item.description}</div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>{item?.completed ? "Finished" : "Unfinished"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No initial setup tasks assigned.</p>
            )}
        </div>
    );
}
