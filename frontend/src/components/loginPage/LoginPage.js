import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpClient from "../../httpClient";

const StyledCheckoutPage = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  color: black;
  padding-top: 160px;
  max-width: 362px;
  margin: auto;
  min-height: calc(100vh - 91.2px);
  text-align: left;
  h1 {
    font-size: 28px;
    font-family: "Gotham-Medium", sans-serif;
  }
  .checkout-sign-in {
    display: flex;
    flex-direction: column;
    gap: 28px;
    .checkout-email-sign-in-title {
      display: flex;
      align-items: center;
      font-family: "Gotham-Bold", sans-serif;
      color: #7d7e81;
      width: 320px;
      margin: auto;
      .email-info-button {
        font-family: "Gotham-Bold", sans-serif;
        background-color: #3e6ae1;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 50%;
        font-size: 12px;
        border: none;
        margin-left: 8px;
      }
    }
    .checkout-email-sign-in-input {
      border-radius: 20px;
      outline: ${({ valid }) => (valid ? "none" : "2px solid #CA7970")};
      background-color: #f5f5f5;
      position: relative;
      &:focus-within {
        outline: ${({ valid }) =>
          valid ? "2px solid #d0d1d2" : "2px solid #CA7970"};
      }
      input {
        display: block;
        border: none;
        outline: none;
        width: 320px;
        height: 38px;
        margin: auto;
        background: none;
      }
      &::before {
        content: "Please enter valid value";
        opacity: ${({ valid }) => (valid ? "0" : "1")};
        position: absolute;
        bottom: 0px;
        left: 16px;
        transform: translateY(calc(100% + 4px));
        font-size: 14px;
        color: #b74134;
      }
    }
    .checkout-sign-in-button {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      background-color: #3d69e1;
      border: none;
      color: white;
      position: relative;
      &:active,
      :focus {
        &::after {
          content: "";
          border: 2px solid white;
          position: absolute;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          top: 3px;
          left: 3px;
          border-radius: 32px;
        }
      }
      &:hover {
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0.1)
        );
      }
    }
    .forgot-something-options {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 1em;
      p {
        border-bottom: 1px solid #212529;
        line-height: 1em;
      }
      hr {
        height: 1em;
        width: 2px;
        background: #212529;
        border: none;
        opacity: 1;
      }
    }
  }
  .checkout-sign-in-divider {
    display: block;
    height: 2px;
    width: 100%;
    margin: 60px 0px;
    background: rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: visible;
    opacity: 1;
    border: none;
    &::before {
      content: "OR";
      position: absolute;
      top: 0px;
      background: white;
      top: 50%;
      left: 50%;
      padding: 8px;
      transform: translate(-50%, -50%);
    }
  }
  .guest-checkout {
    p {
      font-size: 14px;
      margin: 20px 0px;
    }
    button {
      height: 40px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      background-color: white;
      border: none;
      color: black;
      position: relative;
      outline: 3px solid black;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

// export default function LoginPage() {
//   const [justChecking, setJustChecking] = useState(false);
//   const [valid, setValid] = useState(true);

//   const navigate = useNavigate();

//   const validateEmail = () => {
//     let regexp =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (email.length) {
//       setValid(regexp.test(String(email).toLowerCase()));
//       return true;
//     }
//     setValid(false);
//     return false;
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const sendRequest = async () => {
//     await fetch("http://127.0.0.1:5000/login", {
//       method: "POST",
//       body: JSON.stringify({ email: email, password: password }),
//     })
//       .then((res) => res.json()).catch((err) => console.log(err));
//   };
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(null);
  const [justChecking, setJustChecking] = useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    let regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length) {
      setValid(regexp.test(String(email).toLowerCase()));
      return true;
    }
    setValid(false);
    return false;
  };

  const sendRequest = async () => {
    try {
      if (validateEmail()) {
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        if (response.ok) {
          // Đăng nhập thành công, thực hiện các thao tác cần thiết
          navigate("/groupproject"); // Chuyển hướng đến trang sau khi đăng nhập thành công
        } else {
          // Xử lý lỗi khi đăng nhập không thành công
          const errorData = await response.json();
          setError(errorData.error || "Đăng nhập không thành công!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Đã xảy ra lỗi trong quá trình xử lý yêu cầu.");
    }
  };

  return (
    <StyledCheckoutPage valid={valid} justChecking={justChecking}>
      <div className='checkout-sign-in'>
        <h1>Sign In</h1>
        <p className='checkout-email-sign-in-title'>
          Email Address <button className='email-info-button'>i</button>
        </p>
        <div className='checkout-email-sign-in-input'>
          <input
            type='text'
            value={email}
            onChange={(e) => (
              setEmail(e.target.value), console.log(e.target.value)
            )}
            onBlur={validateEmail}
          />
        </div>
        <p className='checkout-email-sign-in-title'>Password</p>
        <div className='checkout-email-sign-in-input'>
          <input type='password' 
            value={password}
            onChange={(e) => (
              setPassword(e.target.value), console.log(e.target.value)
            )}
          />
        </div>
        <button
          className='checkout-sign-in-button'
          onClick={() => {
            validateEmail() && sendRequest();
          }}
        >
          CONTINUE
        </button>
        <div className='forgot-something-options'>
          <p>Forgot email?</p>
          <hr />
          <p>Forgot password?</p>
        </div>
      </div>
      <hr className='checkout-sign-in-divider' />
      <div className='guest-checkout'>
        <p style={{
          textAlign: "center",
        }}>
          If you don't have an account, you can register here.
        </p>
        <button onClick={() => navigate("/groupproject/signup")}>REGISTER HERE</button>
      </div>
    </StyledCheckoutPage>
  );
}


