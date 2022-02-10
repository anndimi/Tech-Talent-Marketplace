import React, { useEffect, useState } from "react";
import closeIcon from "../assets/icons/close.png";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import IconSwitcher from "./IconSwitcher";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";
import { Divider, Box, CardContent, Button, Typography } from "@mui/material";
import userIcon from "../assets/icons/user-icon.png";
import mailIcon from "../assets/icons/mail-icon.png";
import LikedPost from "./LikedPost";

const SinglePostModal = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  const { id } = useParams();

  useEffect(() => {
    if (id)
      fetch(API_URL(`posts/${id}`))
        .then((res) => res.json())
        .then((data) => setPost(data.response));
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
                {post.typeOf} {post.category}
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
                {moment(post.createdAt).fromNow()}
              </Typography>
            </Box>
            <Button
              sx={{ alignSelf: "flex-start" }}
              onClick={() => navigate("/posts")}
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
                src={IconSwitcher(post.category)}
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
              {post.title}
            </Typography>

            <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
              {post.description}
            </Typography>
            <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
              Budget is {post.budget}
              {post.currency}
            </Typography>
            <Divider variant="middle">
              <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                Contact Details
              </Typography>
            </Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                paddingBottom: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={userIcon} style={{ height: 20, width: 20 }} />
                <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                  {post.user?.username}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={mailIcon} style={{ height: 20, width: 20 }} />
                <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                  {accessToken ? (
                    <a
                      target="_blank"
                      href={`mailto:${post.user?.email}`}
                      style={{ pointer: "cursor" }}
                    >
                      {post.user?.email}
                    </a>
                  ) : (
                    `Sign in to get contact details`
                  )}
                </Typography>
              </Box>
            </Box>
            <Box>
              <LikedPost />
            </Box>
          </CardContent>
        </ModalCard>
      </ModalWrapper>
    );
  } else {
    return null;
  }
};

export default SinglePostModal;
