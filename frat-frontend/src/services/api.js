// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getAttendanceData = async () => {
  try {
    const response = await axios.get(`${API_URL}/attendance`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};

// Add other API functions as needed
export const getStudentData = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export const postAttendanceData = async (attendanceRecord) => {
  try {
    const response = await axios.post(`${API_URL}/attendance`, attendanceRecord);
    return response.data;
  } catch (error) {
    console.error('Error posting attendance data:', error);
    throw error;
  }
};
