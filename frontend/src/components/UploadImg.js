import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import styled from "styled-components";
import closeIcon from "../assets/close.png";
import { CloseButton } from "./Buttons/StyledButtons";

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

export const UploadImg = ({
  isImageModalActive,
  toggleImageModal,
  onClose,
}) => {
  const [image, setImage] = useState("");
  const { id } = useParams();
  const fileInput = useRef();
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    window.location.reload(true);
    // event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    fetch(API_URL(`userprofile/${id}/image`), {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data.response) && setImage(data.response));

    onClose(navigate(`/userprofile/${id}`));
  };

  return (
    <>
      <EditModalWrapper>
        <EditModal
          className={
            isImageModalActive ? "edit-modal-active" : "edit-modal-inactive"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton
            onClick={() => {
              navigate(`/userprofile/${id}`);
              toggleImageModal();
            }}
          >
            <img src={closeIcon} alt="close window" />
          </CloseButton>
          <h1>edit your profile image</h1>
          <form onSubmit={handleFormSubmit}>
            <label>
              Upload profile Image.
              <input type="file" ref={fileInput} />
            </label>
            <button type="submit">Save</button>
          </form>
        </EditModal>
      </EditModalWrapper>
    </>
  );
};
