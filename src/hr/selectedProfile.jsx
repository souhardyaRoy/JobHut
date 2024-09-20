import { useState, useEffect } from "react";

const SelectedProfile = () => {
    let [alljob, setJob] = useState([]);

    const getJob = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        };

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };

        fetch("https://easytohire.in/webapi/job/alljob", postData)
            .then(response => response.json())
            .then(jobArray => {
                setJob(jobArray);
            });
    };

    let [allprofile, setProfile] = useState([]);

    const getProfile = async (jobid) => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token"),
            "jobid": jobid,
        };

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };

        try {
            await fetch("https://easytohire.in/webapi/job/allprofile", postData)
                .then(response => response.json())
                .then(profileArray => {
                    setProfile(profileArray);
                });
        } catch (error) {
            alert("Network error...Please Try Later...");
        }
    };

    useEffect(() => {
        getJob();
    }, []);

    return (
        <div className="container pt-5">
            <div className="row">
                <h3 className="text-center text-success mb-4 col-xl-12">
                    <i className="fa-solid fa-circle-check"></i> Manage Selected Profiles
                </h3>
            </div>
            <div className="row mb-4">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <label className="mb-1"> Filter By Job Requirement </label>
                    <select className="form-select" onChange={(e) => getProfile(e.target.value)}>
                        <option>Choose</option>
                        {alljob.map((job, index) => (
                            <option key={index} value={job.jobid}>{job.jobtitle}</option>
                        ))}
                    </select>
                    <h3 className="text-center m-3 text-danger">Total Profile : {allprofile.length}</h3>
                </div>
                <div className="col-lg-3"></div>
            </div>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile No</th>
                                <th>E-Mail Id</th>
                                <th>Education</th>
                                <th>Status</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allprofile.map((profile, index) => (
                                <tr key={index}>
                                    <td>{profile.fullname}</td>
                                    <td>{profile.mobile}</td>
                                    <td>{profile.email}</td>
                                    <td>{profile.educationame}</td>
                                    <td>{profile.status}</td>
                                    <td>{profile.feedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SelectedProfile;
