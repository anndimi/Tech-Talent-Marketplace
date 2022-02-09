import { Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import { Fab } from "@mui/material";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { Box } from "@mui/system";

const LikedAdd = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);
  const likedArray = useSelector((store) => store.user.likedAdd?.likedAdd);
  const { id } = useParams();

  const onAddLike = () => {
    const options = {
      method: "POST",
    };

    if (!likedArray?.includes(id)) {
      fetch(API_URL(`adds/${id}/like/${userId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setLikedAdd(data.response));
          } else {
            dispatch(user.actions.setLikedAdd(null));
            dispatch(user.actions.setError(data.response));
          }
        });
    } else {
      fetch(API_URL(`adds/${id}/unlike/${userId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setLikedAdd(data.response));
          } else {
            dispatch(user.actions.setLikedAdd(null));
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
                padding: 0,
                marginTop: 0.5,
              }}
            >
              Add saved
            </Typography>
          </Divider>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Fab
              sx={{
                "&:hover": { color: "#F8C53A" },
                color: "#F8C53A",
              }}
              onClick={onAddLike}
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
                Save add
              </Typography>
            </Divider>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Fab
                sx={{
                  "&:hover": { color: "#F8C53A" },
                  color: "#4C4C4C",
                }}
                onClick={onAddLike}
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

export default LikedAdd;
