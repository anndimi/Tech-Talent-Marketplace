import React from "react";
import user from "../reducers/user";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
// import styled from "styled-components";
import linkedinIcon from "../assets/linkedin-icon.png";
import githubIcon from "../assets/github-icon.png";
import { EditProfile } from "./EditProfile";
import { UploadImg } from "./UploadImg";
import { MyAdds } from "./MyAdds";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import DeleteUser from "./Buttons/DeleteUser";
import dummyUser from "../assets/dummy-user.png";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// const ProfileImage = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   object-fit: cover;
// `;

const hiddenInput = styled("input")({
  display: "none"
})

export const UserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const location = useSelector((store) => store.user.location);
  const userBio = useSelector((store) => store.user.bio);
  const linkedIn = useSelector((store) => store.user.linkedIn);
  const gitHub = useSelector((store) => store.user.github);
  const created = useSelector((store) => store.user.created);
  const image = useSelector((store) => store.user.image);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditModalActive, setEditModalActive] = useState(false);
  const [isImageModalActive, setImageModalActive] = useState(false);
  const [myImage, setMyImage] = useState("");
  const { id } = useParams();

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

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

  return (
    <div>
      <h1>Welcome to your page, {username}!</h1>
      
      <img style={{width: '100px', height: "100px", borderRadius: "50%", objectfitCover: "cover" }} src={image || dummyUser} alt="User Profile image" alt="profile" />
      
      {/* <button
        onClick={() => {
          navigate("edit/image");
          toggleImageModal();
        }}
      >
        Upload profile image
      </button> */}
      <label htmlFor="icon-button-file">
        <hiddenInput accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
          navigate("edit/image");
          toggleImageModal();
        }}>
          <PhotoCamera />
        </IconButton>
      </label>
      <section
        onClick={() => {
          setEditModalActive(false);
          setImageModalActive(false);
          navigate(`/userprofile/${id}`);
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
        <p>Member since {moment(created).format("MMMM Do YYYY")}</p>
        <p>Name: {name}</p>
        <p>Location: {location}</p>
        <p>Bio: {userBio}</p>
        <p>Your email is {email}</p>
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="linkedin-icon" />
        </a>
        <a href={gitHub} target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="github-icon" />
        </a>
      </section>
      <Button variant="contained" 
      sx={{fontFamily: "secondary.fontFamily", letterSpacing: 1.3}}
        // className="logout-button"
        onClick={() => {
          navigate("edit");
          toggleEditModal();
        }}
      >
        {/* <span style={{display: "flex", justifyContent: "center"}}> */}
          Edit
          {/* </span> */}
      </Button>
      <MyAdds />
      <Button variant="contained" 
      sx={{fontFamily: "secondary.fontFamily", letterSpacing: 1.3}}
      // className="logout-button" 
      onClick={onButtonClick}>
        Logout
      </Button>
      <DeleteUser id={id} />
    </div>
  );
};
