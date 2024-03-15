
import axios from 'axios';
import { API_KEY } from '@env'


///////////////////////////////////////////            DEV ENVIRONMENT                ///////////////////////////////////////
// const baseUAT = 'http://3.108.93.231:' //dev server

// const baseURL5 = `${baseUAT}8488/`;
// const baseURL = `${baseUAT}8383/`
// const baseURL2 = `${baseUAT}8686/`
// const baseURL3 = `${baseUAT}8086/`
// const baseURLDPD = `${baseUAT}8084/`
// const baseURLVersion = `${baseUAT}8810/`

///////////////////////////////////////////            STAGING ENVIRONMENT                ///////////////////////////////////////

// const baseUAT = 'https://seqa2fq5bb.execute-api.ap-south-2.amazonaws.com/stage'
// const baseUAT2= 'http://dhansethu-alb-2013531087.ap-south-2.elb.amazonaws.com/agentApp'
// const baseUAT3 = 'https://ex5116hrci.execute-api.ap-south-2.amazonaws.com/stage'


const baseUAT = 'https://l0nptyww7k.execute-api.ap-south-2.amazonaws.com/stage'
const baseUAT2 = 'http://dhansethu-alb-2013531087.ap-south-2.elb.amazonaws.com/agentApp'
const baseUAT3 = 'https://l0nptyww7k.execute-api.ap-south-2.amazonaws.com/stage'

const baseURL5 = `${baseUAT}/`;
const baseURL = `${baseUAT}/`
const baseURL2 = `${baseUAT}/`
const baseURL3 = `${baseUAT}/`
// --------- Base URL End--------------------
const baseURLDPD = `${baseUAT}/`
const baseURLVersion = `${baseUAT}/`
const baseURLIMG = `${baseUAT}/`
const baseURL6 = `${baseUAT3}/`


