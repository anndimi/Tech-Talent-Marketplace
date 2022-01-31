import React from "react";
import user from "../reducers/user";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styled from "styled-components";
import linkedinIcon from "../assets/linkedin-icon.png";
import githubIcon from "../assets/github-icon.png";
import { EditProfile } from "./EditProfile";
import { UploadImg } from "./UploadImg";
import { MyAdds } from "./MyAdds";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import DeleteUser from "./Buttons/DeleteUser";

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const UserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const location = useSelector((store) => store.user.location);
  const userBio = useSelector((store) => store.user.bio);
  const linkedIn = useSelector((store) => store.user.linkedIn);
  const gitHub = useSelector((store) => store.user.github);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

  const [isEditModalActive, setEditModalActive] = useState(false);
  const [isImageModalActive, setImageModalActive] = useState(false);
  const [myImage, setMyImage] = useState("");
  const { id } = useParams();

  const dummyImage =
    "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80";

  const toggleEditModal = () => {
    setEditModalActive(!isEditModalActive);
  };

  const toggleImageModal = () => {
    setImageModalActive(!isImageModalActive);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL(`userprofile/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setMyImage(data.response.image);
        console.log(myImage);
      });
  }, [id, myImage]);

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

  return (
    <div>
      <h1>Welcome to your page, {username}!</h1>
      <ProfileImage
        src={myImage ? myImage.imageUrl : dummyImage}
        alt="User Profile image "
      />
      <button
        onClick={() => {
          navigate("edit/image");
          toggleImageModal();
        }}
      >
        Upload profile image
      </button>
      <section
        onClick={() => {
          setEditModalActive(false);
          setImageModalActive(false);
        }}
      >
        <EditProfile
          isEditModalActive={isEditModalActive}
          toggleEditModal={toggleEditModal}
          onClose={() => setEditModalActive(false)}
        />
        <UploadImg
          isImageModalActive={isImageModalActive}
          toggleImageModal={toggleImageModal}
          onClose={() => setImageModalActive(false)}
        />

        {/* <p>Member since {moment(getTimestamp()).format("MMMM Do YYYY")}</p> */}
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
      </section>
      <button
        className="logout-button"
        onClick={() => {
          navigate("edit");
          toggleEditModal();
        }}
      >
        Edit
      </button>
      <MyAdds />
      <button className="logout-button" onClick={onButtonClick}>
        Logout
      </button>
      <DeleteUser id={id} />
    </div>
  );
};
