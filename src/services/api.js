import axios from 'axios';

// Switch to enable or disable the delay
const DELAY_ENABLED = false; // Set to false to disable the delay

// Utility function to add a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to wrap API calls with a delay if enabled
const withDelay = async (apiCall, ...args) => {
  if (DELAY_ENABLED) {
    await delay(3000); // 3 seconds delay
  }
  return apiCall(...args);
};

export const registerUser = async (userData) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/auth/register', userData));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/auth/login', userData));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed'); // Handle errors
  }
};

export const addResource = async (resourceData) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/resources', resourceData, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Adding resource failed'); // Handle errors
  }
};

export const createKTPlan = async (data) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/kt', data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Creating KT plan failed'); // Handle errors
  }
};

export const createActionItem = async (data) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/actionItem', data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Creating action item failed'); // Handle errors
  }
};

export const updateActionItem = async (id, data) => {
  try {
    const response = await withDelay(() => axios.put(`http://localhost:5000/api/actionItem/${id}`, data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Updating action item failed'); // Handle errors
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await withDelay(() => axios.get('http://localhost:5000/api/user/all', { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Fetching users failed'); // Handle errors
  }
};

export const onBoardUser = async (data) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/resources/', data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Onboarding user failed'); // Handle errors
  }
};

export const fetchAllResources = async (signal = undefined) => {
  try {
    const response = await withDelay(() => axios.get('http://localhost:5000/api/resources', { signal, withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching resources failed'); // Handle errors
  }
};

export const AssignInitialTasks = async (data) => {
  try {
    const response = await withDelay(() => axios.post('http://localhost:5000/api/initialSetup/', data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Assigning initial tasks failed'); // Handle errors
  }
};

export const updateKTPlan = async (number, data) => {
  try {
    const response = await withDelay(() => axios.put(`http://localhost:5000/api/kt/${number}`, data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Updating KT plan failed'); // Handle errors
  }
};

export const fetchAllResourcesWithKT = async (signal = undefined) => {
  try {
    const response = await withDelay(() => axios.get('http://localhost:5000/api/resources/withKT', { signal, withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching resources with KT failed'); // Handle errors
  }
};

export const fetchResourceById = async (number) => {
  try {
    const response = await withDelay(() => axios.get(`http://localhost:5000/api/resources/${number}`, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Fetching resource by ID failed'); // Handle errors
  }
};

export const UpdateInitialTasks = async (number, data) => {
  try {
    const response = await withDelay(() => axios.put(`http://localhost:5000/api/initialSetup/${number}`, data, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Updating initial tasks failed'); // Handle errors
  }
};

export const FetchKTbyResourceId = async (number) => {
  try {
    const response = await withDelay(() => axios.get(`http://localhost:5000/api/kt/resource/${number}`, { withCredentials: true }));
    return response.data; // Return the response data if successful
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {}; // Return an empty object if 404 error
      // Alternatively, return [] if you expect an array
    }
    throw new Error(error.response?.data?.message || 'Fetching KT by resource ID failed'); // Handle other errors
  }
};


export const getInitialSetupsByUser = async (number) => {
  try {
    const response = await withDelay(() => axios.get(`http://localhost:5000/api/initialSetup/resource/${number}`, { withCredentials: true }));
    return response.data; // Return the response data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {}; // Return an empty object if 404 error
      // Alternatively, return [] if you expect an array
    }
    throw new Error(error.response.data.message || 'Fetching initial setups by user failed'); // Handle errors
  }
};

export const FetchAllKtPlan = async () => {
  try {
    const response = await withDelay(() => axios.get(`http://localhost:5000/api/kt/`, { withCredentials: true }));
    return response.data; // Return the response data if successful
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {};
    }
    throw new Error(error.response?.data?.message || 'Fetching KT by resource ID failed'); // Handle other errors
  }
};