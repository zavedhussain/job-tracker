import { useDispatch, useSelector } from "react-redux";
import { handleFilters, resetFilters } from "../features/jobs/jobsSlice";
import { styled } from "styled-components";

const Searchbar = () => {
  const { filters, isLoading } = useSelector((state) => state.jobs);

  const {
    status,
    jobType,
    jobLocation,
    search,
    sort,
    statusOptions,
    jobTypeOptions,
    jobLocationOptions,
    sortOptions,
  } = filters;

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    dispatch(handleFilters({ id, value }));
  };
  return (
    <Wrapper>
      <form className="form-search">
        {/* search */}

        <div className="form-row">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleChange}
            defaultValue={search}
          />
        </div>

        {/* status */}

        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            onChange={handleChange}
            defaultValue={status}
          >
            {statusOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        {/* jobType */}

        <div className="form-row">
          <label htmlFor="jobType">Job Type</label>
          <select
            name="jobType"
            id="jobType"
            onChange={handleChange}
            defaultValue={jobType}
          >
            {jobTypeOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        {/* jobLocation */}

        <div className="form-row">
          <label htmlFor="jobLocation">Job Location</label>
          <select
            name="jobLocation"
            id="jobLocation"
            onChange={handleChange}
            defaultValue={jobLocation}
          >
            {jobLocationOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        {/* sort */}

        <div className="form-row">
          <label htmlFor="sort">Sort By:</label>
          <select
            name="sort"
            id="sort"
            onChange={handleChange}
            defaultValue={sort}
          >
            {sortOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="button"
          className="btn btn-submit"
          disabled={isLoading}
          onClick={() => dispatch(resetFilters())}
        >
          Reset Filters
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem auto;
  max-width: 1000px;
  width: 90vw;
  background-color: var(--white);
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 2rem 2.5rem;

  .form-search {
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
  .btn-submit {
    align-self: end;
    padding: 0.375rem 0.75rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }

  @media (min-width: 992px) {
    .form-search {
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
    }
  }
`;

export default Searchbar;
