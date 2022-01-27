import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

export const MyAdds = () => {
  const [myAdds, setMyAdds] = useState([]);
  const [deleteAnAdd, setDeleteAnAdd] = useState({});
  const { id } = useParams();
  console.log(id, "id");

  const deleteAdd = () => {
    const options = {
      method: "DELETE",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL(`adds/${id}/delete`), options).then(() =>
      setDeleteAnAdd({ status: "Delete successful" })
    );
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL(`userprofile/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setMyAdds(data.response.add);
      });
  }, []);

  return (
    <>
      <h1>My adds</h1>

      {myAdds.map((add) => (
        <div key={add.description}>
          <p>
            {add.typeOf} {add.category}
          </p>
          <p>{add.title}</p>
          <p>{add.description}</p>
          <p>{add.createdAt}</p>
          <p>
            {add.budget} {add.currency}
          </p>
          {/* <button onClick={() => deleteAdd(id)}>Delete this add</button> */}
          {/* <button onClick={() => editAdd()}>Edit this add</button> */}
        </div>
      ))}
    </>
  );
};
