import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/constants";
import user from "../reducers/user";
import closeIcon from "../assets/icons/close.png";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";
import { Button, Box, Typography } from "@mui/material";

const UploadImg = ({ isImageModalActive, toggleImageModal, onClose }) => {
  const { id } = useParams();
  const fileInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    fetch(API_URL(`userprofile/${id}/image`), {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch(user.actions.setImage(data.response.imageUrl)));

    onClose(navigate(`/userprofile/${id}`));
  };

  if (isImageModalActive) {
    document.body.style.overflow = "hidden";
    return (
      <>
        <ModalWrapper>
          <ModalCard
            sx={{ height: 400 }}
            className={
              isImageModalActive ? "edit-modal-active" : "edit-modal-inactive"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader sx={{ bgcolor: "secondary.main" }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                Edit your profile image
              </Typography>
              <Button
                sx={{ alignSelf: "flex-start", paddingTop: 1.5 }}
                onClick={() => {
                  navigate(`/userprofile/${id}`);
                  toggleImageModal();
                }}
              >
                <img
                  style={{ height: 35, width: 35 }}
                  src={closeIcon}
                  alt="close window"
                />
              </Button>
            </ModalHeader>
            <form onSubmit={handleFormSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  margin: 7,
                  marginTop: 10,
                  gap: 5,
                }}
              >
                <label
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Upload profile image: {""}
                  <input
                    type="file"
                    ref={fileInput}
                    style={{
                      marginTop: 10,
                      fontFamily: "inherit",
                      width: 200,
                      fontWeight: 500,
                    }}
                  />
                </label>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    fontFamily: "secondary.fontFamily",
                    letterSpacing: 1.3,
                    margin: 1,
                  }}
                >
                  Save
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

export default UploadImg;
