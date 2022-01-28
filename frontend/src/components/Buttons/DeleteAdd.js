import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import add from "../../reducers/add";

const DeleteAdd = ({ myAddsId }) => {
  const [deleteAnAdd, setDeleteAnAdd] = useState({});
  // const { id } = use.params;
  // const id = useSelector((store) => store.add._id);
  //   const id = myAddsId;
  console.log(myAddsId);
  const onDeleteClick = () => {
    const options = {
      method: "DELETE",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL(`adds/${myAddsId}/delete`), options).then(() =>
      setDeleteAnAdd({ status: "Delete successful" })
    );
  };

  return <button onClick={onDeleteClick}>Delete Add</button>;
};

export default DeleteAdd;
