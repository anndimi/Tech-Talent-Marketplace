import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import DeletePost from "../elements/DeletePost";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import IconSwitcher from "../elements/IconSwitcher";
import moment from "moment";
import { CardContent, Divider } from "@mui/material";
import LikedPost from "../PostComponents/LikedPost";

const MyPosts = () => {
  const userId = useSelector((store) => store.user.userId);
  const [myPosts, setMyPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(API_URL(`userprofile/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data.response.post);
      });
  }, [id, myPosts._id]);

  return (
    <>
      <Divider variant="middle">
        <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
          Created posts
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
        {myPosts.map((post) => (
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
            key={post._id}
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
                Budget: {post.budget} {post.currency}
              </Typography>
            </CardContent>
            {id === userId && <DeletePost myPostsId={post._id} />}
            {id !== userId && <LikedPost postId={post._id} />}
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MyPosts;