export const api = {

  // ---------------- get HomeScreen Api -----------------
  homeScreenApi: data => {
    return axios.post(`${baseURL2}getHomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  // ------------------ upload file image---------------------
  uploadFile: data => {
    //return axios.post(`${baseURLIMG}uploadFileAgent`, data, {                            //staging
    return axios.post(`${baseURL2}uploadFileAgent`, data, {                                 //dev + staging

      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        'x-api-key': API_KEY
      },

    })
  },
  // ---------------- get NewLead Village Api -----------------
  getNewLeadVillage: data => {
    return axios.post(`${baseURL2}village`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- New Lead Api -----------------
  createLead: data => {
    return axios.post(`${baseURL2}lead`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Logout Api -----------------
  logoutApi: data => {
    return axios.get(`${baseURL6}logout/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Get Login Otp Api -----------------
  getLoginOtp: data => {
    return axios.post(`${baseURL2}agentRegister`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Resend Otp Api -----------------
  resendLoginOtp: data => {
    return axios.post(`${baseURL2}resendOtpAgent`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- confirm Login Otp Api -------------
  confirmLoginOtp: data => {
    return axios.post(`${baseURL2}confirmAgent`, data, {
      // return axios.post(`${baseURL2}confirm`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Get Forgot Api -----------------
  getForgotOtp: data => {
    return axios.post(`${baseURL2}agentRegister`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Get Inavlid PinScreen APi call -----------------
  invalidPinApi: data => {
    return axios.get(`${baseURL}notifyCustomerForWrongPin/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Activity Screen Listing Api -----------------
  activitylistingscreenApi: data => {
    return axios.post(`${baseURL2}getActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------ Update Activity -----------------------
  updateActivity: data => {
    return axios.post(`${baseURL2}updateActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------ Update Activity -----------------------
  updateActivity: data => {
    return axios.post(`${baseURL2}updateActivity`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Cgt Slot data ---------------------
  getCGTslot: data => {
    return axios.post(`${baseURL2}getCGTSlot`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Cgt Customet List data ---------------------
  getCustomerList: data => {
    return axios.post(`${baseURL2}getCustomerForEmployee`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------ CGT get Details ----------------------
  getCGTDetails: data => {
    return axios.post(`${baseURL2}getCgtDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------ CGT Members Details ----------------------
  getCGTDetailsTCMembers: data => {
    return axios.post(`${baseURL2}getCgtDetailsTrustCircleMember`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------ CGT TC Limit Details ----------------------
  getTCLimitCount: () => {
    return axios.get(`${baseURL2}getTcCount`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // --------------- createTrustCircle Verify ----------------------
  createTrustCircles: data => {
    return axios.post(`${baseURL2}createTrustCircle`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // --------------- Trust curcle added members ----------------------
  getCustomerListForTc: data => {
    return axios.post(`${baseURL2}getCustomerListForTc`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // --------------- create CGT ----------------------
  createCGT: data => {
    return axios.post(`${baseURL2}createOrUpdateCGT`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // --------------- Reject TrustCircle Members ----------------------
  rejectTrustCircleMembers: data => {
    return axios.post(`${baseURL2}verifyTcKyc`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //--------------------- DPDOverview -----------------------------
  DPDOverview: (EMPID, Sort) => {
    console.log("empid,dpd", EMPID, Sort)
    return axios.get(`${baseURLDPD}dpdOverview/${EMPID}/${Sort}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //------------ Dashboard summary ---------------------
  DashBoardSummary: (EMPID) => {
    console.log("empid,dpd", EMPID)
    return axios.get(`${baseURLDPD}summary/${EMPID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //--------------------Dashboard Target---------------
  DashBoardTarget: (EMPID) => {
    console.log("empid,dpd", EMPID)
    return axios.get(`${baseURLDPD}target/${EMPID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get tcdetaile data ---------------------
  getDLEschedule: data => {
    return axios.post(`${baseURL2}getTcDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ Schedule DLE ---------------------
  ScheduleDLE: data => {
    return axios.post(`${baseURL2}scheduleDle`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  // ------------------ Conduct DLE  basic detail---------------------
  ConductDLEbasicdetail: data => {
    return axios.post(`${baseURL2}conductDleBasicDetail`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Village list---------------------
  getVillage: data => {
    return axios.post(`${baseURL2}village`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get post office list---------------------
  getpostoffice: data => {
    return axios.post(`${baseURL2}postOffice`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ save basic DLE details---------------------
  savebasicdetail: data => {
    return axios.post(`${baseURL2}saveOrUpdateBasicDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Spouse details---------------------
  getSpousedetail: data => {
    return axios.post(`${baseURL2}getSpouseDetail`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Spouse details---------------------
  getCustomerdetail: data => {
    return axios.post(`${baseURL2}getCustomerDetailsAgent`, data, {
      //  return axios.post(`${baseURL2}getCustomerDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  // ------------------ get Residence owner details---------------------
  getResidenceowner: data => {
    return axios.post(`${baseURL2}getCurrentResidenceOwner`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },



  // ------------------ save and update Residence Owner  details---------------------
  UpdateResidenceowner: data => {
    return axios.post(`${baseURL2}saveOrUpdateCurrentResidenceOwner`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ get Continue Gurantor details---------------------
  getCGdetails: data => {
    return axios.post(`${baseURL2}getCGDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ verify Continue Gurantor details---------------------
  verifyCG: data => {
    return axios.post(`${baseURL2}verifyContinuingGuarantor`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ verify  OTP Continue Gurantor details---------------------
  verifyCGOTP: data => {
    return axios.post(`${baseURL2}verifyCGOtp`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  get CG voter id details---------------------
  getCGvoterid: data => {
    return axios.post(`${baseURL2}getCCVoterId`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save CG voter id details---------------------
  saveCGvoterid: data => {
    return axios.post(`${baseURL2}saveCGVoterIds`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  getVehicleDetails details---------------------
  getVehicleDetails: data => {
    return axios.post(`${baseURL2}getVehicleDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  fetchVehicleDetailsForDle details---------------------
  fetchVehicleDetailsForDle: data => {
    return axios.post(`${baseURL2}fetchVehicleDetailsForDle`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save VehicleDetails details---------------------
  saveVehicleDetails: data => {
    return axios.post(`${baseURL2}saveOrUpdateVehicleDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save getEnergyUtilities details---------------------
  getEnergyUtilities: data => {
    return axios.post(`${baseURL2}getEnergyUtilities`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save EnergyUtilities details---------------------
  saveEnergyUtilities: data => {
    return axios.post(`${baseURL2}saveOrUpdateEnergyUtilities`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save getIncomeDetails details---------------------
  getIncomeDetails: data => {
    return axios.post(`${baseURL2}getIncomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------  save IncomeDetails details---------------------
  saveIncomeDetails: data => {
    return axios.post(`${baseURL2}saveOrUpdateIncomeDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------   getHousePhoto details---------------------
  getHousePhoto: data => {
    return axios.post(`${baseURL2}getHousePhoto`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------   saveOrUpdateHousePhoto details---------------------
  saveHousePhoto: data => {
    return axios.post(`${baseURL2}saveOrUpdateHousePhoto`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   DeleteHousePhoto details---------------------
  DeleteHousePhoto: data => {
    return axios.post(`${baseURL2}deleteHousePhoto`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------   getDlePageNumber details---------------------
  getDlePageNumber: data => {
    return axios.post(`${baseURL2}getDlePageNumber`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   get agent Profile details---------------------
  getAgentProfile: data => {

    return axios.get(`${baseURL2}agentProfile/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  // ------------------ getCorrection details---------------------
  getCorrectionDetails: data => {
    return axios.post(`${baseURL2}getCorrectionPages`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ------------------ getCorrection Dle Page---------------------
  getCorrectionDLEPage: data => {
    return axios.post(`${baseURL2}getDlePageNumber`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Reschedule Api ---------------------------------
  setReshedule: data => {
    return axios.post(`${baseURL2}reScheduleActivityToNextSlot`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  // ---------------- Firebase Token Api ---------------------------------
  firebaseToken: data => {
    return axios.post(`${baseURL2}updateAgentToken`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  getCollection: data => {

    return axios.post(`${baseURL3}pendingCollections`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  // ------------------   collection listing---------------------
  getActiveLoansdetails: data => {

    return axios.get(`${baseURL3}activeLoansCollection/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },



  // ------------------   loanPaymentHistory listing---------------------
  getloanPaymentHistory: data => {

    return axios.get(`${baseURL3}loanPaymentHistory/${data.loanId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   collection listing---------------------
  getloantrend: data => {

    return axios.post(`${baseURL3}loanTrend`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getCustomerProfile: data => {

    return axios.get(`${baseURL3}customerProfileCollection/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },



  // ------------------   customerProfile listing---------------------
  collectionConfirmation: data => {

    return axios.post(`${baseURL3}collectionConfirmation`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getTrustcircledetails: data => {

    return axios.get(`${baseURL3}trustCircleDetails/${data.customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  // ------------------   customerProfile listing---------------------
  getcompletedCollections: data => {
    return axios.get(`${baseURL3}completedCollections/${data.agentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //----------------------APP NEW VERSION CHECK

  getAppNewVersion: (data) => {

    return axios.post(`${baseURLVersion}getLatestAppVersion`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //gethomescreen device check

  gethomeScreenDeviceCheck: () => {
    return axios.post(`${baseURL2}homeScreenDeviceCheckAgent`, {

      // return axios.post(`${baseURL2}homeScreenDeviceCheck`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },
  //SIMID check

  UpdateSIMID: (data) => {

    return axios.post(`${baseURL2}enterPinSimIdCheckAgent`, data, {

      // return axios.post(`${baseURL2}enterPinSimIdCheck`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //isLastCorrectionPage
  getLastPage: (data) => {
    return axios.post(`${baseURL2}isLastCorrectionPage`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },

  //Data confirmation notification
  getCorrectionNotify: (data) => {
    return axios.post(`${baseURL2}dleConfemation`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },



  //CGT Status
  getCgtStatus: (data) => {
    return axios.post(`${baseURL2}getCgtStatus`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },


  //CGT add a new trust circle member
  addNewTrustCircleMember: (data) => {
    return axios.post(`${baseURL2}addNewTrustCircleMember`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },



  //CGT gettrust circle member
  getAllTrustCircleMembers: (data) => {
    return axios.post(`${baseURL2}getAllTrustCircleMembers`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    })
  },





  //---------------- In App Notification ------------------------
  getNotification: (data) => {
    return axios.post(`${baseURL5}notificationsHistory`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },
  //---------------- In App Notification ------------------------
  getNotificationCount: (data) => {
    return axios.post(`${baseURL5}agentNotificationCount`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },
  pinCodeValidation: (data) => {
    return axios.post(`${baseURL2}pinCodeValidation`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },
  getCoappAdhaar: (data) => {
    return axios.post(`${baseURL2}getCoApplicantAadhar`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },

  SaveCoappAdhaar: (data) => {
    return axios.post(`${baseURL2}saveCoApplicantAadhar`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },


  //Edit address CGT
  EditAddress: (data) => {
    return axios.post(`${baseURL2}changeCustomerAddress`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },

  //Edit Name CGT

  EditName: (data) => {
    return axios.post(`${baseURL2}changeCustomerName`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
  },

  // -------------- get Bank Name ----------------
  getBankName: (data) => {
    return axios.get(`${baseURL3}bankNames/${data.bankName}`, {
      headers: {
        "Content-Type": "application/json",
        'x-api-key': API_KEY
      },
    });
  },

  // ------------------ upload file deposit---------------------
  uploadFileDeposit: data => {
    console.log("uploadFileDeposit = ",data);
    console.log("uploadFileDeposit = ", `${baseURL2}uploadFileDeposit`);

    return axios.post(`${baseURL2}uploadFileDeposit`, data, {     
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        'x-api-key': API_KEY
      },

    })
  },

  //     return axios.post(`${baseURL2}enterPinSimIdCheck`,data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     })
  //   },
  //   //---------------- In App Notification ------------------------
  // getNotification: (data) => {
  //   return axios.post(`${baseURL5}notificationsHistory`, data, {
  //     "Content-Type": "application/json",
  //   });
  // },
  // //---------------- In App Notification ------------------------
  // getNotificationCount: (data) => {
  //   return axios.post(`${baseURL5}agentNotificationCount`, data, {
  //     "Content-Type": "application/json",
  //   });
  // },
};


//////////////////////////////////////////              DEV ENVIRONMENT       / ////////////////////////////////////////////////////////////////////////////////////

// --------- Base URL Start------------------
//const baseUAT = 'http://13.235.213.160:' // UAT Production
//const baseUAT = "http://43.205.44.67:"



