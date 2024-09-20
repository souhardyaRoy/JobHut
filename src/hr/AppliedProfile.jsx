import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getAppliedProfile, changeProfileStatus } from '../utils/all.api';
import GoBackLink from "./GoBack";
import useDocumentTitle from "../customHooks/usedocumentTitle";
const AppliedProfile = () => {
    useDocumentTitle('Home-JobHut'); // Dynamic title
    let { jobid } = useParams();
    const [pageName, setPageName] = useState("New Profiles");
    const [allprofile, setProfile] = useState([]);
    const [msg, setMsg] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 1;

    const jobDescription = useSelector((state) => state.jobDescriptionSlice);

    useEffect(() => {
        // Changed: added setCurrentPage
        getAppliedProfile(jobid, 0, setProfile, setMsg, setPageName, setCurrentPage); 
    }, [jobid]);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allprofile.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <h1 className="display-4 text-primary text-center mb-4 fs-3 fw-bold border-bottom pb-2">
                <span className="text-secondary">Job Description : </span>
                <span className="text-info">{jobDescription}</span>
            </h1>

            <GoBackLink />
            <div className="row mb-4">
                <h3 className="text-center mb-4 mt-4 text-primary col-lg-12"> {allprofile.length} : {pageName} </h3>

                <p className="col-lg-6">
                    {/* Changed: added setCurrentPage */}
                    <input type="radio" name="sts" id="new" onClick={() => getAppliedProfile(jobid, 0, setProfile, setMsg, setPageName, setCurrentPage)} /> 
                    <label htmlFor="new" className="me-4 text-info">New Profile</label>
                    {/* Changed: added setCurrentPage */}
                    <input type="radio" name="sts" id="sel" onClick={() => getAppliedProfile(jobid, 1, setProfile, setMsg, setPageName, setCurrentPage)} /> 
                    <label htmlFor="sel" className="me-4 text-success">Selected</label>
                    {/* Changed: added setCurrentPage */}
                    <input type="radio" name="sts" id="rej" onClick={() => getAppliedProfile(jobid, -1, setProfile, setMsg, setPageName, setCurrentPage)} /> 
                    <label htmlFor="rej" className="text-danger">All Rejected</label>
                </p>
                <p className="text-danger col-lg-6"> {msg} </p>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    {
                        allprofile.slice(offset, offset + PER_PAGE).map((job, index) => (
                            <div className="mb-4 p-3 border rounded" key={index}>
                                <div className="row">
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Basic Details </h5>
                                        <p>Full Name : {job.fullname}</p>
                                        <p>Gender : {job.gender}</p>
                                        <p>DOB : {job.dob}</p>
                                        <p>Mobile : {job.mobile}</p>
                                        <p>e-Mail : {job.email}</p>
                                        <p>Address : {job.address}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Education Details </h5>
                                        <p>Highest Edu : {job.educationame}</p>
                                        <p>Year : {job.passingyear}</p>
                                        <p>Grade : {job.grade}</p>
                                        <p>Institute : {job.college}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Skills Details </h5>
                                        <p>Well Known About : {job.skill}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Work Experience </h5>
                                        <p> {job.totalexp}</p>
                                        <p> {job.aboutexp}</p>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success btn-sm me-4"
                                            onClick={() => changeProfileStatus(jobid, job.id, 1, setMsg, () => getAppliedProfile(jobid, 0, setProfile, setMsg, setPageName, setCurrentPage))}>
                                            <i className="fa fa-check"></i> Shortlist
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => changeProfileStatus(jobid, job.id, -1, setMsg, () => getAppliedProfile(jobid, 0, setProfile, setMsg, setPageName, setCurrentPage))}>
                                            <i className="fa fa-times"></i> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
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
    );
};

export default AppliedProfile;


