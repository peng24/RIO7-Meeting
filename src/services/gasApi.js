import axios from 'axios';
import { GAS_UPLOAD_URL } from '../firebase/config';

// Generic function to call Google Apps Script
const callGasApi = async (payload) => {
  // GAS requires POST data to be a stringified object and strictly prefers text/plain
  // to avoid triggering CORS preflight OPTIONS requests which it doesn't handle well.
  const response = await axios.post(GAS_UPLOAD_URL, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'text/plain', 
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
    ...eventData
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

// Update Event
export const updateEvent = async (eventId, eventData) => {
  const payload = {
    action: 'update_event',
    eventId: eventId,
    ...eventData
  };
  const result = await callGasApi(payload);
  if (result && result.status === 'success') {
    return result;
  } else {
    throw new Error(result?.message || 'Failed to update event');
  }
};

// [NEW] Get Event By ID
export const getEventById = async (eventId) => {
  const payload = {
    action: 'get_event_by_id',
    eventId: eventId
  };
  const result = await callGasApi(payload);
  if (result && result.status === 'success') {
    return result.data;
  } else {
    throw new Error(result?.message || 'Failed to fetch event');
  }
};

// [NEW] Get Events in Range
export const getEvents = async (startTime, endTime) => {
  const payload = {
    action: 'get_events',
    startTime: startTime,
    endTime: endTime
  };
  const result = await callGasApi(payload);
  if (result && result.status === 'success') {
    return result.data;
  } else {
    throw new Error(result?.message || 'Failed to fetch events');
  }
};
