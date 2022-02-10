import { Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import user from "../../reducers/user";
import { API_URL } from "../../utils/constants";
import { Fab } from "@mui/material";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { Box } from "@mui/system";

const LikedPost = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);
  const likedArray = useSelector((store) => store.user.likedPost?.likedPost);

  const { id } = useParams();

  const onPostLike = () => {
    const options = {
      method: "POST",
    };

    if (!likedArray?.includes(id)) {
      fetch(API_URL(`posts/${id}/like/${userId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setLikedPost(data.response));
          } else {
            dispatch(user.actions.setLikedPost(null));
            dispatch(user.actions.setError(data.response));
          }
        });
    } else {
      fetch(API_URL(`posts/${id}/unlike/${userId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setLikedPost(data.response));
          } else {
            dispatch(user.actions.setLikedPost(null));
            dispatch(user.actions.setError(data.response));
          }
        });
    }
  };

  return (
    <>
      {likedArray?.includes(id) ? (
        <Box>
          <Divider
            variant="middle"
            sx={{ marginLeft: 7, marginRight: 7, marginBottom: 2 }}
          >
            <Typography
              sx={{
                fontFamily: "secondary.fontFamily",
                padding: 2,
              }}
            >
              Post saved
            </Typography>
          </Divider>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Fab
              sx={{
                "&:hover": { color: "#F8C53A" },
                color: "#F8C53A",
              }}
              onClick={onPostLike}
            >
              <BookmarkRoundedIcon />
            </Fab>
          </Box>
        </Box>
      ) : (
        <>
          <Box>
            <Divider
              variant="middle"
              sx={{ marginLeft: 7, marginRight: 7, marginBottom: 2 }}
            >
              <Typography
                sx={{
                  fontFamily: "secondary.fontFamily",
                  padding: 0,
                  marginTop: 0.5,
                }}
              >
                Save post
              </Typography>
            </Divider>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Fab
                sx={{
                  "&:hover": { color: "#F8C53A" },
                  color: "#4C4C4C",
                }}
                onClick={onPostLike}
              >
                <BookmarkRoundedIcon />
              </Fab>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default LikedPost;
