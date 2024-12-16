import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const { _id, title, company, deadline } = useLoaderData();
    // console.log(_id);
  return (
    <div>
      <h2>JOB Details for : {title}</h2>
      <p>Apply for : {company}</p>
      <p>Deadline : {deadline}</p>
      <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now</button>
      </Link>
    </div>
  );
};

export default JobDetails;
