import React, { useEffect } from "react";
import {
    Card, CardHeader, CardBody, CardFooter, Avatar, Button, Select, SelectItem, Input,
    RadioGroup, Radio, Switch, useDisclosure,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link,
    CheckboxGroup, Checkbox
} from "@nextui-org/react";
import { selectedUserState, userListState } from "../recoil/atom/atoms";
import { useRecoilState } from "recoil";
import { AssignInitialTasks, fetchAllUsers, onBoardUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ResourceInfo() {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const [userList, setUserList] = useRecoilState(userListState);
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [selected, setSelected] = React.useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch user data from API on component load
        async function getAllUsers() {
            const users = await fetchAllUsers();
            const filteredUsers = users.filter(user => user.onBoardingStartedFlag !== true);
            setUserList(filteredUsers);
        }
        getAllUsers();
    }, [setUserList]);

    // Update email, name, and username fields when a user is selected
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
        if(checked){
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
        event.preventDefault();
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
            <Card className="max-w p-10 m-10 mr-40 ml-40">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {selectedUser?.name || "Zoey Lang"}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                                {selectedUser?.email || "@zoeylang"}
                            </h5>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <form className="max-w mx-40 my-2" onSubmit={handleSubmit}>
                        <div className="mb-5">
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
                        </div>
                        <Input
                            type="email"
                            label="Email Address"
                            value={selectedUser?.email || ""}
                            className="mb-5"
                            disabled
                        />
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="role"
                                id="floating_text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedUser?.role || ""}
                                onChange={(e) => handleValueChange(e)}
                                required
                            />
                            <label
                                htmlFor="floating_text"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Role
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="team"
                                id="floating_repeat_text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedUser?.team || ""}
                                onChange={(e) => handleValueChange(e)}
                                required
                            />
                            <label
                                htmlFor="floating_repeat_text"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Team
                            </label>
                        </div>
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
                                {!isOpen && !selectedUser?.isCompleted && (
                                    <Button className="ml-4" auto onPress={onOpen}>
                                        Assign Intial Setup
                                    </Button>
                                )}

                                <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
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
                                                        Sign in
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                        <Button type="submit" color="primary" className="w-full">
                            Submit
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="gap-3">
                    {/* Add any buttons or actions here */}
                </CardFooter>
            </Card>
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

