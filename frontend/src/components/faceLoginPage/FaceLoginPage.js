import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "@mui/material";

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

const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '200px',
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '4px',
    },
  };

export default function FaceLoginPage() {
  const [justChecking, setJustChecking] = useState(false);
  const [valid, setValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const [email, setEmail] = useState("");

  const sendRequest = async () => {
    const response = await axios.post(
      "http://localhost:5000/groupproject/api/login",
      {
        email: email,
      }
    );
    console.log(response);
  };

  return (
    <StyledCheckoutPage valid={valid} justChecking={justChecking}>
      <div className='checkout-sign-in'>
        <h1>Sign In by Face</h1>
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
        <button
          className='checkout-sign-in-button'
          onClick={() => {
            validateEmail() && setShowModal(true);
          }}
        >
          CONTINUE
        </button>
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
      <Modal
        open={showModal}
        >
        <div style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "4px",
        }}>
          <h1>Face Login</h1>
          <p>Face Login is not available at this time.</p>
          <button onClick={() => setShowModal(false)} style={{
                backgroundColor: "#3D69E1",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px",
          }}>OK</button>
        </div>
        </Modal>
    </StyledCheckoutPage>
  );
}
