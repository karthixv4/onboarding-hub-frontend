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
      assignee: '',
      description: '',
      status: 'Not Started',
      dateRange: null,
  },
});