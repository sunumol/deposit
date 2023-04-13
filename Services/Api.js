
import axios from 'axios';

// --------- Base URL Start------------------
const baseURL = 'http://3.108.93.231:8383/'
const baseURL2 = 'http://3.108.93.231:8686/'
// --------- Base URL End--------------------

export const api = {

  // ---------------- get HomeScreen Api -----------------
  homeScreenApi: data => {
    return axios.post(`${baseURL2}getHomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- get NewLead Village Api -----------------
  getNewLeadVillage: data => {
    return axios.post(`${baseURL2}village`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- New Lead Api -----------------
  createLead: data => {
    return axios.post(`${baseURL2}lead`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Logout Api -----------------
  logoutApi: data => {
    return axios.get(`${baseURL}logout/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Get Login Otp Api -----------------
  getLoginOtp: data => {
    return axios.post(`${baseURL}agentRegister`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Resend Otp Api -----------------
  resendLoginOtp: data => {
    return axios.post(`${baseURL}resendOtp`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- confirm Login Otp Api -------------
  confirmLoginOtp: data => {
    return axios.post(`${baseURL}confirm`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Get Forgot Api -----------------
  getForgotOtp: data => {
    return axios.post(`${baseURL}forgotPin`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Get Inavlid PinScreen APi call -----------------
  invalidPinApi: data => {
    return axios.get(`${baseURL}notifyCustomerForWrongPin/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Activity Screen Listing Api -----------------
  activitylistingscreenApi: data => {
    return axios.post(`${baseURL2}getActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ Update Activity -----------------------
  updateActivity: data => {
    return axios.post(`${baseURL2}updateActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ Update Activity -----------------------
  updateActivity: data => {
    return axios.post(`${baseURL2}updateActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Cgt Slot data ---------------------
  getCGTslot: data => {
    return axios.post(`${baseURL2}getCGTSlot`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Cgt Customet List data ---------------------
  getCustomerList: data => {
    return axios.post(`${baseURL2}getCustomerForEmployee`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT get Details ----------------------
  getCGTDetails: data => {
    return axios.post(`${baseURL2}getCgtDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT Members Details ----------------------
  getCGTDetailsTCMembers: data => {
    return axios.post(`${baseURL2}getCgtDetailsTrustCircleMember`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT TC Limit Details ----------------------
  getTCLimitCount: () => {
    return axios.get(`${baseURL2}getTcCount`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // --------------- createTrustCircle Verify ----------------------
  createTrustCircles: data => {
    return axios.post(`${baseURL2}createTrustCircle`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // --------------- create CGT ----------------------
  createCGT: data => {
    return axios.post(`${baseURL2}createOrUpdateCGT`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // --------------- Reject TrustCircle Members ----------------------
  rejectTrustCircleMembers: data => {
    return axios.post(`${baseURL2}verifyTcKyc`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

};

