import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import { UserContext } from "../userContext/UserProvider";
import { publics } from "../utils/session";

const Login = () => {
  const history = useHistory();
  publics(history);
  const { login, login_errors } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleInput = event => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = event => {
    event.preventDefault();
    console.log(login_errors);
    login(form);
    if (login_errors.email === undefined || login_errors.password === undefined)
      return;
    history.push('/');

    setForm({
      email: "",
      password: ""
    });
  };

  // if (sessionStorage.getItem("auth")) {
  //   history.push("/");
  // }

  return (
    <Form>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <i className='fa fa-envelope'></i>
          <input
            style={
              login_errors.email
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 15px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='email'
            placeholder={
              login_errors.email ? login_errors.email : "Email Address..."
            }
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              login_errors.password
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 10px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='password'
            placeholder={
              login_errors.password ? login_errors.password : "Password..."
            }
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>
          <i className='fa fa-share-square'></i> Login
        </button>
      </form>
    </Form>
  );
};

const Form = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0% 20%;
  .error {
    color: red;
  }
  h1 {
    font-size: 3rem;
    color: teal;
    text-align: center;
    padding-bottom: 1.5rem;
  }
  form {
    width: 100%;
    display: block;
    div {
      width: 80%;
      margin: auto;
      position: relative;
      top: 0;
      i {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: teal;
      }
      input {
        width: 100%;
        padding: 15px 30px;
        margin: 15px 0;
        border-radius: 5px;
        outline: none;
        border: 0.4px solid #eee;
        box-shadow: 0 3px 15px #eee;

        &:focus {
          background: #f1f1f1;
        }
      }
    }
    button {
      display: block;
      padding: 10px 25px;
      font-size: 1.1rem;
      border-radius: 5px;
      outline: none;
      border: 0.4px solid #eee;
      box-shadow: 0 3px 15px #eee;
      background: teal;
      color: #eee;
      margin: 1rem auto;
      cursor: pointer;
    }
  }
`;

export default Login;
