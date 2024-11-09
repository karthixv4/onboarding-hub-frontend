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
        const user = get(loggedInUser);
        const userId = user.id;
        if (!userId) return null; // Return null if no userId is set

        const response = await FetchKTbyResourceId(userId);
        return response;
    },
});


export const selectedKTAtom = atom({
    key: 'selectedKTAtom',
    default: null, 
});

export const initialSetups = atom({
    key: 'initialSetups', 
    default:[]
})

export const fetchInitialSetupSelector = selector({
    key: 'fetchinitialSetupSelector',
    get: async ({ get }) => {
        const user = get(loggedInUser);
        const userId = user.id;
        if (!userId) return null;
        const response = await getInitialSetupsByUser(userId);
        return response; 
    },
});

export const selectedInitialSetup = atom({
    key: 'selectedInitialSetup',
    default: null, 
});

export const actionItems = selector({
    key: 'actionItems',
    get: ({get}) =>{
        const KTs = get(ktDataAtom);
        if (Object.keys(KTs).length === 0) return null;
        console.log("KTD: ", KTs);
        const allActionItems = KTs?.flatMap(kt => kt.actionItems);
        return allActionItems
    }
})

export const isAuth = atom({
    key: 'isAuth',
    default: false
})

export const roleAtom = atom({
    key: 'roleAtom',
    default: {
        id: 0,
        role: ''
    }
})

export const loggedInUser = atom({
    key: 'loggedInUser',
    default:{}
})