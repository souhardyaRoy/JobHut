import { useState, useEffect } from "react";
const SelectedProfile = () => {
    let [allProfiles, setProfiles] = useState([]);

    const getProfiles = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }

        fetch("https://easytohire.in/webapi/job/completedprofile", postData)
            .then(response => response.json())
            .then(interviewerArray => {
                setProfiles(interviewerArray);
            })
    }

    useEffect(() => {
        getProfiles()
    }, [])

    const [finalstatus, changeStatus] = useState("SELECTED")

    return (
        <div className="container pt-5">
            <div className="row mb-4">
                <div className="col-lg-12">
                    <h3 className="text-center text-success">
                        <i class="fa-solid fa-circle-check"></i> All Profiles - {allProfiles.length}
                    </h3>
                    <div className="btn-group">
                        <button className="btn btn-info" onClick={() => changeStatus("SELECTED")}> <i className="fa fa-check"></i> Selected</button>
                        <button className="btn btn-danger" onClick={() => changeStatus("REJECTED")}> <i className="fa fa-times"></i> Rejected</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr className="table-info">
                                <th> ID </th>
                                <th> Job Requirement </th>
                                <th> Full Name </th>
                                <th> Mobile No </th>
                                <th> Feedback </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allProfiles.map((profile, index) =>
                                    (profile.remark === finalstatus) && (
                                        <tr key={index}>
                                            <td>{profile.id}</td>
                                            <td>{profile.jobtitle}</td>
                                            <td>{profile.fullname}</td>
                                            <td>{profile.mobile}</td>
                                            <td>{profile.feedback}</td>
                                            <td>{profile.remark}</td>
                                        </tr>
                                    )
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SelectedProfile;