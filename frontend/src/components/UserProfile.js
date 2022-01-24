import React from "react";
import user from "../reducers/user";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { API_URL } from "../utils/constants";
import moment from "moment";
import styled from "styled-components";
import linkedinIcon from "../assets/linkedin-icon.png";
import githubIcon from "../assets/github-icon.png";
import { EditProfile } from "./EditProfile";

export const UserProfile = () => {
  // const [userProfile, setUserProfile] = useState({});
  const accessToken = useSelector((store) => store.user.accessToken);
  // const id = useSelector((store) => store.user.userId);
  const username = useSelector((store) => store.user.username);
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const location = useSelector((store) => store.user.location);
  const imageUrl = useSelector((store) => store.user.imageUrl);
  const memberSince = useSelector((store) => store.user.memberSince);
  const userBio = useSelector((store) => store.user.bio);
  const linkedIn = useSelector((store) => store.user.linkedin);
  const gitHub = useSelector((store) => store.user.github);
  const clearAccessToken = useSelector((store) => store.user.clearAccessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditModalActive, setEditModalActive] = useState(false);

  const { id } = useParams();
  console.log("id:", id);

  const toggleEditModal = () => {
    setEditModalActive(!isEditModalActive);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  // useEffect(() => {
  //   if (accessToken) {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     };
  //     fetch(API_URL(`userprofile/${id}`), options)
  //       .then((res) => res.json())
  //       .then((data) => setUserProfile(data.response));
  //   }
  // }, []);

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

  return (
    <div>
      <h1>Welcome to your page, {username}!</h1>
      <EditProfile
        isEditModalActive={isEditModalActive}
        toggleEditModal={toggleEditModal}
      />
      <img src={imageUrl} alt="User Profile" />
      <p>Member since: {moment(memberSince).fromNow()}</p>
      <p>Name: {name}</p>
      <p>Location: {location}</p>
      <p>Bio: {userBio}</p>
      <p>Your email is {email}</p>
      <p>
        <img src={linkedinIcon} alt="linkedin-icon" /> {linkedIn}
      </p>
      <p>
        <img src={githubIcon} alt="github-icon" /> {gitHub}
      </p>
      <button className="logout-button" onClick={onButtonClick}>
        Logout
      </button>
      <button
        className="logout-button"
        onClick={() => {
          navigate("edit");
          toggleEditModal();
        }}
      >
        Edit
      </button>
    </div>
  );
};
