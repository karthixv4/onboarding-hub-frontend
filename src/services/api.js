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