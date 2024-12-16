import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddJob = () => {
  const { user } = useAuth();
  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    console.log(initialData);

    // Destructure and transform form data
    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements
      ? newJob.requirements.split("\n")
      : [];
    newJob.responsibilities = newJob.responsibilities
      ? newJob.responsibilities.split("\n")
      : [];

    console.log(newJob);

    // Submit to backend
    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Job posted successfully:", data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myPostedJobs");
        }
      })
      .catch((err) => {
        console.error("Failed to submit job:", err);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleAddJob} className="card-body space-y-4">
        {/* Job title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Job title"
            className="input input-bordered"
            required
          />
        </div>

        {/* Job location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Job location"
            className="input input-bordered"
            required
          />
        </div>

        {/* Job type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select name="jobType" className="select select-bordered" required>
            <option disabled selected>
              Pick a Job Type
            </option>
            <option>Full-time</option>
            <option>Part-Time</option>
            <option>Intern</option>
          </select>
        </div>

        {/* Job category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Category</span>
          </label>
          <select
            name="jobCategory"
            className="select select-bordered"
            required
          >
            <option disabled selected>
              Pick a Job Category
            </option>
            <option>Engineering</option>
            <option>IT</option>
            <option>Finance</option>
          </select>
        </div>

        {/* Salary range */}
        <p className="text-lg font-semibold">Salary Range</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Min</span>
            </label>
            <input
              type="number"
              name="min"
              placeholder="Minimum salary"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Max</span>
            </label>
            <input
              type="number"
              name="max"
              placeholder="Maximum salary"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Currency</span>
            </label>
            <select name="currency" className="select select-bordered" required>
              <option disabled selected>
                Select Currency
              </option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>

        {/* Job description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Enter job description"
            name="description"
            required
          ></textarea>
        </div>

        {/* Company name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            className="input input-bordered"
            required
          />
        </div>

        {/* Requirements */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Requirements</span>
          </label>
          <textarea
            name="requirements"
            placeholder="Enter each requirement on a new line"
            className="textarea textarea-bordered"
            required
          ></textarea>
        </div>

        {/* Responsibilities */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Responsibilities</span>
          </label>
          <textarea
            name="responsibilities"
            placeholder="Enter each responsibility on a new line"
            className="textarea textarea-bordered"
            required
          ></textarea>
        </div>

        {/* HR name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Name</span>
          </label>
          <input
            type="text"
            name="hr_name"
            placeholder="Enter HR name"
            className="input input-bordered"
            required
          />
        </div>

        {/* HR email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            type="email"
            name="hr_email"
            defaultValue={user?.email}
            placeholder="Enter HR email"
            className="input input-bordered"
            required
          />
        </div>
        {/* dead line */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            className="input input-bordered"
            required
          />
        </div>

        {/* Company logo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Logo</span>
          </label>
          <input
            type="url"
            name="company_logo"
            placeholder="Enter company logo URL"
            className="input input-bordered"
            required
          />
        </div>

        {/* Submit button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
