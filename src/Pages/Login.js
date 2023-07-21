import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppImages from "../Assets/Images";
import ImageBanner from "../Components/ImageBanner/ImageBanner";
import TextInput from "../Elements/TextInput/TextInput";
import BasicCta from "../Elements/Buttons/LoadingButton";
import AppContract from "../mocks/api";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { saveUserDetails } from "../Redux/Reducer/Authentication.reducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [form, setForm] = useState({});

  function createNotification(type, message1, message2, duration = 3000) {
    switch (type) {
      case "info":
        NotificationManager.info(message1, message2, duration);
        break;
      case "success":
        NotificationManager.success(message1, message2, duration);
        break;
      case "warning":
        NotificationManager.warning(message1, message2, duration);
        break;
      default:
        NotificationManager.error(message1, message2, duration);
    }
  }

  async function handleLogin(path = "") {
    if (form["email"] && form["password"]) {
      try {
        const response = await fetch(
          `${AppContract.basePath}${AppContract.auth.signin}`,
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
              primaryEmail: form["email"], // Use primaryEmail key
              password: form["password"], // Use password key
            })});
        const result = await response.json();
        if (result.success) {
          createNotification("success", result.message);
          dispatcher(saveUserDetails(result.data));
          navigate(`/home`);
        } else {
          createNotification(null, result.message);
        }
      } catch (error) {
        createNotification(null, error);
        console.log(error);
      }
    } else {
      createNotification(null, "Email or Password is not valid");
    }
  }

  function handleInput(e) {
    if (e) {
      const formCopy = {
        ...form,
        [e.target.id]: e.target.value,
      };
      setForm(formCopy);
    }
  }

  return (
    <main className="page-container">
      <ImageBanner Uri={AppImages.foodDeliveryOne} classes="authImageHeader" />
      <Box
        sx={{
          padding: 5,
        }}
      >
        <TextInput
          id="email"
          label="Email"
          placeholder="Enter your email"
          overrides={{
            marginBottom: "15px",
          }}
          value={form && form["email"]}
          handleChange={handleInput}
        />
        <TextInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={form && form["password"]}
          handleChange={handleInput}
          type="password"
          overrides={{
            marginBottom: "20px",
          }}
        />

        <BasicCta
          label="Sign In"
          overrides={{
            width: "100%",
            height: "50px",
            background: "#C90100",
          }}
          disabled={!form["email"] || !form["password"]}
          onClick={handleLogin}
        />
      </Box>
    </main>
  );
}
