import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import {
  addJob,
  clearJob,
  handleFormChange,
  updateJob,
} from "../features/jobs/jobsSlice";

const AddJob = () => {
  const { job, isLoading, isEditing } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(handleFormChange({ id, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateJob());
    } else {
      dispatch(addJob());
    }
  };

  return (
    <Wrapper>
      <div className="job-container">
        <div className="header">
          <h1 className="title">{isEditing ? "Edit Job" : "Add a Job"}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              value={job.company ?? ""}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              value={job.position ?? ""}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              id="status"
              onChange={handleChange}
              value={job.status}
            >
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="jobType">Job Type:</label>
            <select
              name="jobType"
              id="jobType"
              onChange={handleChange}
              value={job.jobType}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="jobLocation">Job Location:</label>
            <select
              name="jobLocation"
              id="jobLocation"
              onChange={handleChange}
              value={job.jobLocation}
            >
              <option value="WFH">WFH</option>
              <option value="Office">Office</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="row-button">
            <button
              type="button"
              className="btn btn-clear"
              disabled={isLoading}
              onClick={() => {
                dispatch(clearJob());
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .job-container {
    margin: 0 auto;
    border-top: 5px solid var(--primary);
    max-width: 1000px;
    width: 90vw;
    background-color: var(--white);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 2rem 2.5rem;
  }
  .title {
    font-size: 1.5rem;
    font-family: var(--headingFont);
  }
  form {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    font-size: 1.2rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  input,
  select {
    padding: 0.375rem 0.75rem;
    background: var(--backgroundColor);
    border-radius: 5px;
    border: 0.5px solid var(--grey);
  }
  .btn {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }
  .btn-clear {
    background-color: var(--secondary);
  }

  @media (min-width: 992px) {
    form {
      grid-template-columns: 1fr 1fr;
    }
    .row-button {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default AddJob;
