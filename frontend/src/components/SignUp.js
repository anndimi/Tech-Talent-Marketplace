import React, { useState } from "react";
import { useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import "../signup.css";
import { StyledHeaderImage } from "./elements/HeroImage";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isContainerActive, setIsContainerActive] = useState("");
  const [mode, setMode] = useState("signin");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setLocation(data.response.location));
            dispatch(user.actions.setBio(data.response.bio));
            dispatch(user.actions.setLinkedIn(data.response.linkedIn));
            dispatch(user.actions.setGithub(data.response.github));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setCreated(data.response.created));
            dispatch(user.actions.setLikedPost(data.response.likedPost));
            dispatch(user.actions.setError(null));
            navigate(`/userprofile/${data.response.id}`);
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setName(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setLocation(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setCreated(null));
            dispatch(user.actions.setLinkedIn(null));
            dispatch(user.actions.setGithub(null));
            dispatch(user.actions.setBio(null));
            dispatch(user.actions.setLikedPost(null));
            dispatch(user.actions.setError(data.error));
          });

          swal({
            title: data.response,
            icon: "warning",
            button: "Ok!",
          });
        }
      });
  };

  return (
    <>
      <StyledHeaderImage />
      <section className="signup-container">
        <div
          className={`container ${
            isContainerActive ? "right-panel-active" : ""
          }`}
        >
          <div className="form-container sign-up-container">
            {/* Sign up form */}
            <form className="signup-form" action="#" onSubmit={onFormSubmit}>
              <h1>Create Account</h1>
              <div className="social-container"></div>
              <input
                className="signup-input"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="signup-input"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="signup-input"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="signup-button">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            {/* Sign in form */}
            <form className="signup-form" action="#" onSubmit={onFormSubmit}>
              <h1>Sign in</h1>
              <div className="social-container"></div>

              <input
                className="signup-input"
                id="username"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="signup-input"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="signup-button">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Sign in to keep your connection with us.</p>
                <button
                  className="signup-button ghost"
                  id="signIn"
                  onClick={() => {
                    setMode("signin");
                    setIsContainerActive(false);
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account?</h1>
                <p>Sign up and start your journey with us!</p>
                <button
                  className="signup-button ghost"
                  id="signUp"
                  onClick={() => {
                    setMode("signup");
                    setIsContainerActive(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
