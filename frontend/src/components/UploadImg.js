import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/constants";
import user from "../reducers/user";
import styled from "styled-components";
import closeIcon from "../assets/close.png";
import { CloseButton } from "./elements/StyledButtons";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// const EditModalWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `;
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

export const UploadImg = ({
  isImageModalActive,
  toggleImageModal,
  onClose,
}) => {
  const [image, setImage] = useState("");
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

              {/* <CloseButton
                onClick={() => {
                  navigate(`/userprofile/${id}`);
                  toggleImageModal();
                }}
              >
                <img src={closeIcon} alt="close window" />
              </CloseButton> */}

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
                  margin: 4,
                }}
              >
                <label style={{ fontWeight: 600 }}>
                  Upload profile Image.
                  <input type="file" ref={fileInput} />
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
