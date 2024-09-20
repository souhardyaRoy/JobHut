import { useState, useEffect } from "react";
import { getAllJobs, getInterViewer } from "../utils/all.api";
import axios from "axios";
import useDocumentTitle from "../customHooks/usedocumentTitle";
const CreateInterviewRound = () => {
  useDocumentTitle('Create Round'); // Dynamic title

  const [totalJobs, setTotalJobs] = useState([]);
  const [allInterViewer, setAllInterViewer] = useState([]);

  const fetchTotalJobs = async () => {
    const resJobs = await getAllJobs();
    const resInterviewer = await getInterViewer();
    setTotalJobs(resJobs);
    setAllInterViewer(resInterviewer);
  };


  useEffect(() => {
    fetchTotalJobs();
  }, []);

  const [interViewRound, setInterViewRound] = useState({});
  const [msg, setMsg] = useState("");

  const pickValue = (e) => {
    interViewRound[e.target.name] = e.target.value;
    setInterViewRound(interViewRound);
  };

  const saveInterviewRound = async (e) => {
    e.preventDefault();
    setMsg("please wait ...");
    interViewRound.companyid = localStorage.getItem("companyid");
    interViewRound.token = localStorage.getItem("easytohire-token");
    const url = "https://easytohire.in/webapi/job/saveround";
    const reqBody = interViewRound;
    try {
      const response = await axios.post(url, reqBody);
      setMsg(response.data);
      setTimeout(() => {
        setMsg("");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="text-center mb-5 col-xl-12">Create Interview Round</h3>
        <p className="text-center text-danger">{msg}</p>
      </div>
      <form onSubmit={saveInterviewRound}>
        <div className="row">
          <div className="col-lg-3">
            <label className="mb-1">Job Requirement</label>
            <select className="form-select" name="jobid" onChange={pickValue}>
              <option value={""}>Choose</option>
              {totalJobs.map((job, index) => {
                return (
                  <option key={index} value={job.jobid}>
                    {job.jobtitle}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-3">
            <label className="mb-1">Interviewer</label>
            <select className="form-select" name="empid" onChange={pickValue}>
              <option value={""}>Choose</option>
              {allInterViewer.map((interviewrer, index) => {
                return (
                  <option key={index} value={interviewrer.userid}>
                    {interviewrer.fullname}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-3">
            <label className="mb-1">Interview Round</label>
            <select className="form-select" name="round" onChange={pickValue}>
              <option>Choose</option>
              <option value="1">1 Round</option>
              <option value="2">2 Round</option>
              <option value="3">3 Round</option>
              <option value="4">4 Round</option>
              <option value="5">5 Round</option>
            </select>
          </div>
          <div className="col-lg-3 pt-4 text-center">
            <button type="submit" className="btn btn-primary">
              {" "}
              Create Round
            </button>
          </div>
        </div>
      </form>


    </div>
  );
};

export default CreateInterviewRound;

