import React, { useEffect, useState } from "react";
import closeIcon from "../assets/icons/close.png";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import IconSwitcher from "./IconSwitcher";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";
import {
  Divider,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import userIcon from "../assets/icons/user-icon.png";
import mailIcon from "../assets/icons/mail-icon.png";
import LikedAdd from "./LikedAdd";

let humanize = require("humanize-number");

const SingleAddModal = () => {
  const [add, setAdd] = useState({});
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

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
      <ModalWrapper>
        <ModalCard
          sx={{
            overflowY: "auto",
          }}
        >
          <ModalHeader sx={{ bgcolor: "secondary.main", padding: 1.5 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {add.typeOf} {add.category}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "secondary.fontFamily",
                  fontSize: 15,
                  fontStyle: "italic",
                  paddingTop: 0,
                  fontWeight: 600,
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
          </ModalHeader>
          <CardContent
            sx={{
              wordBreak: "break-word",
            }}
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

            <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
              {add.description}
            </Typography>
            <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
              Budget is {add.budget}
              {add.currency}
            </Typography>
            <Divider variant="middle">
              <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                Contact Details{" "}
              </Typography>
            </Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                paddingBottom: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={userIcon} style={{ height: 20, width: 20 }} />
                <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                  {add.user?.username}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={mailIcon} style={{ height: 20, width: 20 }} />
                <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                  {accessToken ? (
                    <a
                      href={`mailto:${add.user?.email}`}
                      style={{ pointer: "cursor" }}
                    >
                      {add.user?.email}
                    </a>
                  ) : (
                    `Sign in to get contact details`
                  )}
                </Typography>

                <LikedAdd />
              </Box>
            </Box>
          </CardContent>
        </ModalCard>
      </ModalWrapper>
    );
  } else {
    return null;
  }
};

export default SingleAddModal;
