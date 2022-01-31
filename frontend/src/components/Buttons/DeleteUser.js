import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ id }) => {
  const navigate = useNavigate();
  const [deleteUser, setDeleteUser] = useState({});
  // const { id } = use.params;
  // const id = useSelector((store) => store.add._id);
  //   const id = myAddsId;

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

  return <button onClick={onDeleteClick}>Delete this user</button>;
};

export default DeleteUser;
