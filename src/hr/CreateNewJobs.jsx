import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createJobvalidationSchema } from "../schemas/createJob.validate.schema";
import { getrole, getcity, saveJob} from "../utils/all.api";
import "../styles/Myjob.css"; // Import the CSS file

const CreateNewJob = () => {
  let [allRols, setAllRoles] = useState([]);
  let [allcity, setcity] = useState([]);
  let [msg, setMsg] = useState("");

  const initialValues = {
    role: "",
    jobtitle: "",
    location: "",
    minexp: "",
    maxexp: "",
    minsal: "",
    maxsal: "",
    jd: ""
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: createJobvalidationSchema,
    onSubmit: (values, action) => {
      saveJob(values, setMsg); // Pass setMsg and onJobCreated as arguments
      action.resetForm();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const fetchAllApis = async () => {
    const roleRes = await getrole();
    setAllRoles(roleRes);
    const cityRes = await getcity();
    setcity(cityRes);
  };

  useEffect(() => {
    fetchAllApis();
  }, []);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <h3 className="text-center mb-3">Post Job</h3>
            <p className="mb-2 text-center text-danger">{msg}</p>
          </div>
          <div className="row">
            <div className="mb-3 col-lg-3">
              <label className="mb-1">Job Role</label>
              <select className="form-select" name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}>
                <option value={""}>Choose</option>
                {allRols.map((role, index) => {
                  return (
                    <option key={index} value={role.url}>
                      {role.rolename}
                    </option>
                  );
                })}
              </select>
              {errors.role && touched.role ? (
                <p className="text-danger">{errors.role}</p>
              ) : null}
            </div>
            <div className="mb-3 col-lg-6">
              <label className="mb-1">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="jobtitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobtitle}
              />
              {errors.jobtitle && touched.jobtitle ? (
                <p className="text-danger">{errors.jobtitle}</p>
              ) : null}
            </div>
            <div className="mb-3 col-lg-3">
              <label className="mb-1">Job Location</label>
              <select
                className="form-select"
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
              >
                <option value={""}>Choose</option>
                {allcity.map((city, index) => {
                  return (
                    <option key={index} value={city.cityname}>
                      {city.cityname}
                    </option>
                  );
                })}
              </select>
              {errors.location && touched.location ? (
                <p className="text-danger">{errors.location}</p>
              ) : null}
            </div>
            <div className="mb-3 col-lg-6">
              <label className="mb-1">Experience Range</label>
              <div className="input-group input-group-with-error">
                <input
                  type="number"
                  placeholder="Min"
                  className="form-control"
                  name="minexp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.minexp}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="form-control"
                  name="maxexp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.maxexp}
                />
              </div>
              {errors.minexp && touched.minexp ? (
                <p className="text-danger">{errors.minexp}</p>
              ) : null}
              {errors.maxexp && touched.maxexp ? (
                <p className="text-danger">{errors.maxexp}</p>
              ) : null}
            </div>
            <div className="mb-3 col-lg-6">
              <label className="mb-1">Salary Anum</label>
              <div className="input-group input-group-with-error">
                <input
                  type="number"
                  placeholder="Min"
                  className="form-control"
                  name="minsal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.minsal}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="form-control"
                  name="maxsal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.maxsal}
                />
              </div>
              {errors.minsal && touched.minsal ? (
                <p className="text-danger">{errors.minsal}</p>
              ) : null}
              {errors.maxsal && touched.maxsal ? (
                <p className="text-danger">{errors.maxsal}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="mb-1">Job Description</label>
              <textarea
                className="form-control"
                name="jd"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jd}
              ></textarea>
              {errors.jd && touched.jd ? (
                <p className="text-danger">{errors.jd}</p>
              ) : null}
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary m-1">
                Post Job
              </button>
              <button type="reset" className="btn btn-warning m-1">
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewJob;
