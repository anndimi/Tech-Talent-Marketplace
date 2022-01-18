import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const mode = useSelector((store) => store.user.mode);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
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
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };
  console.log(mode);

  return (
    <div>
      <form onSubmit={onFormSubmit}>
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
