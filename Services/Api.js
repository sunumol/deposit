
import axios from 'axios';

// --------- Base URL Start------------------
const baseURL = 'http://3.108.93.231:8383/'
const baseURL2 = 'http://3.108.93.231:8686/'
const baseURL3 = 'http://3.108.93.231:8086/'
// --------- Base URL End--------------------
const baseURLDPD = 'http://3.108.93.231:8084/'

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
    return axios.post(`${baseURL}agentRegister`, data, {
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


  // --------------- Trust curcle added members ----------------------
  getCustomerListForTc: data => {
    return axios.post(`${baseURL2}getCustomerListForTc`, data, {
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

  //--------------------- DPDOverview -----------------------------
  DPDOverview: (EMPID, Sort) => {
    console.log("empid,dpd", EMPID, Sort)
    return axios.get(`${baseURLDPD}dpdOverview/${EMPID}/${Sort}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  //------------ Dashboard summary ---------------------
  DashBoardSummary: (EMPID) => {
    console.log("empid,dpd", EMPID)
    return axios.get(`${baseURLDPD}summary/${EMPID}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  //--------------------Dashboard Target---------------
  DashBoardTarget: (EMPID) => {
    console.log("empid,dpd", EMPID)
    return axios.get(`${baseURLDPD}target/${EMPID}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get tcdetaile data ---------------------
  getDLEschedule: data => {
    return axios.post(`${baseURL2}getTcDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ Schedule DLE ---------------------
  ScheduleDLE: data => {
    return axios.post(`${baseURL2}scheduleDle`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  // ------------------ Conduct DLE  basic detail---------------------
  ConductDLEbasicdetail: data => {
    return axios.post(`${baseURL2}conductDleBasicDetail`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Village list---------------------
  getVillage: data => {
    return axios.post(`${baseURL2}village`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get post office list---------------------
  getpostoffice: data => {
    return axios.post(`${baseURL2}postOffice`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ save basic DLE details---------------------
  savebasicdetail: data => {
    return axios.post(`${baseURL2}saveOrUpdateBasicDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Spouse details---------------------
  getSpousedetail: data => {
    return axios.post(`${baseURL2}getSpouseDetail`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

    // ------------------ get Spouse details---------------------
    getCustomerdetail: data => {
      return axios.post(`${baseURL2}getCustomerDetails`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    },
  // ------------------ get Residence owner details---------------------
  getResidenceowner: data => {
    return axios.post(`${baseURL2}getCurrentResidenceOwner`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ upload file image---------------------
  uploadFile: data => {
    return axios.post(`${baseURL2}uploadFile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },

    })
  },

  // ------------------ save and update Residence Owner  details---------------------
  UpdateResidenceowner: data => {
    return axios.post(`${baseURL2}saveOrUpdateCurrentResidenceOwner`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ get Continue Gurantor details---------------------
  getCGdetails: data => {
    return axios.post(`${baseURL2}getCGDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ verify Continue Gurantor details---------------------
  verifyCG: data => {
    return axios.post(`${baseURL2}verifyContinuingGuarantor`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ verify  OTP Continue Gurantor details---------------------
  verifyCGOTP: data => {
    return axios.post(`${baseURL2}verifyCGOtp`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  get CG voter id details---------------------
  getCGvoterid: data => {
    return axios.post(`${baseURL2}getCCVoterId`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save CG voter id details---------------------
  saveCGvoterid: data => {
    return axios.post(`${baseURL2}saveCGVoterIds`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  getVehicleDetails details---------------------
  getVehicleDetails: data => {
    return axios.post(`${baseURL2}getVehicleDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  fetchVehicleDetailsForDle details---------------------
  fetchVehicleDetailsForDle: data => {
    return axios.post(`${baseURL2}fetchVehicleDetailsForDle`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save VehicleDetails details---------------------
  saveVehicleDetails: data => {
    return axios.post(`${baseURL2}saveOrUpdateVehicleDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save getEnergyUtilities details---------------------
  getEnergyUtilities: data => {
    return axios.post(`${baseURL2}getEnergyUtilities`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save EnergyUtilities details---------------------
  saveEnergyUtilities: data => {
    return axios.post(`${baseURL2}saveOrUpdateEnergyUtilities`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save getIncomeDetails details---------------------
  getIncomeDetails: data => {
    return axios.post(`${baseURL2}getIncomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------  save IncomeDetails details---------------------
  saveIncomeDetails: data => {
    return axios.post(`${baseURL2}saveOrUpdateIncomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------   getHousePhoto details---------------------
  getHousePhoto: data => {
    return axios.post(`${baseURL2}getHousePhoto`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------   saveOrUpdateHousePhoto details---------------------
  saveHousePhoto: data => {
    return axios.post(`${baseURL2}saveOrUpdateHousePhoto`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


    // ------------------   DeleteHousePhoto details---------------------
    DeleteHousePhoto: data => {
      return axios.post(`${baseURL2}deleteHousePhoto`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    },

  // ------------------   getDlePageNumber details---------------------
  getDlePageNumber: data => {
    return axios.post(`${baseURL2}getDlePageNumber`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  // ------------------   get agent Profile details---------------------
  getAgentProfile: data => {

    return axios.get(`${baseURL}agentProfile/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  // ------------------ getCorrection details---------------------
  getCorrectionDetails: data => {
    return axios.post(`${baseURL2}getCorrectionPages`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ------------------ getCorrection Dle Page---------------------
  getCorrectionDLEPage: data => {
    return axios.post(`${baseURL2}getDlePageNumber`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  // ---------------- Reschedule Api ---------------------------------
  setReshedule: data => {
    return axios.post(`${baseURL2}reScheduleActivityToNextSlot`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

   // ---------------- Firebase Token Api ---------------------------------
   firebaseToken: data => {
    return axios.post(`${baseURL2}updateAgentToken`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },

  getCollection: data => {

    return axios.post(`${baseURL3}pendingCollections`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  // ------------------   collection listing---------------------
  getActiveLoansdetails: data => {

    return axios.get(`${baseURL3}activeLoans/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },



  // ------------------   loanPaymentHistory listing---------------------
  getloanPaymentHistory: data => {

    return axios.get(`${baseURL3}loanPaymentHistory/${data.loanId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  // ------------------   collection listing---------------------
  getloantrend: data => {

    return axios.post(`${baseURL3}loanTrend`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getCustomerProfile: data => {

    return axios.get(`${baseURL3}customerProfile/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getTrustcircledetails: data => {

    return axios.get(`${baseURL3}trustCircleDetails/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getcompletedCollections: data => {

    return axios.get(`${baseURL3}completedCollections/${data.agentId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
};

