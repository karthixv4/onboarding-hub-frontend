import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Divider,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchInitialSetupSelector, initialSetups } from "../recoil/atom/user/userAtoms";
import { UpdateInitialTasks } from "../services/api";


const InitialSetup = () => {
  const [allSetups, setAllSetups] = useRecoilState(initialSetups);
  const fetchInitialSetup = useRecoilValue(fetchInitialSetupSelector);

  useEffect(() => {
    // Set the fetched data into the atom
    setAllSetups(fetchInitialSetup);
  }, [fetchInitialSetup, setAllSetups]);

  const handleTaskToggle = async (taskId) => {
    const updatedTasks = allSetups.setupTasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, completed: !task.completed }; // Toggle the completion status
      }
      return task; // Return other tasks unchanged
    });

    const setupCompleted = updatedTasks.every((task) => task.completed); // Check if all tasks are completed

    const payload = {
      setupCompleted,
      setupTasks: updatedTasks
    };

    try {
      // Send the update request to the API
      await UpdateInitialTasks(fetchInitialSetup.id, payload);

      // Update Recoil state with the new tasks
      setAllSetups((prev) => ({ ...prev, setupTasks: updatedTasks, setupCompleted }));
    } catch (error) {
      console.error("Error updating setup tasks:", error);
      // Handle error as needed (e.g., show notification)
    }
  };

  return (
    <div className="py-12 px-5 mx-auto text-center">
      <div className="mb-20">
        <h1 className="text-3xl font-semibold mb-4">Initial Setups</h1>
        <p className="lg:w-2/3 mx-auto text-base leading-relaxed text-gray-700">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {allSetups.setupTasks?.map((card, index) => (
          <Card key={index} className="m-4 w-full sm:w-1/2 lg:w-1/4">
            <CardHeader className="text-lg font-medium">{card.name}</CardHeader>
            <Divider />
            <CardBody>
              <p className="leading-relaxed text-base mb-4">{card.description}</p>
              <Button
                variant="flat"
                color="primary"
                className="inline-flex items-center"
                onClick={() => handleTaskToggle(card.id)} // Handle the button click
              >
                {card.completed ? "Revert status" : "Mark as Completed"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Button className="mt-16 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg">Button</Button>
    </div>
  );
};

export default InitialSetup;
