import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import add from "../../reducers/add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../utils/constants";

const DeleteAdd = ({ myAddsId }) => {
  const [setDeleteAnAdd] = useState({});
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this add!",
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
        fetch(API_URL(`adds/${myAddsId}/delete`), options).then(() => {
          dispatch(add.actions.deleteAdd(myAddsId));
        });

        swal("Poof! Your add has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your add is safe!");
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
      Delete Add
    </Button>
  );
};

export default DeleteAdd;
