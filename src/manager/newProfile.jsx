import React, { useState, useEffect } from "react";
import { getAllRounds, getProfileForInterview, updateFeedBack } from "../utils/all.api";
import useDocumentTitle from "../customHooks/usedocumentTitle";
function NewProfiles() {
    let [aboutme, showMe] = useState({});

    useDocumentTitle(`${aboutme?.fullname || "guest"}`); // Dynamic title

    let [allprofile, setProfile] = useState([]);
    let [errormsg, updateErrorMsg] = useState("");

    const [jobid, setJobid] = useState("")
    const [round, setNewRound] = useState("")

    let [allRound, setAllRound] = useState([]);

    const fetchAll = async () => {
        const resAllRounds = await getAllRounds();
        setAllRound(resAllRounds);
    };

    useEffect(() => {
        fetchAll()
    }, []);

    const [remark, setRemark] = useState("")
    const [feedback, setFeedBack] = useState("")


    return (
        <div className="container pt-5">
            <div className="row mb-4">
                <div className="col-xl-6 text-center">
                    <select className="form-select" onChange={e => getProfileForInterview(e.target.value, setJobid, setNewRound, updateErrorMsg, setProfile, showMe)}>
                        <option value={""} >Choose Requirement</option>
                        {
                            allRound.map((round, index) => {
                                return (
                                    <option value={round.round + "#" + round.round} key={index}>{round.jobtitle} - Round {round.round}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-7">
                    <h3 className="text-primary mb-2">
                        <i className="fa-solid fa-circle-user"></i> New Profiles - {allprofile.length}
                    </h3>

                    <p className="text-danger"> {errormsg} </p>

                    {allprofile.length === 0 ? (
                        <div className="card border-none shadow-lg">
                            <div className="card-body text-center">
                                <h5>No Profiles to show</h5>
                            </div>
                        </div>
                    ) : (<table className="table rounded shadow-lg">
                        <tbody>
                            <tr className="table-info">
                                <td> Full Name </td>
                                <td> Mobile No </td>
                                <td> Email Id </td>
                                <td> Action </td>
                            </tr>
                            {
                                allprofile.map((profile, index) => {
                                    return (
                                        <tr key={index} onClick={showMe.bind(this, profile)}>
                                            <td> {profile.fullname} </td>
                                            <td> {profile.mobile} </td>
                                            <td> {profile.email} </td>
                                            <td>
                                                <button className="btn btn-info text-white btn-sm">
                                                    <i className="fa fa-eye"></i> More...
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>)}
                </div>
                <div className="col-xl-5">
                    <div className="card border-none shadow-lg">
                        <div className="card-header bg-primary text-white">
                            About : {aboutme.fullname}
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr> <td> Name  </td>   <td> {aboutme.fullname} </td></tr>
                                    <tr> <td> Mobile </td> <td> {aboutme.mobile} </td></tr>
                                    <tr> <td> E-mail  </td> <td> {aboutme.email} </td></tr>
                                    <tr> <td> Exp  </td>    <td> {aboutme.totalexp}  </td></tr>
                                    <tr> <td> About  </td>  <td> {aboutme.aboutexp} </td></tr>
                                    <tr> <td> Skills  </td>  <td> {aboutme.skill}    </td></tr>
                                </tbody>
                            </table>
                            <h5 className="text-center text-warning fs-5">Interview Feedback</h5>
                            <form onSubmit={(e) => { updateFeedBack(e, aboutme, jobid, round, remark, feedback, updateErrorMsg, setRemark, setFeedBack) }}>
                                <div className="mt-3 mb-3">
                                    <select className="form-select" value={remark} onChange={(e) => setRemark(e.target.value)} >
                                        <option value={""}>Interview Status</option>
                                        <option value={"SELECTED"}>Select the candidate</option>
                                        <option value={"REJECTED"}>Reject the candidate</option>
                                    </select>
                                </div>
                                <div className="mt-3 mb-3">
                                    <label>Interview Feedback</label>
                                    <textarea value={feedback} onChange={e => setFeedBack(e.target.value)} className="form-control" placeholder="enter your feedback"></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-danger" >Submit Feedback</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProfiles;
