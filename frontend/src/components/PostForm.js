import React, { useState } from "react";
import post from "../reducers/post";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import styled from "styled-components";
import closeIcon from "../assets/icons/close.png";
import { ModalWrapper, ModalCard, ModalHeader } from "./elements/Modal";
import {
  Typography,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const Section = styled.section`
  width: 100%;
  &.section-blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }
`;

const PostForm = ({ isModalActive, onClose, toggleModal }) => {
  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const [typeOf, setTypeOf] = useState("Join");
  const [info, setInfo] = useState({
    title: "",
    description: "",
    budget: "",
    currency: "",
    category: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        ...info,
        typeOf,
      }),
    };
    console.log(info, "info");
    fetch(API_URL(`posts/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(post.actions.postItem(data.response));
          dispatch(post.actions.setError(null));
        });
      })
      .catch((error) => {
        dispatch(post.actions.setError(error.response));
      })
      .finally(() => {
        setInfo({
          title: "",
          description: "",
          budget: "",
          currency: "",
          category: "",
        });
      });
    onClose();
  };

  if (!isModalActive) {
    document.body.style.overflow = "unset";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <Section>
        <Box>
          <ModalWrapper>
            <ModalCard
              sx={{ overflowY: "auto" }}
              className={isModalActive ? "modal-active" : "modal-inactive"}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "secondary.main",
                  padding: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "primary.fontFamily",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Create post
                </Typography>
                <Button
                  sx={{ alignSelf: "flex-start" }}
                  onClick={() => {
                    toggleModal();
                    navigate("");
                  }}
                >
                  <img
                    src={closeIcon}
                    alt="close window"
                    style={{ height: 35, width: 35 }}
                  />
                </Button>
              </ModalHeader>
              <form onSubmit={onFormSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    margin: 4,
                  }}
                >
                  <FormControl>
                    <FormLabel
                      sx={{ display: "flex", justifyContent: "center" }}
                      id="demo-radio-buttons-group-label"
                    >
                      Type of
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Looking for"
                      name="radio-buttons-group"
                      row
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <FormControlLabel
                        value="Looking for"
                        control={<Radio />}
                        label="Looking for"
                        name="typeOf"
                        checked={typeOf === "Looking for"}
                        onChange={(e) => setTypeOf(e.target.value)}
                      />
                      <FormControlLabel
                        value="Join as"
                        control={<Radio />}
                        label="Join as"
                        name="typeOf"
                        checked={typeOf === "Join as"}
                        onChange={(e) => setTypeOf(e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl required>
                    <InputLabel id="demo-simple-select-filled-label">
                      Category
                    </InputLabel>
                    <Select
                      variant="filled"
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={info.category}
                      onChange={(e) =>
                        setInfo({ ...info, category: e.target.value })
                      }
                    >
                      <MenuItem value="Frontend">Frontend</MenuItem>
                      <MenuItem value="Backend">Backend</MenuItem>
                      <MenuItem value="Graphics and Design">
                        Graphics and Design
                      </MenuItem>
                      <MenuItem value="Fullstack">Fullstack</MenuItem>
                      <MenuItem value="App Developer">App Developer</MenuItem>
                      <MenuItem value="Chatbots">Chatbots</MenuItem>
                      <MenuItem value="Project Lead">Project Lead</MenuItem>
                      <MenuItem value="QA">QA</MenuItem>
                      <MenuItem value="Legal Consulting">
                        Legal Consulting
                      </MenuItem>
                      <MenuItem value="Financial Consulting">
                        Financial Consulting
                      </MenuItem>
                      <MenuItem value="Analytics">Analytics</MenuItem>
                      <MenuItem value="Game Developer">Game Developer</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="filled-basic"
                    label="Title"
                    variant="filled"
                    placeholder="A cathing title.."
                    value={info.title}
                    required
                    onChange={(e) =>
                      setInfo({ ...info, title: e.target.value })
                    }
                  ></TextField>

                  <TextField
                    id="filled-basic"
                    label="Description"
                    variant="filled"
                    value={info.description}
                    placeholder="Describe the opportunity.."
                    autoComplete="off"
                    rows={3}
                    multiline
                    required
                    onChange={(e) =>
                      setInfo({ ...info, description: e.target.value })
                    }
                  >
                    {" "}
                  </TextField>

                  <TextField
                    id="filled-basic"
                    label="Budget"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    value={info.budget}
                    onChange={(e) =>
                      setInfo({ ...info, budget: e.target.value })
                    }
                  ></TextField>

                  <FormControl>
                    <InputLabel id="demo-simple-select-filled-label">
                      Currency
                    </InputLabel>
                    <Select
                      variant="filled"
                      labelId="demo-simple-select-filled-label"
                      d="demo-simple-select-standard"
                      value={info.currency}
                      required
                      onChange={(e) =>
                        setInfo({ ...info, currency: e.target.value })
                      }
                    >
                      <MenuItem value="SEK">SEK</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="NOK">NOK</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="DKK">DKK</MenuItem>
                      <MenuItem value="CNY">CNY</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </ModalCard>
          </ModalWrapper>
        </Box>
      </Section>
    </>
  );
};
export default PostForm;
