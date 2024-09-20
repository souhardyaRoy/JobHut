import { useState, useEffect } from "react";

const ManagerDashboard = () => {
    let [allProfiles, setProfiles] = useState([]);
    let [selected, setSelected] = useState(0);
    let [rejected, setRejected] = useState(0);

    const getProfiles = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        };
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };

        fetch("https://easytohire.in/webapi/job/completedprofile", postData)
            .then(response => response.json())
            .then(interviewerArray => {
                setProfiles(interviewerArray);
                setSelected(interviewerArray.filter(profile => profile.remark === "SELECTED").length);
                setRejected(interviewerArray.filter(profile => profile.remark === "REJECTED").length);
            });
    };

    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <div className="container p-5">
            <div className="row mb-4">
                <div className="col-lg-12 text-center">
                    <h3 className="text-primary">
                        <i className="fa-solid fa-house"></i> {localStorage.getItem("fullname")}'s Dashboard
                    </h3>
                </div>
            </div>

            <div className="row text-center">
                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-circle-user text-primary fa-3x mb-3"></i>
                        <h5> {allProfiles.length} New Profiles </h5>
                    </div>
                </div>

                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-circle-check text-success fa-3x mb-3"></i>
                        <h5> {selected} Selected Profiles </h5>
                    </div>
                </div>

                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-circle-xmark text-danger fa-3x mb-3"></i>
                        <h5> {rejected} Rejected Profiles </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
