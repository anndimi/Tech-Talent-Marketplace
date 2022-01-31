import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import DeleteAdd from "./Buttons/DeleteAdd";

export const MyAdds = () => {
  const [myAdds, setMyAdds] = useState([]);
  const { id } = useParams();

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
        console.log(data.response.add);
        console.log(myAdds._id);
      });
  }, [id, myAdds._id]);

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
          <p>id: {add._id}</p>
          <p>
            {add.budget} {add.currency}
          </p>
          <DeleteAdd myAddsId={add._id} />
          {/* <button onClick={() => editAdd()}>Edit this add</button> */}
        </div>
      ))}
    </>
  );
};
