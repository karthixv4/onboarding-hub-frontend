import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, RadioGroup, Radio, Switch, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { selectedUserState, userListState } from "../recoil/atom/atoms";
import { useEffect } from "react";
import { AssignInitialTasks, fetchAllUsers, onBoardUser } from "../services/api";

export default function OnboardUser({ isOpen, onClose }) {
    const [userList, setUserList] = useRecoilState(userListState);
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const resetSelectedUser = useResetRecoilState(selectedUserState);
     const { isOpen: isOpen2, onOpen:onOpen2, onClose:onClose2 } = useDisclosure();
    useEffect(() => {
        async function getAllUsers() {
            const users = await fetchAllUsers();
            const filteredUsers = users.filter(user => user.onBoardingStartedFlag !== true);
            setUserList(filteredUsers);
        }
        getAllUsers();
        return () => {
            resetSelectedUser();
        }
    }, [setUserList]);

    const handleUserChange = (id) => {
        const user = userList.find((u) => u.id == id);
        if (user) setSelectedUser(user);
    };

    const handleValueChange = (e) => {
        const { name, value } = e.target
        setSelectedUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleISChange = (newValues) => {

        const updatedSetup = newValues.map((id) => {
            const step = initialSetupSteps.find((step) => step.id === id);
            return step ? { id: step.id, name: step.name, description: step.description } : null;
        }).filter(Boolean);

        setSelectedUser((prev) => ({
            ...prev,
            initialSetup: updatedSetup,
        }));
    };


    const handleStatusChange = (value) => {
        setSelectedUser(prev => ({
            ...prev,
            status: value.target.value,
        }));
    };

    const handleToggleChange = (checked) => {
        if (checked) {
            setSelectedUser((prev) => ({
                ...prev,
                initialSetup: [],
            }));
        }
        setSelectedUser(prev => ({
            ...prev,
            isCompleted: checked.target.checked,
        }));
    };

    const sendInitialTasks = async (resourceId) => {
        const selectedTasks = selectedUser?.initialSetup?.map(({ name, description }) => ({
            name,
            description
        })) || [];

        // Only send API request if there are selected tasks
        if (selectedTasks.length > 0) {
            try {
                const payload = {
                    setupTasks: selectedTasks,
                    setupCompleted: false,
                    resourceId: resourceId
                }
                const response = await AssignInitialTasks(payload);

            } catch (error) {
                console.error("Error sending initial tasks:", error);
            }
        } else {
            console.log("No tasks selected; API call not needed.");
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        onClose();
        const userData = {
            userId: selectedUser?.email,
            onboardingStatus: selectedUser?.status,
            setupCompleted: selectedUser?.isCompleted || false,
            team: selectedUser?.team,
            position: selectedUser?.role
        };


        try {
            const response = await onBoardUser(userData); // Make the POST call
            if (response) {
                await sendInitialTasks(response.id);
                navigate("/dashboard");
            }

        } catch (error) {
            console.error("Error submitting user data:", error);
        }
    };
    const selectedIds = selectedUser?.initialSetup?.map((step) => step.id) || [];


    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Select
                                    placeholder="Select a User"
                                    onChange={(e) => handleUserChange(e.target.value)}
                                    className="w-full"
                                    aria-label="to select a user"
                                >
                                    {userList.map((user) => (
                                        <SelectItem key={user.id} value={user.id}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    value={selectedUser?.email || ""}
                                    className="mb-5"
                                    disabled
                                />
                                <Input
                                    type="text"
                                    label="Role"
                                    name="role"
                                    value={selectedUser?.role || ""}
                                    className="mb-5"
                                    onChange={(e) => handleValueChange(e)}
                                    required
                                />
                                <Input
                                    type="text"
                                    label="Team"
                                    name="team"
                                    value={selectedUser?.team || ""}
                                    className="mb-5"
                                    onChange={(e) => handleValueChange(e)}
                                    required
                                />
                                <div className="mb-5">
                            {/* Onboarding Status Section */}
                            <div className="relative z-0 w-full mb-5">
                                <RadioGroup
                                    label="Onboarding Status"
                                    orientation="horizontal"
                                    value={selectedUser?.status || ''}
                                    onChange={handleStatusChange}
                                >
                                    <Radio value="NOT_STARTED">Not Started</Radio>
                                    <Radio value="IN_PROGRESS">In Progress</Radio>
                                    <Radio value="COMPLETED">Completed</Radio>
                                </RadioGroup>
                            </div>

                            {/* Completed Toggle Section */}
                            <div className="relative z-0 w-full mb-5 flex items-center">
                                <span className="mr-2">Intial Setup Completed ?</span>
                                <Switch
                                    checked={selectedUser?.isCompleted || false}
                                    onChange={handleToggleChange}
                                />
                                {!isOpen2 && !selectedUser?.isCompleted && (
                                    <Button className="ml-4" auto onPress={onOpen2}>
                                        Assign Intial Setup
                                    </Button>
                                )}

                                <Modal
                                    isOpen={isOpen2}
                                    onOpenChange={onClose2}
                                    placement="top-center"
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Assign Initial Setup</ModalHeader>
                                                <ModalBody>
                                                    <div className="flex flex-col gap-3">
                                                        <CheckboxGroup
                                                            label="Select Activities"
                                                            color="warning"
                                                            value={selectedIds} // Pass only the IDs of selected items
                                                            onValueChange={handleISChange}
                                                        >
                                                            {initialSetupSteps.map((step) => (
                                                                <Checkbox value={step.id} key={step.id}>{step.name}</Checkbox>
                                                            ))}
                                                        </CheckboxGroup>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="flat" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Button color="primary" onPress={onClose}>
                                                        Assign
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Onboard
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const initialSetupSteps = [
    {
        id: 1,
        name: "Profile Creation",
        description: "Ensure that the resource's profile is created in the system with all relevant personal and professional details."
    },
    {
        id: 2,
        name: "Office Access",
        description: "Provide the resource with access to office premises, including ID badges and necessary security clearances."
    },
    {
        id: 3,
        name: "Software Installation",
        description: "Install necessary software required for the resource's role, specifying the exact software and versions needed."
    }
];

