import React from "react";
import user from "../reducers/user";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import moment from "moment";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const accessToken = useSelector((store) => store.user.accessToken);
  const id = useSelector((store) => store.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      };
      fetch(API_URL(`userprofile/${id}`), options)
        .then((res) => res.json())
        .then((data) => setUserProfile(data.response));
    }
  }, []);

  return (
    <div>
      {/* <img src={userProfile.userImage} /> */}
      <p>This is {userProfile.username} profile</p>
      <p>Name: {userProfile.name}</p>
      <p>Your email is {userProfile.email}</p>
      <p>Location: {userProfile.location}</p>
      <p>Member since: {moment(userProfile.memberSince).fromNow()}</p>
    </div>
  );
};
