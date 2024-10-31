import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
};

export const loginUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      return response.data; // Return the response data
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
    }
};

export const addResource = async(resourceData)=>{
  try {
    const response = await axios.post('http://localhost:5000/api/resources', resourceData);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const createKTPlan = async(data)=>{
  try {
    const response = await axios.post('http://localhost:5000/api/kt', data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const createActionItem = async(data)=>{
  try {
    const response = await axios.post('http://localhost:5000/api/actionItem', data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const updateActionItem=async(id, data)=>{
  try {
    const response = await axios.put(`http://localhost:5000/api/actionItem/${id}`, data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
}
}

export const fetchAllUsers=async()=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/user/all`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
}
}

export const onBoardUser = async(data)=>{
  try {
    const response = await axios.post('http://localhost:5000/api/resources/', data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const fetchAllResources = async (signal = undefined) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/resources`, { signal });
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Request failed'); // Handle errors
  }
};

export const AssignInitialTasks = async(data)=>{
  try {
    const response = await axios.post('http://localhost:5000/api/initialSetup/', data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const updateKTPlan = async(number,data)=>{
  try {
    const response = await axios.put(`http://localhost:5000/api/kt/${number}`, data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const fetchAllResourcesWithKT = async (signal = undefined) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/resources/withKT`, { signal });
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Request failed'); // Handle errors
  }
};

export const fetchResourceById = async(number)=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/resources/${number}`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const UpdateInitialTasks = async(number, data)=>{
  try {
    const response = await axios.put(`http://localhost:5000/api/initialSetup/${number}`, data);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}

export const FetchKTbyResourceId = async(number)=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/kt/resource/${number}`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}



export const getInitialSetupsByUser = async(number)=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/initialSetup/resource/${number}`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed'); // Handle errors
  }
}