import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteUser = ({ id }) => {
  const navigate = useNavigate();
  const [setDeleteUser] = useState({});

  const onDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
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
        fetch(API_URL(`userprofile/${id}/delete`), options).then(() =>
          setDeleteUser({ status: "Delete successful" })
        );

        swal("Poof! Your profile has been deleted!", {
          icon: "success",
        });
        navigate("/signup");
      } else {
        swal("Your profile is safe!");
      }
    });
  };

  return (
    <Button
      sx={{
        fontFamily: "secondary.fontFamily",
        letterSpacing: 1.3,
        backgroundColor: "secondary.blue",
        margin: 1,
      }}
      variant="contained"
      onClick={onDeleteClick}
      startIcon={<DeleteIcon />}
    >
      Delete user
    </Button>
  );
};

export default DeleteUser;
