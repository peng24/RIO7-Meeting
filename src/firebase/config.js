import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
export const GOOGLE_API_KEY = "AIzaSyAb-IbiElkNpcq6AGKhqsuYmaPDPpHEdV8";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgiwCi3yKlTaf8lhcRCYPLcHQD6syH1Ds",
  authDomain: "rio7-meeting.firebaseapp.com",
  projectId: "rio7-meeting",
  storageBucket: "rio7-meeting.firebasestorage.app",
  messagingSenderId: "856687113190",
  appId: "1:856687113190:web:8b0c575d70fa3f033d1c27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const GAS_UPLOAD_URL = "https://script.google.com/macros/s/AKfycbxMyIucnzGIvEDCTOPG4gcXEWwfXMbN_648OQcbUsXH8hrQCwMm4hSNsCPMSluUKMoDDg/exec";

export { auth };
