//Material UI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const ModalWrapper = styled(Box)({
  height: "100%",
  width: "100%",
  backgroundColor: "#51637099",
  position: "fixed",
  top: 0,
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

export const ModalCard = styled(Card)({
  width: 500,
  zIndex: 11,
  height: "615px",
  position: "fixed",
  // top: "20%",
});

export const ModalHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  color: "white",
  padding: 10,
});
