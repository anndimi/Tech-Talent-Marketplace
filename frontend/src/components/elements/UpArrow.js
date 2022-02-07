import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import upArrow from "../../assets/icons/up-arrow.png";

export const UpArrow = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
      <Link href="#">
        <img src={upArrow} />
      </Link>
    </Box>
  );
};
