import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import post from "../../reducers/post";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../utils/constants";

const DeletePost = ({ myPostsId }) => {
  const [setDeleteAPost] = useState({});
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const options = {
          method: "DELETE",
          headers: {
            // Authorization: accessToken,
          },
        };
        fetch(API_URL(`posts/${myPostsId}/delete`), options).then(() => {
          dispatch(post.actions.deletePost(myPostsId));
        });

        swal("Poof! Your post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your post is safe!");
      }
    });
  };

  return (
    <Button
      sx={{ backgroundColor: "secondary.blue" }}
      variant="contained"
      onClick={onDeleteClick}
      startIcon={<DeleteIcon />}
    >
      Delete Post
    </Button>
  );
};

export default DeletePost;
