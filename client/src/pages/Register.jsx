import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { registerUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state to store form data
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [user]);

  return (
    <Wrapper>
      <div className="register-container">
        <div className="header">
          <img src={logo} alt="Job Tracker" />
          <p className="title">Register </p>
        </div>
        <form className="form-register" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={values.name ?? ""}
            required={true}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={values.email ?? ""}
            required={true}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={values.password ?? ""}
            required={true}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-submit" disabled={isLoading}>
            Submit
          </button>
        </form>
        <div className="footer">
          Already a member?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-container {
    border-top: 5px solid var(--primary);
    max-width: 400px;
    width: 90vw;
    background-color: var(--white);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 2rem 2.5rem;
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  img {
    height: 60px;
  }
  .title {
    font-size: 1.5rem;
    text-align: center;
    font-family: var(--headingFont);
  }
  .form-register {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.2rem;
  }
  input {
    padding: 0.375rem 0.75rem;
    background: var(--backgroundColor);
    border-radius: 5px;
    border: 0.5px solid var(--grey);
  }
  .btn-submit {
    margin-top: 0.75rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }
  .footer {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1.1rem;
  }
  .link {
    color: var(--secondary);
    font-weight: 800;
  }
`;

export default Register;
