import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import IconSwitcher from "./IconSwitcher";
import moment from "moment";
import { CardContent, Divider } from "@mui/material";

let humanize = require("humanize-number");

const SavedPosts = () => {
  const [myLikedPosts, setMyLikedPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(API_URL(`userprofile/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setMyLikedPosts(data.response.likedPost);
      });
  }, [id, myLikedPosts._id]);

  return (
    <>
      <Divider variant="middle">
        <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
          Saved posts
        </Typography>
      </Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
          paddingTop: 2.5,
          paddingBottom: 4,
        }}
      >
        {myLikedPosts.map((post) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 300,
              height: 350,
              padding: 2,
              marginBottom: 2,
              fontFamily: "secondary.fontFamily",
            }}
            key={post.description}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  sx={{ padding: 0, fontFamily: "secondary.fontFamily" }}
                >
                  {post.typeOf} {post.category}
                </Typography>
                <Typography
                  sx={{
                    padding: 0,
                    fontFamily: "secondary.fontFamily",
                    fontSize: 14,
                    fontStyle: "italic",
                  }}
                >
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </Box>
              <img
                src={IconSwitcher(post.category)}
                style={{ width: 38, height: 38 }}
                alt="icon"
              />
            </Box>

            <CardContent sx={{ overflowY: "auto", paddingLeft: 0 }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  padding: 0,
                  fontWeight: 600,
                  marginBottom: 1,
                }}
              >
                {post.title}
              </Typography>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontFamily: "secondary.fontFamily",
                  padding: 0,
                  marginBottom: 2,
                }}
              >
                {post.description}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "secondary.fontFamily",
                  padding: 0,
                }}
              >
                Budget: {humanize(post.budget)} {post.currency}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default SavedPosts;
