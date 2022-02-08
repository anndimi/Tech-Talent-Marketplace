import { badgeUnstyledClasses } from "@mui/base";
import { menuItemClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import { Fab } from "@mui/material";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

const LikedAdd = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);
  const likedArray = useSelector((store) => store.user.likedAdd?.likedAdd);
  console.log(likedArray);
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
            console.log(data.response);
            dispatch(user.actions.setLikedAdd(data.response));
          } else {
            dispatch(user.actions.setLikedAdd(null));
            dispatch(user.actions.setError(data.response));
          }
        });
    } else {
      return alert("You already liked that one, biatch!");
    }
  };

  return (
    <>
      <Fab
        sx={{
          marginRight: 5,
          "&:hover": { color: "#F8C53A" },
          "&:clicked": { color: "#F8C53A" },
        }}
        onClick={onAddLike}
      >
        <BookmarkRoundedIcon />
      </Fab>

      {/* <button onClick={onAddLike}>Like</button> */}
    </>
  );
};

export default LikedAdd;
