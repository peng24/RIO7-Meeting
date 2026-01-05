import axios from 'axios';
import { GAS_UPLOAD_URL } from '../firebase/config';

export const uploadToAdminDrive = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64String = reader.result.split(',')[1]; // Remove "data:mime/type;base64," prefix
        
        const payload = {
          filename: file.name,
          mimeType: file.type,
          file: base64String,
        };

        // Use custom axios config to avoid CORS preflight issues if possible, 
        // though standard POST might still trigger it depending on the server.
        // The user specified: "Content-Type: text/plain"
        const response = await axios.post(GAS_UPLOAD_URL, payload, {
          headers: {
            'Content-Type': 'text/plain', 
          },
        });

        if (response.data && response.data.url) {
          resolve(response.data.url);
        } else {
          reject(new Error('No URL returned from GAS'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
