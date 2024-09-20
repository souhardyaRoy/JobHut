import { useState, useEffect } from "react";
import { getAllRounds } from "../utils/all.api";
import ReactPaginate from "react-paginate";
import axios from "axios";

const ManageInterviewRound = () => {
  const [allRounds, setAllRounds] = useState([]); // basically all interviews

  const [allprofile, setAllProfile] = useState([]);
  const [jobId, setJobId] = useState("");
  const [round, setRound] = useState("");

  const fetchTotalJobs = async () => {
    const resAllRounds = await getAllRounds();
    setAllRounds(resAllRounds);
  };

  const moveNextRound = (nextround,userid) => {
    setMsg("Please Wait...");

    let input = {
      "companyid": localStorage.getItem("companyid"),
      "token": localStorage.getItem("easytohire-token"),
      "jobid": jobId,
      "nextround": nextround,
      "userid": userid
    }

    let postData = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(input)
    };

    fetch("https://easytohire.in/webapi/job/movetonextround", postData)
      .then(response => response.text())
      .then(msg => {
        setMsg(msg);
        getProfilesBasedOnJobIdAndRound(jobId, round);
      })
  }

  let[myround, setMyround] = useState([]);
    const getJobround = (jobid,round ) => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "jobid": jobid,
            "token": localStorage.getItem("easytohire-token"),
            "round": round
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }
        fetch("https://easytohire.in/webapi/job/getjobround", postData)
            .then(response => response.json())
            .then(jobArray => {
                setMyround(jobArray);
            })
    }

  const getProfilesBasedOnJobIdAndRound = async (jobid, round) => {
    setJobId(jobid);
    setRound(round);
    getJobround(jobid, round);
    setMsg("Please Wait..");
    let input = {
      companyid: localStorage.getItem("companyid"),
      jobid: jobid,
      token: localStorage.getItem("easytohire-token"),
      round: round,
    };

    try {
      const response = await axios.post("https://easytohire.in/webapi/job/profilebyround", input, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(40, "  ", response.data);
      setAllProfile(response.data);
      setMsg("");
    } catch (error) {
      console.error("Error fetching profile data", error);
      setMsg("Error fetching profile data");
    }
  };


  const changeprofileStatus = async (userid, status) => {
    setMsg("Please Wait...");
    let feedback = prompt("Please enter Feedback");
    let input = {
      companyid: localStorage.getItem("companyid"),
      token: localStorage.getItem("easytohire-token"),
      jobid: jobId,
      userid: userid,
      status: status,
      feedback: feedback,
    };

    try {
      const response = await axios.post("https://easytohire.in/webapi/job/changeprofilestatus", input, {
        headers: { "Content-Type": "application/json" }
      });
      setMsg(response.data);
      getProfilesBasedOnJobIdAndRound(jobId, round);
    } catch (error) {
      console.error("Error changing profile status", error);
      setMsg("Error changing profile status");
    }
  };


  useEffect(() => {
    fetchTotalJobs();
  }, []);

  const [msg, setMsg] = useState("");



  const PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allRounds.length / PER_PAGE);

  return (
    <div className="container mt-4">

      {/*Till here 1st one of drop down */}
      <div className="row mt-5">
        <h3 className="text-center col-xl-12">Manage & View Interview Round</h3>
        <p className="text-center text-danger">{msg}</p>
      </div>

      <div className="row">
        <div className="col-xl-5">
          <h4 className="text-center"> Available Interviews </h4>
          <table className="table table-bordered">
            <tbody>
              <tr className="table-info">
                <td> Requirement </td>
                <td> Interviewer </td>
                <td> Round </td>
                <td> View All </td>
              </tr>

              {allRounds
                .slice(offset, offset + PER_PAGE)
                .map((round, index) => {
                  return (
                    <tr key={index}>
                      <td> {round.jobtitle} </td>
                      <td> {round.fullname} </td>
                      <td> {round.round} </td>
                      <td
                        onClick={() => getProfilesBasedOnJobIdAndRound(round.jobid, round.round)}
                      >
                        <button className="btn btn-primary">View</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="mb-5 mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination  justify-content-center"}
              pageClassName={"page-item "}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active primary"}
            />
          </div>
        </div>
        <div className="col-lg-7">
          <h4 className="text-center">
            {" "}
            Total Profile : {allprofile.length}{" "}
          </h4>

          <table className="table table-bordered">
            <thead>
              <tr className="table-success">
                <td> Fulll Name </td>
                <td> Email </td>
                <td> Status </td>
                <td> Next Round </td>
                <td> Action </td>
              </tr>
            </thead>
            <tbody>
              {allprofile.map((profile, index) => {
                return (
                  <tr key={index}>
                    <td className="me-3 text-primary"> {profile.fullname} <br /> {profile.mobile} </td>
                    <td className="me-3 text-warning"> {profile.email} </td>
                    <td className="me-3 text-secondary"> <small>{profile.status} </small></td>
                    <td>
                      <select   className="form-select" onChange={obj => moveNextRound(obj.target.value, profile.id)}>
                        <option>Choose</option>
                        {
                          myround.map((allround, index2) => {
                            return (
                              <option value={allround.round} key={index2}> {allround.round} </option>
                            )
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => changeprofileStatus(profile.id, -1)}
                        className="btn btn-danger btn-sm">
                        {" "}
                        <i className="fa fa-times"></i>{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
          </table>
        </div>
      </div>
      {/*Till here 2nd one of drop down */}

    </div>
  );
};

export default ManageInterviewRound;

