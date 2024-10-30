import { atom } from 'recoil';

export const userState = atom({
  key: 'userState', // unique ID
  default: {
    name: '',
    email: '',
    password: '',
    role: 'resource',
  },
});

export const responseState = atom({
  key: 'responseState', // unique ID
  default: null, // to store API response
});

export const resourceForm = atom({
  key: "resourceForm",
  default: {
    email: "",
    role: "",
    team: "",
    manager: "",
    location: "",
    phone: "",
    joiningDate: "",
    trainingStartDate: ""
  }
});

export const KTDataAtom = atom({
  key: 'KTDataAtom',
  default: {
    name: '',
    assignee: 0,
    description: '',
    status: 'Not Started',
    dateRange: null,
    remarks: ''
  },
});

// Atom for storing the list of users
export const userListState = atom({
  key: "userListState", // Unique ID (with respect to other atoms/selectors)
  default: [], // Default value (initial state)
});

// Atom for storing the currently selected user
export const selectedUserState = atom({
  key: "selectedUserState", // Unique ID (with respect to other atoms/selectors)
  default: null, // Default value (initial state)
});