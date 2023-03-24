
import axios from 'axios';
const baseURL = 'http://3.108.93.231:8383/'

export const api = {

  // ---------------- get HomeScreen Api -----------------
  homeScreenApi: data => {
    return axios.post(`${baseURL}getHomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- get NewLead Village Api -----------------
  getNewLeadVillage: data => {
    return axios.post(`${baseURL}village`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- New Lead Api -----------------
  createLead: data => {
    return axios.post(`${baseURL}lead`, data, {
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

  // ---------------- Activity Screen Listing Api -----------------
  activitylistingscreenApi: data => {
    return axios.post(`${baseURL}getActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ Update Activity -----------------------
  updateActivity: data => {
    return axios.post(`${baseURL}updateActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Cgt Slot data ---------------------
  getCGTslot: data => {
    return axios.post(`${baseURL}getCGTSlot`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Cgt Customet List data ---------------------
  getCustomerList: data => {
    return axios.post(`${baseURL}getCustomerForEmployee`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT get Details ----------------------
  getCGTDetails: data => {
    return axios.post(`${baseURL}getCgtDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT Members Details ----------------------
  getCGTDetailsTCMembers: data => {
    return axios.post(`${baseURL}getCgtDetailsTrustCircleMember`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------ CGT TC Limit Details ----------------------
  getTCLimitCount: () => {
    return axios.get(`${baseURL}getTcCount`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // --------------- createTrustCircle Verify ----------------------
  createTrustCircles: data => {
    return axios.post(`${baseURL}createTrustCircle`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

};

