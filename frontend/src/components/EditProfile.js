import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import closeIcon from "../assets/close.png";
import { CloseButton } from "./Buttons/StyledButtons";

import user from "../reducers/user";

const EditModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const EditModal = styled.div`
  &.edit-modal-active {
    padding: 0 0 10px 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 50px;
    align-items: center;
    position: absolute;
    top: 20%;
    background: #212427;
    color: #ffffff;
    width: 50%;
    height: 90%;
    border-radius: 15px;
    overflow-y: scroll;
  }
  &.edit-modal-inactive {
    display: none;
  }
  /* form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 60%;
  } */
`;

export const EditProfile = ({ isEditModalActive, toggleEditModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    location: "",
    bio: "",
    linkedIn: "",
    github: "",
    imageUrl: "",
  });
  useEffect(() => {
    if (id)
      fetch(API_URL(`userprofile/${id}`))
        .then((res) => res.json())
        .then(
          (data) =>
            console.log(data.respone, "hello data") && setUser(data.response)
        );
  }, [id]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      body: JSON.stringify({
        // Authorization: accessToken,
      }),
    };
    fetch(API_URL(`userprofile/${id}/edit`), options)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.response);
        console.log(data.response, "data");
        if (data.success) {
          console.log(data.response, "hekllo");
          dispatch(user.actions.setName(data.response.name));
          dispatch(user.actions.setLocation(data.response.location));
          dispatch(user.actions.setBio(data.response.bio));
          dispatch(user.actions.setLinkedIn(data.response.linkedIn));
          dispatch(user.actions.setImageUrl(data.response.imageUrl));
          dispatch(user.actions.setGithub(data.response.github));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setName(null));
          dispatch(user.actions.setLocation(null));
          dispatch(user.actions.setBio(null));
          dispatch(user.actions.setLinkedIn(null));
          dispatch(user.actions.setImageUrl(null));
          dispatch(user.actions.setGithub(null));
          dispatch(user.actions.setError(data.response));
        }
      });
    setUserInfo({
      name: "",
      location: "",
      bio: "",
      linkedIn: "",
      github: "",
    });
  };

  return (
    <>
      <EditModalWrapper>
        <EditModal
          className={
            isEditModalActive ? "edit-modal-active" : "edit-modal-inactive"
          }
        >
          <CloseButton onClick={toggleEditModal}>
            <img src={closeIcon} alt="close window" />
          </CloseButton>
          <h1>edit your profile</h1>

          {/* <p>Username: {userInfo.name}</p> */}
          <form onSubmit={onFormSubmit}>
            <label htmlFor="image">Profile image</label>
            <input
              accept="image/png, image/jpeg"
              id="image"
              type="file"
              value={userInfo.imageUrl}
              placeholder="image"
              onChange={(e) =>
                setUserInfo({ ...userInfo, imageUrl: e.target.value })
              }
            />

            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={userInfo.name}
              placeholder="name"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={userInfo.location}
              placeholder="location"
              onChange={(e) =>
                setUserInfo({ ...userInfo, location: e.target.value })
              }
            />
            <label htmlFor="bio">Bio</label>
            <input
              id="bio"
              type="textarea"
              value={userInfo.bio}
              placeholder="bio"
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.target.value })
              }
            />
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              id="linkedin"
              type="text"
              placeholder="linkedin"
              value={userInfo.linkedIn}
              onChange={(e) =>
                setUserInfo({ ...userInfo, linkedIn: e.target.value })
              }
            />
            <label htmlFor="github">Github</label>
            <input
              id="github"
              type="text"
              placeholder="github"
              value={userInfo.github}
              onChange={(e) =>
                setUserInfo({ ...userInfo, github: e.target.value })
              }
            />
            <button type="submit">Save changes</button>
          </form>
        </EditModal>
      </EditModalWrapper>
    </>
  );
};
