import { styled } from "styled-components";

const Loading = () => {
  return <Wrapper>Loading...</Wrapper>;
};

const Wrapper = styled.section`
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--primary);
`;

export default Loading;
