import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { StyledButton } from "./Buttons/StyledButtons";
import closeIcon from "../assets/close.png";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import IconSwitcher from "./IconSwitcher";

const Section = styled.section`
  width: 100%;
  &.section-blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AddModal = styled.div`
  &.modal-active {
    padding: 0 30px 0 30px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    /* word-wrap: break-word; */
    word-break: break-word;
    align-items: center;
    position: fixed;
    top: 20%;
    background: #212427;
    color: #ffffff;
    width: 40%;
    height: 70%;
    border-radius: 15px;
    overflow-y: hidden;
    h2 {
      margin: 0;
    }
    p {
      margin 0;
    }
  }
  &.modal-inactive {
    display: none;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 60%;
  }
`;

const CloseButton = styled.button`
  background: none;
  margin-right: 20px;
  margin-top: 20px;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  align-self: end;
  img {
    width: 40px;
    height: 40px;
  }
`;

const SingleAddModal = () => {
  //   const [isModalActive, setModalActive] = useState(false);
  const [add, setAdd] = useState({});
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  //   const toggleModal = () => {
  //     setModalActive(!isModalActive);
  //   };
  const { id } = useParams();

  useEffect(() => {
    if (id)
      fetch(API_URL(`adds/${id}`))
        .then((res) => res.json())
        .then((data) => setAdd(data.response));
  }, [id]);

  // if (id) {
  //   document.body.style.overflow = "hidden";
  // }

  return (
    <Section>
      <ModalWrapper>
        <AddModal className={id ? "modal-active" : "modal-inactive"}>
          <CloseButton onClick={() => navigate("/adds")}>
            <img src={closeIcon} alt="close window" />
          </CloseButton>
          <p>
            {add.typeOf} {add.category}
          </p>

          <img src={IconSwitcher(add.category)} />

          <p>{moment(add.createdAt).fromNow()}</p>

          <h2>{add.title}</h2>
          <p>{add.user?.username}</p>
          <p>
            Contact:{" "}
            {accessToken ? add.user?.email : `Sign in to get contact details`}
          </p>

          <p>{add.description}</p>
          <p>
            Budget is {add.budget}
            {add.currency}
          </p>
        </AddModal>
      </ModalWrapper>
    </Section>
  );
};

export default SingleAddModal;
