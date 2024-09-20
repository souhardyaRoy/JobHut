// src/utils/apiUtils.js
import axios from "axios";


//------------------ HR apis---------------------------------
export const getrole = async () => {
    const url = "https://easytohire.in/webapi/job/alllrole";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getAllJobs = async () => {
    const url = "https://easytohire.in/webapi/job/alljob";
    const reqBody = {
        companyid: localStorage.getItem("companyid"),
        token: localStorage.getItem("easytohire-token"),
    };
    try {
        const response = await axios.post(url, reqBody);
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getInterViewer = async () => {
    const url = "https://easytohire.in/webapi/job/interviewer";
    const reqBody = {
        companyid: localStorage.getItem("companyid"),
        token: localStorage.getItem("easytohire-token"),
    };
    try {
        const response = await axios.post(url, reqBody);
        return response.data
    } catch (error) {
        console.log(error);
    }
};



export const getcity = async () => {
    const url = "https://easytohire.in/webapi/job/alllocation";
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) { 
        console.log(error);
    }
};

export const getAppliedProfile = async (jobid, status, setProfile, setMsg, setPageName, setCurrentPage) => {
    setMsg("Please Wait..");
    let input = {
        companyid: localStorage.getItem("companyid"),
        jobid: jobid,
        token: localStorage.getItem("easytohire-token"),
        status: status
    };

    try {
        const response = await axios.post("https://easytohire.in/webapi/job/appliedprofile", input, {
            headers: { 'Content-Type': 'application/json' }
        });
        setProfile(response.data);
        setCurrentPage(0); // Reset pagination
        if (status === 0) {
            setPageName("New Profiles");
        } else if (status === 1) {
            setPageName("Selected Profiles");
        } else if (status === -1) {
            setPageName("Rejected Profiles");
        }
        setMsg("");
    } catch (error) {
        console.error("Error fetching profile data", error);
        setMsg("Error fetching profile data");
    }
};

export const changeProfileStatus = async (jobid, userid, status, setMsg, getProfile) => {
    let input = {
        companyid: localStorage.getItem("companyid"),
        token: localStorage.getItem("easytohire-token"),
        jobid: jobid,
        userid: userid,
        status: status,
        feedback: ""
    };

    try {
        const response = await axios.post("https://easytohire.in/webapi/job/changeprofilestatus", input, {
            headers: { 'Content-Type': 'application/json' }
        });
        setMsg(response.data);
        getProfile(status);
    } catch (error) {
        console.error("Error changing profile status", error);
        setMsg("Error changing profile status");
    }
};

export const saveJob = async (values, setMsg) => {
    setMsg("please wait ...");
    values.companyid = localStorage.getItem("companyid");
    values.token = localStorage.getItem("easytohire-token");
    const url = "https://easytohire.in/webapi/job/savejob";
    const reqBody = values;
    try {
        const response = await axios.post(url, reqBody);
        // eslint-disable-next-line
        console.log("res data     ", response.data);
        setMsg("Job created successfully");
        setTimeout(() => {
            setMsg("");
        }, 2000);
    } catch (error) {
        console.log(error);
    }
};

//---------------------------------------------------------------------------------

//--------------------------------------------- Common APIs  ---------------------------------

export const getAllRounds = async () => {
    const url = "https://easytohire.in/webapi/job/interviewround";
    const reqBody = {
        companyid: localStorage.getItem("companyid"),
        token: localStorage.getItem("easytohire-token"),
    };
    try {
        const response = await axios.post(url, reqBody);
        return response.data
    } catch (error) {
        console.log(error);
    }
};

//-----------------------------------------------------------------------------------------

//---------------------------------------Manager APIs--------------------------------------

 export const getProfileForInterview = async (myData,setJobid,setNewRound,updateErrorMsg,setProfile,showMe) => {
    let info = myData.split("#")
    setJobid(info[0])
    setNewRound(info[1])
    let input = {
        "companyid": localStorage.getItem("companyid"),
        "token": localStorage.getItem("easytohire-token"),
        "jobid": info[0],
        "round": info[1]
    }

    updateErrorMsg("loading....")
    try {
        const response = await axios.post("https://easytohire.in/webapi/job/profileforinterview", input, {
            headers: { 'Content-Type': 'application/json' }
        });
        setProfile(response.data);
        updateErrorMsg("")
        if (response.data.length > 0) {
            showMe(response.data[0]);
        }
    } catch (error) {
        updateErrorMsg("Network error...Please Try Later...");
    }
}

export const updateFeedBack = async (e, aboutme, jobid, round, remark, feedback, updateErrorMsg,setRemark,setFeedBack) => {
    e.preventDefault();
    let updatedAboutMe = {
        ...aboutme,
        jobid: jobid,
        round: round,
        remark: remark,
        feedback: feedback,
        interviewerid: localStorage.getItem("easytohire-token"),
        companyid: localStorage.getItem("companyid")
    };

    updateErrorMsg("loading....");
    try {
        const response = await axios.post("https://easytohire.in/webapi/job/changeinterviewstatus", updatedAboutMe, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response.data);
        // Reset the form fields
        setRemark("");
        setFeedBack("");
        updateErrorMsg("");
    } catch (error) {
        updateErrorMsg("Network error...Please Try Later...");
    }
};