// managerAtom.js
import { atom, selector, selectorFamily } from "recoil";
import { fetchAllResourcesWithKT } from "../../../services/api";

// Atom to store the fetched resource data
export const allItemsState = atom({
  key: "allItemsState",
  default: selector({
    key: "fetchAllItems",
    get: async () => {
      try {
        const data = await fetchAllResourcesWithKT();
        console.log("DATA: ", data);
        return data;
      } catch (error) {
        console.error("Error fetching resources:", error);
        return [];
      }
    },
  }),
});

export const initialSetupTasksAtom = atom({
    key: 'initialSetupTasksAtom',
    default: [],
  });
  

  export const resourceCompletionPercentageSelector = selectorFamily({
    key: 'resourceCompletionPercentageSelector',
    get: (resourceId) => ({ get }) => {
      const allItems = get(allItemsState);
      const resource = allItems.find(item => item.id === resourceId);
      if (!resource) return { ktCompletion: 0, setupCompletion: 0 };
  
      const totalKTPlans = resource.ktPlans.length;
      const completedKTPlans = resource.ktPlans.filter(plan => plan.progress === 'COMPLETED').length;
      const completionKTPercentage = totalKTPlans > 0 ? (completedKTPlans / totalKTPlans) * 100 : 0;
  
      const totalSetupTasks = resource.initialSetup?.setupTasks.length;
      const completedSetupTasks = resource.initialSetup?.setupTasks.filter(task => task.completed).length;
      const completionTasksPercentage = totalSetupTasks > 0 ? (completedSetupTasks / totalSetupTasks) * 100 : 0;
      return {
        completedKTPlans: completedKTPlans,
        totalKTPlans: totalKTPlans,
        ktCompletion: completionKTPercentage,
        setupCompletion: completionTasksPercentage,
        totalSetupTasks: totalSetupTasks,
        completedSetupTasks: completedSetupTasks
      };
    },
  });

  export const updateKTPlanToAtomSelector = selectorFamily({
    key: 'resourceCompletionPercentageSelector',
    get: (resourceId) => ({ get }) => {
      const allItems = get(allItemsState);
      const resource = allItems.find(item => item.id === resourceId);
      if (!resource) return { ktCompletion: 0, setupCompletion: 0 };
  
      const totalKTPlans = resource.ktPlans.length;
      const completedKTPlans = resource.ktPlans.filter(plan => plan.progress === 'COMPLETED').length;
      const completionKTPercentage = totalKTPlans > 0 ? (completedKTPlans / totalKTPlans) * 100 : 0;
  
      const totalSetupTasks = resource.initialSetup.setupTasks.length;
      const completedSetupTasks = resource.initialSetup.setupTasks.filter(task => task.completed).length;
      const completionTasksPercentage = totalSetupTasks > 0 ? (completedSetupTasks / totalSetupTasks) * 100 : 0;
      return {
        completedKTPlans: completedKTPlans,
        totalKTPlans: totalKTPlans,
        ktCompletion: completionKTPercentage,
        setupCompletion: completionTasksPercentage,
        totalSetupTasks: totalSetupTasks,
        completedSetupTasks: completedSetupTasks
      };
    },
  });

  export const resourceByIdSelector = selectorFamily({
    key: 'resourceByIdSelector',
    get: (resourceId) => ({ get }) => {
      const allItems = get(allItemsState);
      // Find the resource that matches the provided resourceId
      const resource = allItems.find(item => item.id === resourceId);
      return resource || null; // Return the found resource or null if not found
    },
  });

  export const selectedResourceToCreateKT = atom({
    key: 'selectedResourceToCreateKT',
    default: [],
  });