import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { deleteJob, handleEditing } from "../features/jobs/jobsSlice";
import { Link } from "react-router-dom";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";

const Jobs = () => {
  const { jobs, totalJobs, isLoading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <h1>
        {totalJobs} Job{totalJobs > 1 ? "s" : ""} found
      </h1>
      <div className="jobs">
        {jobs.map((item) => {
          const {
            _id,
            status,
            company,
            position,
            jobLocation,
            jobType,
            createdAt_formatted,
          } = item;
          return (
            <article key={_id}>
              <div className="header">
                <div className="logo">{company[0]}</div>
                <div className="info">
                  <h5>{position}</h5>
                  <p>{company}</p>
                </div>
              </div>
              <div className="content">
                <p>
                  <span className="icon">
                    <FaBriefcase />
                  </span>
                  <span>{jobType}</span>
                </p>
                <p>
                  <span className="icon">
                    <FaLocationArrow />
                  </span>
                  <span>{jobLocation}</span>
                </p>
                <p>
                  <span className="icon">
                    <FaCalendarAlt />
                  </span>
                  <span>{createdAt_formatted}</span>
                </p>
                <p className="status">
                  <span className={`btn btn-${status}`}>{status}</span>
                </p>
              </div>
              <div className="btn-container">
                <Link
                  to="/dashboard/add-job"
                  className="btn btn-edit"
                  onClick={() =>
                    dispatch(
                      handleEditing({
                        _id,
                        company,
                        status,
                        position,
                        jobType,
                        jobLocation,
                      })
                    )
                  }
                  disabled={isLoading}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => dispatch(deleteJob(_id))}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  article {
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }
  .btn {
    padding: 0.5rem 1rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }
  .header {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    text-transform: capitalize;

    h5 {
      font-size: 1.5rem;
      font-weight: 400;
      font-family: var(--headingFont);
      margin: 1rem 0;
    }

    p {
      font-size: 1.3rem;
      font-family: var(--bodyFont);
      color: var(--grey);
    }
  }
  .content {
    padding: 0 2rem;
    display: grid;
    row-gap: 1rem;
    grid-template-columns: 1fr;

    p {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
    }
    span {
      font-size: 1.1rem;
      font-family: var(--headingFont);
      text-transform: capitalize;
    }
    .icon {
      margin-right: 1rem;
      color: var(--primary);
    }
    .btn-interview {
      background-color: var(--greenDark);
      cursor: default;
      box-shadow: none;
    }
    .btn-pending {
      background-color: var(--grey);
      cursor: default;
      box-shadow: none;
    }
    .btn-declined {
      background-color: var(--redDark);
      cursor: default;
      box-shadow: none;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    font-size: 2rem;
    background-color: var(--primaryDark);
    color: var(--white);
    border-radius: 50%;
  }
  .info {
    flex-grow: 1;
  }
  .btn-container {
    padding: 0 2rem;
    display: flex;
    gap: 1rem;
    justify-content: start;
    .btn-edit {
      background-color: var(--green);
      color: var(--greenDark);
    }
    .btn-delete {
      background-color: var(--red);
      color: var(--redDark);
    }
  }
  @media (min-width: 992px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
    }
    .content {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Jobs;
