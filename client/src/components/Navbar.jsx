import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser, toggleSidebar } from "../features/user/userSlice.js";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Job Tracker" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaBars />
          </button>
        </div>
        <div className="nav-links">
          <ul className="links">
            <Link to="/dashboard">
              <li>Home</li>
            </Link>
            <Link to="/dashboard/add-job">
              <li>Add Job</li>
            </Link>
          </ul>
          <p className="btn" onClick={() => dispatch(logoutUser())}>
            Logout
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
  border-bottom:1px solid var(--primary);

  .nav-center {
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    img{
      height:50px;
    }
  }
  .nav-links {
    display: none;
    gap: 1rem;
  }
  .nav-toggle {
      background: transparent;
      border-color: transparent;
      font-size: 1.75rem;
      color: var(--primary);
      cursor: pointer;
    }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-links {
      display: flex;
      align-items: center;
      flex-grow: 1;
      justify-content: space-around;
      .links{
        display: flex;
        align-items: center;
        li {
          margin: 0 0.5rem;
        }
        a {
          font-size: 1.2rem;
          text-transform: capitalize;
          padding: 0.5rem;
          font-family:var(--headingFont);
          color:black;
          &:hover {
            border-bottom: 2px solid var(--primary);
          }
        }
      }
      p{
        font-size: 1.2rem;
      }
      .btn {
        background-color: var(--primary);
        padding: 0.5rem 1.5rem;
        border-radius: 2px;
        border: none;
        &:hover {
            background-color:var(--primaryDark);
            transform: scale(1.1);
          }
      }
    }
`;

export default Navbar;
