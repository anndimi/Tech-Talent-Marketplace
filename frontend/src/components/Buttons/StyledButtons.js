import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const StyledButton = styled.button`
  border-radius: 20px;
  padding: 8px;
  border: solid 3px #212427;
  background-color: #fff;
  color: #212427;
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  z-index: 2;
  &:hover {
    background-color: #212427;
    color: #fff;
  }
`;

export const StyledCloseButton = styled.button`
  background: none;
  margin-right: 20px;
  margin-top: 20px;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  align-self: end;
  /* img {
    width: 30px;
    height: 30px;
  } */
`;

export const CloseButton = () => {
  return (
    <CloseButton>
      <FontAwesomeIcon icon={faTimes} size="3x" color="#212427" />
    </CloseButton>
  );
};
