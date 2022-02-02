import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import closeIcon from "../assets/close.png";
import { CloseButton } from "./elements/StyledButtons";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";

import user from "../reducers/user";

export const EditProfile = ({
  isEditModalActive,
  toggleEditModal,
  onClose,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [users, setUsers] = useState("");

  const name = useSelector((store) => store.user.name);
  const location = useSelector((store) => store.user.location);
  const bio = useSelector((store) => store.user.bio);
  const github = useSelector((store) => store.user.github);
  const linkedIn = useSelector((store) => store.user.linkedIn);

  const [userInfo, setUserInfo] = useState({
    name: name,
    location: location,
    bio: bio,
    linkedIn: linkedIn,
    github: github,
    // imageUrl: "",
  });

  // console.log("userID:", userId);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo }),
    };

    fetch(API_URL(`userprofile/${id}/edit`), options)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.response);
        if (data.success) {
          console.log(data.response, "success");
          dispatch(user.actions.setName(data.response.name));
          dispatch(user.actions.setLocation(data.response.location));
          dispatch(user.actions.setBio(data.response.bio));
          dispatch(user.actions.setLinkedIn(data.response.linkedIn));
          dispatch(user.actions.setGithub(data.response.github));
          dispatch(user.actions.setError(null));
          // navigate(`/userprofile/${id}`);
        } else {
          dispatch(user.actions.setName(null));
          dispatch(user.actions.setLocation(null));
          dispatch(user.actions.setBio(null));
          dispatch(user.actions.setLinkedIn(null));
          dispatch(user.actions.setGithub(null));
          dispatch(user.actions.setError(data.response));
          // navigate(`/userprofile/${id}`);
        }
      });
    onClose(navigate(`/userprofile/${id}`));
  };

  // console.log("hello from", userInfo.location);
  // console.log("your name is", userInfo.name);
  if (isEditModalActive) {
    document.body.style.overflow = "hidden";
    return (
      <>
        <ModalWrapper>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                Edit your profile
              </Typography>
              <Button
                sx={{ alignSelf: "flex-start", paddingTop: 1.5 }}
                onClick={() => {
                  navigate(`/userprofile/${id}`);
                  toggleEditModal();
                }}
              >
                <img
                  style={{ height: 35, width: 35 }}
                  src={closeIcon}
                  alt="close window"
                />
              </Button>
            </ModalHeader>

            <form onSubmit={onFormSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  margin: 4,
                }}
              >
                <TextField
                  sx={{ fontStyle: "italic" }}
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  defaultValue={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
                <TextField
                  sx={{ fontStyle: "italic" }}
                  id="filled-basic"
                  label="Location"
                  variant="filled"
                  defaultValue={userInfo.location}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, location: e.target.value })
                  }
                />
                <TextField
                  sx={{ fontStyle: "italic" }}
                  id="filled-basic"
                  label="Bio"
                  rows={3}
                  multiline
                  variant="filled"
                  defaultValue={userInfo.bio}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, bio: e.target.value })
                  }
                />
                <TextField
                  sx={{ fontStyle: "italic" }}
                  id="filled-basic"
                  label="LinkedIn"
                  variant="filled"
                  placeholder="https://..."
                  defaultValue={userInfo.linkedIn}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, linkedIn: e.target.value })
                  }
                />
                <TextField
                  sx={{ fontStyle: "italic" }}
                  id="filled-basic"
                  label="Github"
                  variant="filled"
                  placeholder="https://..."
                  defaultValue={userInfo.github}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, github: e.target.value })
                  }
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    fontFamily: "secondary.fontFamily",
                    letterSpacing: 1.3,

                    margin: 1,
                  }}
                >
                  Save changes
                </Button>
              </Box>
            </form>
          </ModalCard>
        </ModalWrapper>
      </>
    );
  } else {
    document.body.style.overflow = "visible";
    return null;
  }
};
