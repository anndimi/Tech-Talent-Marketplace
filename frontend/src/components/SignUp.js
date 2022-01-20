import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import styled from "styled-components";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const mode = useSelector((store) => store.user.mode);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const id = useSelector((store) => store.user.userId);
  // const { id } = useParams();
  // const fileInput = useRef();

  useEffect(() => {
    if (accessToken) {
      navigate("/userprofile");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    console.log("hej");
    event.preventDefault();

    // const formData = new FormData(event.target);

    // formData.append("username", username);
    // formData.append("password", password);
    // formData.append("email", email);
    // formData.append("image", fileInput.current.files[0]);

    const options = {
      method: "POST",
      // body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setMemberSince(data.response.memberSince));
            // dispatch(user.actions.setImageUrl(data.response.imageUrl));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setMemberSince(null));
            // dispatch(user.actions.setImageUrl(null));
            dispatch(user.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        {/* <label>
          Profile image:
          <input type="file" ref={fileInput} />
        </label> */}
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label htmlFor="email">E-mail: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>

      <label htmlFor="signin">Log In </label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => dispatch(user.actions.setMode("signin"))}
      />

      <label htmlFor="signup">Sign Up </label>
      <input
        id="signup"
        type="radio"
        checked={mode === "signup"}
        onChange={() => dispatch(user.actions.setMode("signup"))}
      />
    </div>
  );
};

export default SignUp;
