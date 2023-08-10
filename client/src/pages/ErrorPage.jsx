import { Link } from "react-router-dom";
import img from "../assets/job_error.svg";
import { styled } from "styled-components";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <img src={img} alt="not found" />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to="/dashboard">back home</Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-family: var(--headingFont);
    font-size: 1.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey);
    font-family: var(--bodyFont);
  }
  a {
    color: var(--primary);
    text-decoration: underline;
    text-transform: capitalize;
    font-family: var(--bodyFont);
  }
`;
export default Error;
