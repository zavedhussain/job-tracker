import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../features/jobs/jobsSlice";
import { styled } from "styled-components";

const Pagination = () => {
  const { totalPages, page } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <span className="page-number">{page}</span>
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;

  .prev-btn,
  .next-btn,
  .page-number {
    width: 100px;
    height: 40px;
    font-size: 1.2rem;
    font-family: var(--bodyFont);
    background: var(--white);
    border: 1px solid var(--grey);
    border-radius: 5px;
    color: var(--primary);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .page-number {
    width: 50px;
    background: var(--primary);
    color: var(--white);
    border: transparent;
    cursor: default;
  }
`;

export default Pagination;
