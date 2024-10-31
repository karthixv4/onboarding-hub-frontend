// ktState.js
import { atom, selector, selectorFamily } from 'recoil';
import { FetchKTbyResourceId, getInitialSetupsByUser, updateKTPlan } from '../../../services/api';

// Atom to hold the KT data
export const ktDataAtom = atom({
    key: 'ktData', // Unique ID for this atom
    default: [],   // Default state is an empty array
});

// Selector to fetch KT data for a specific user
export const fetchKTDataSelector = selector({
    key: 'fetchKTData',
    get: async ({ get }) => {
        const userId = 30; // You may want to create an atom for userId as well
        const response = await FetchKTbyResourceId(userId);
        return response; // Return the fetched data
    },
});

export const selectedKTAtom = atom({
    key: 'selectedKTAtom',
    default: null, // Default value for selected KT
});

export const initialSetups = atom({
    key: 'initialSetups', 
    default:[]
})

export const fetchInitialSetupSelector = selector({
    key: 'fetchinitialSetupSelector',
    get: async ({ get }) => {
        const userId = 30;
        const response = await getInitialSetupsByUser(userId);
        return response; 
    },
});

export const selectedInitialSetup = atom({
    key: 'selectedInitialSetup',
    default: null, 
});