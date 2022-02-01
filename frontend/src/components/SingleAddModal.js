import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { StyledButton } from "./Buttons/StyledButtons";
import closeIcon from "../assets/close.png";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import IconSwitcher from "./IconSwitcher";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  // const [isModalActive, setModalActive] = useState(false);
  const [add, setAdd] = useState({});
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  // const toggleModal = () => {
  //   setModalActive(!isModalActive);
  // };

  const { id } = useParams();

  useEffect(() => {
    if (id)
      fetch(API_URL(`adds/${id}`))
        .then((res) => res.json())
        .then((data) => setAdd(data.response));
  }, [id]);

  if (id) {
    document.body.style.overflow = "hidden";
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "secondary.main",
          position: "fixed",
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: 500,
            zIndex: 2,
            height: "70%",
            position: "fixed",
            top: "20%",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              paddingTop: 1,
              paddingBottom: 4,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontFamily: "primary.fontFamily", fontSize: 20 }}
              >
                {add.typeOf} {add.category}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "secondary.fontFamily",
                  fontSize: 15,
                  fontStyle: "italic",
                  paddingTop: 0,
                }}
              >
                {moment(add.createdAt).fromNow()}
              </Typography>
            </Box>
            <Button
              sx={{ alignSelf: "flex-start" }}
              onClick={() => navigate("/adds")}
            >
              <img
                src={closeIcon}
                alt="close window"
                style={{ height: 35, width: 35 }}
              />
            </Button>
          </Box>
          <CardContent
            sx={{ overflowY: "auto", wordBreak: "break-word", height: "100%" }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <img
                style={{ width: 70, height: 70 }}
                src={IconSwitcher(add.category)}
              />
            </Box>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 24,
                fontFamily: "primary.fontFamily",
                fontWeight: 600,
                marginTop: 2,
                wordBreak: "break-word",
              }}
            >
              {add.title}
            </Typography>

            <Typography>{add.description}</Typography>
            <Typography>
              Budget is {add.budget}
              {add.currency}
            </Typography>
            <Typography>{add.user?.username}</Typography>
            <Typography>
              Contact:{" "}
              {accessToken ? add.user?.email : `Sign in to get contact details`}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    return null;
  }
};

export default SingleAddModal;
