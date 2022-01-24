import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

import user from "../../reducers/user";

export const StyledButton = styled.button`
  border-radius: 20px;
  width: 110px;
  height: 40px;
  padding: 0;
  border: solid 2px #289d8e;
  background-color: #fff;
  color: #289d8e;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  &:hover {
    background-color: #289d8e;
    color: #fff;
  }
`;

export const CloseButton = styled.button`
  background: none;
  margin-right: 20px;
  margin-top: 20px;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  align-self: end;
  img {
    width: 30px;
    height: 30px;
  }
`;

const StyledSignOutButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  padding: 10px;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const SignOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignOutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/signup");
  };

  return (
    <StyledSignOutButton onClick={onSignOutClick}>Sign out</StyledSignOutButton>
  );
};

// export const SignInButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSignInClick = () => {
//     navigate("/signup");
//   };

//   return (
//     <StyledSignOutButton onClick={onSignOutClick}>Sign out</StyledSignOutButton>
//   );
// };

// export const CloseButton = () => {
//   return (
//     <CloseButton>
//       {/* <FontAwesomeIcon icon={faTimes} size="3x" color="#212427" /> */}
//     </CloseButton>
//   );
// };
