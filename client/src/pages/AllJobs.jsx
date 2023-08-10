import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../features/jobs/jobsSlice";
import Jobs from "../components/Jobs";
import { styled } from "styled-components";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const AllJobs = () => {
  const { isLoading, totalJobs, page, filters } = useSelector(
    (state) => state.jobs
  );
  const { status, jobType, jobLocation, search, sort } = filters;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, status, jobType, jobLocation, search, sort]);
  if (isLoading) {
    return <Loading />;
  }
  if (totalJobs === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <>
      <Searchbar />
      <Jobs />
      <Pagination />
    </>
  );
};

const Wrapper = styled.section`
  width: 90%;
  margin: 2rem auto;
  }
`;

export default AllJobs;
