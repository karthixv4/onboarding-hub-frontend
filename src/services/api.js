import axios from 'axios';

// Define the base URL for the API
//const API_BASE_URL = 'http://localhost:5000'; // Change this as needed
const API_BASE_URL = 'https://onboarding-hub-backend.vercel.app'
// Create an axios instance with the base URL and common options
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Automatically include credentials if needed
});

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

// API functions using the `api` instance
export const registerUser = async (userData) => {
  try {
    const response = await withDelay(() => api.post('/auth/register', userData));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await withDelay(() => api.post('/auth/login', userData));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const addResource = async (resourceData) => {
  try {
    const response = await withDelay(() => api.post('/resources', resourceData));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Adding resource failed');
  }
};

export const createKTPlan = async (data) => {
  try {
    const response = await withDelay(() => api.post('/kt', data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Creating KT plan failed');
  }
};

export const createActionItem = async (data) => {
  try {
    const response = await withDelay(() => api.post('/actionItem', data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Creating action item failed');
  }
};

export const updateActionItem = async (id, data) => {
  try {
    const response = await withDelay(() => api.put(`/actionItem/${id}`, data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Updating action item failed');
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await withDelay(() => api.get('/user/all'));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching users failed');
  }
};

export const onBoardUser = async (data) => {
  try {
    const response = await withDelay(() => api.post('/resources/', data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Onboarding user failed');
  }
};

export const fetchAllResources = async (signal = undefined) => {
  try {
    console.log("ABout to fetch");
    const response = await withDelay(() => api.get('/resources', { signal }));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching resources failed');
  }
};

export const AssignInitialTasks = async (data) => {
  try {
    const response = await withDelay(() => api.post('/initialSetup/', data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Assigning initial tasks failed');
  }
};

export const updateKTPlan = async (number, data) => {
  try {
    const response = await withDelay(() => api.put(`/kt/${number}`, data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Updating KT plan failed');
  }
};

export const fetchAllResourcesWithKT = async (signal = undefined) => {
  try {
    const response = await withDelay(() => api.get('/resources/withKT', { signal }));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching resources with KT failed');
  }
};

export const fetchResourceById = async (number) => {
  try {
    const response = await withDelay(() => api.get(`/resources/${number}`));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching resource by ID failed');
  }
};

export const fetchUserById = async (number) => {
  try {
    const response = await withDelay(() => api.get(`/user/${number}`));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching user by ID failed');
  }
};

export const UpdateInitialTasks = async (number, data) => {
  try {
    const response = await withDelay(() => api.put(`/initialSetup/${number}`, data));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Updating initial tasks failed');
  }
};

export const FetchKTbyResourceId = async (number) => {
  try {
    const response = await withDelay(() => api.get(`/kt/resource/${number}`));
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {}; // Return an empty object if 404 error
    }
    throw new Error(error.response?.data?.message || 'Fetching KT by resource ID failed');
  }
};

export const getInitialSetupsByUser = async (number) => {
  try {
    const response = await withDelay(() => api.get(`/initialSetup/resource/${number}`));
    return response.data;
  } catch (error) {
    if (error.response?.status === 404 || error.response?.status === 500) {
      return {}; // Return an empty object if 404 or 500 error
    }
    throw new Error(error.response?.data?.message || 'Fetching initial setups by user failed');
  }
};

export const FetchAllKtPlan = async () => {
  try {
    const response = await withDelay(() => api.get('/kt/'));
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {}; // Return an empty object if 404 error
    }
    throw new Error(error.response?.data?.message || 'Fetching all KT plans failed');
  }
};
