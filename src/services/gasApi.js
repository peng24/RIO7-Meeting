import axios from 'axios';
import { GAS_UPLOAD_URL } from '../firebase/config';

// Generic function to call Google Apps Script
const callGasApi = async (payload) => {
  const response = await axios.post(GAS_UPLOAD_URL, payload, {
    headers: {
      'Content-Type': 'text/plain', // Avoid CORS preflight if possible, though GAS usually handles it
    },
  });
  return response.data;
};

// Upload File
export const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64String = reader.result.split(',')[1];
        const payload = {
          action: 'upload',
          filename: file.name,
          mimeType: file.type,
          file: base64String,
        };
        
        const result = await callGasApi(payload);
        
        if (result && result.url) {
          resolve(result.url);
        } else {
          reject(new Error(result?.error || 'No URL returned from GAS'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

// Create Event
export const createEvent = async (eventData) => {
  const payload = {
    action: 'create_event',
    title: eventData.title,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    description: eventData.description,
    location: eventData.location,
    creatorId: eventData.creatorId,
    creatorName: eventData.creatorName,
    type: eventData.type
  };
  
  const result = await callGasApi(payload);
  
  if (result && result.status === 'success') {
    return result;
  } else {
    throw new Error(result?.message || 'Failed to create event');
  }
};

// Delete Event
export const deleteEvent = async (eventId) => {
  const payload = {
    action: 'delete_event',
    eventId: eventId
  };
  
  const result = await callGasApi(payload);
  
  if (result && result.status === 'success') {
    return result;
  } else {
    throw new Error(result?.message || 'Failed to delete event');
  }
};
