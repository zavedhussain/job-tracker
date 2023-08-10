import { styled } from "styled-components";
import main from "../assets/job_landing.svg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Listen" className="logo" />
      </nav>
      <div className="hero">
        <div className="info">
          <h1>
            <span>Job</span> Tracking App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            praesentium laborum error obcaecati rerum facere labore, officia a
            eaque veritatis maiores quibusdam necessitatibus et quidem officiis
            consectetur ducimus architecto in?
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="listen" className="img main-img" />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  nav {
    height: 5rem;
    display: flex;
    align-items: center;
    background-color: var(--white);
  }
  .logo {
    height: 50px;
    margin-left: 2rem;
  }
  .hero {
    margin: 0 auto;
    max-width: var(--max-width);
    width: 90vw;
    flex: 1;
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    font-size: 2rem;
    font-family: var(--headingFont);
    color: var(--secondary);
    span {
      color: var(--primary);
    }
  }
  p {
    color: var(--grey);
    font-family: var(--bodyFont);
    font-size: 1.1rem;
  }
  .main-img {
    display: none;
  }
  .btn-hero {
    margin-top: 2rem;
    display: inline-block;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
    &:hover {
      background-color: var(--primaryDark);
    }
  }
  @media (min-width: 992px) {
    .hero {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;

export default Landing;
