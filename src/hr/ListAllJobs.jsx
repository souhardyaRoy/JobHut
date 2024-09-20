import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme styles
import "../styles/Myjob.css"; // Import your custom CSS
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllJobs } from "../utils/all.api";
import { addJobDescription } from "./redux/slices/jobDescription.slice";
import { useDispatch } from "react-redux";

const ListAllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4; // Set to 3 rows per page
  const ROW_HEIGHT = 60; // Fixed row height in pixels
  const HEADER_HEIGHT = 56; // Adjust based on your header height

  const dispatch = useDispatch()
  const handleUpdateDescription = (newDescription) => {
    dispatch(addJobDescription(newDescription));
  };

  async function fetchAllJobs() {
   const resJobs = await getAllJobs();
   setAllJobs(resJobs);
  }
  useEffect(() => {
    fetchAllJobs() 
  }, []);

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allJobs.length / PER_PAGE);
  const visibleRows = allJobs.slice(offset, offset + PER_PAGE);
  const gridHeight = HEADER_HEIGHT + (PER_PAGE * ROW_HEIGHT) + 5; // Calculate height for header and 3 rows
  console.log("offset   ",offset);
  console.log("pageCount   ",pageCount);
  console.log("visibleRows   ",visibleRows);
  console.log("gridHeight   ",gridHeight);
  console.log("currentPage   ",currentPage);

  const columnDefs = [
    { headerName: "Job Title", field: "jobtitle" },
    { headerName: "Role", field: "role", valueFormatter: ({ value }) => value.replaceAll("-", " ") },
    { headerName: "Location", field: "location" },
    { headerName: "Experience", field: "experience", valueFormatter: ({ data }) => `${data.minexp} To ${data.maxexp} Yrs` },
    { headerName: "Salary", field: "salary", valueFormatter: ({ data }) => `${data.minsal} To ${data.maxsal} LPA` },
    { headerName: "Job Description", field: "jd" },
    { headerName: "Total Profiles", field: "totalprofile" },
    {
      headerName: "View jobs",
      field: "jobid",
      cellRenderer: (params) => (
        <Link to={`/appliedprofile/${params.value}`}>
          <button className="btn btn-primary btn-sm" onClick={() => handleUpdateDescription(params.data.jd)}>
            <i className="fa fa-eye"></i> View
          </button>
        </Link>
      ),
      pinned: 'right' // Pin this column to the right
    }
  ];
  
  

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage   ",selectedPage);

    setCurrentPage(selectedPage);
  }

  return (
    <div className="container mt-3">
      <h3 className="text-center my-4 text-primary">
        {allJobs.length} Total Available Jobs
      </h3>
      <div className="ag-theme-alpine" style={{ height: gridHeight, width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        <AgGridReact
          rowData={visibleRows}
          columnDefs={columnDefs}
          pagination={false} // Disable internal pagination
          rowHeight={ROW_HEIGHT} // Set row height
          headerHeight={HEADER_HEIGHT} // Set header height
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
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

export default ListAllJobs;
