import React, { useEffect, useState } from "react";
// import { useNavigate, generatePath, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { API_URL } from "../utils/constants";
import add from "../reducers/add";

// export const AddFilter = () => {
//   // const [filter, setFilter] = useState("");
//   // const filterAdds = useSelector((store) => store.add.items.filter(filter));
//   const dispatch = useDispatch();

//   // const onFilterSubmit = (filter) => {
//   //   dispatch(add.actions.filterCategory(filter));
//   // };

//   return (
//     <>
//       <p>This is where we filter our adds</p>
//       <label>Filter</label>
//       <select value={filter} onChange={() => onFilterSubmit(item.category)}>
//         <option hidden>Category..</option>
//         <option value="Frontend">Frontend</option>
//         <option value="Backend">Backend</option>
//         <option value="Graphics and Design">Graphics and Design</option>
//         <option value="Fullstack">Fullstack</option>
//         <option value="App Developer">App Developer</option>
//         <option value="Chatbots">Chatbots</option>
//         <option value="Project Lead">Project Lead</option>
//         <option value="QA">QA</option>
//         <option value="Legal Consulting">Legal Consulting</option>
//         <option value="Financial Consulting">Financial Consulting</option>
//         <option value="Analytics">Analytics</option>
//         <option value="Game Developer">Game Developer</option>
//       </select>
//       <label>Sort</label>
//       <select>
//         <option hidden>Type..</option>
//         <option value="Looking for">Looking for</option>
//         <option value="Join as">Join as</option>
//         <option value="Ascending">Oldest to newest</option>
//         <option value="Descending">Oldest to newest</option>
//       </select>
//     </>
//   );
// };
