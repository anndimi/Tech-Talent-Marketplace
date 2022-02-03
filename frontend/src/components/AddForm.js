import React, { useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import add from "../reducers/add";
import { API_URL } from "../utils/constants";
import { StyledButton } from "./elements/StyledButtons";
import { CloseButton } from "./elements/StyledButtons";
import styled from "styled-components";
import closeIcon from "../assets/icons/close.png";
import { useNavigate } from "react-router-dom";
import {ModalWrapper, ModalCard, ModalHeader} from "./elements/Modal"
import { Typography, TextField, Box,InputLabel, MenuItem, FormControl, Select, Button, Input } from "@mui/material";

const Section = styled.section`
  width: 100%;
  &.section-blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }
`;

const SectionOverlay = styled.div`
  /* width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); */
`;



const AddModal = styled.div`
  &.modal-active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 0 0 10px 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 50px;
    align-items: center;
    position: absolute;
    top: 18%;
    background: #212427;
    color: #ffff;
    width: 50%;
    height: 80%;
    border-radius: 15px;

    overflow-y: scroll;
    label {
      font-weight: 600;
    }
  }
  &.modal-inactive {
    display: none;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 60%;
  }
`;

const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
  input,
  select {
    height: 30px;
  }
  textarea {
    resize: none;
    height: 100px;
    padding-top: 10px;
  }
  select,
  input,
  textarea {
    font-family: "Spartan", sans-serif;
    font-weight: 500;
    padding-left: 10px;
    border: 2px solid #212427;
    border-radius: 5px;
  }
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const AddForm = ({ isModalActive, onClose, toggleModal }) => {
  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const [typeOf, setTypeOf] = useState("Join");
  const [info, setInfo] = useState({
    // typeOf: "",
    title: "",
    description: "",
    budget: "",
    currency: "",
    category: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = () => {
    window.location.reload(true);
    // event.preventDefault();

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
    fetch(API_URL(`adds/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "this is data");
        batch(() => {
          dispatch(add.actions.setAddId(data.response._id));
          dispatch(add.actions.setTypeOf(data.response.typeOf));
          dispatch(add.actions.setTitle(data.response.title));
          dispatch(add.actions.setDescription(data.response.description));
          dispatch(add.actions.setBudget(data.response.budget));
          dispatch(add.actions.setCurrency(data.response.currency));
          dispatch(add.actions.setUser(data.response.user));
          dispatch(add.actions.setCategory(data.response.category));
          dispatch(add.actions.setError(null));
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(add.actions.setError(error.response));
      });

    setInfo({
      title: "",
      description: "",
      budget: "",
      currency: "",
      category: "",
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
        <SectionOverlay>
          <ModalWrapper>
            <ModalCard sx={{overflowY: "auto"}}
              className={isModalActive ? "modal-active" : "modal-inactive"}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader sx={{display:"flex", alignItems:"center",justifyContent:"space-between" ,bgcolor: "secondary.main", padding: 1.5 }}>
                <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Create add
              </Typography>
              <Button sx={{ alignSelf: "flex-start" }}
                onClick={() => {
                  toggleModal();
                  navigate("");
                }}
              >
                <img src={closeIcon} alt="close window" style={{height:35, width:35}}/>
              </Button>
</ModalHeader>
              <form onSubmit={onFormSubmit}>
              <Box sx={{display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  margin: 4,}}>

                <RadioButtonsContainer>
                  <label htmlFor="Looking for">Looking for </label>
                  <input
                    id="Looking for"
                    type="radio"
                    value="Looking for"
                    name="typeOf"
                    checked={typeOf === "Looking for"}
                    onChange={(e) => setTypeOf(e.target.value)}
                  />

                  <label htmlFor="Join">Join as</label>
                  <input
                    id="Join as"
                    type="radio"
                    value="Join as"
                    name="typeOf"
                    required="required"
                    checked={typeOf === "Join as"}
                    onChange={(e) => setTypeOf(e.target.value)}
                  />
                </RadioButtonsContainer>
              
                <Select variant="filled" labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" lable="Category"  value={info.category}
                    required
                    onChange={(e) =>
                      setInfo({ ...info, category: e.target.value })
                    }> 
                    
                <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Backend">Backend</MenuItem>
          <MenuItem value="Graphics and Design">Graphics and Design</MenuItem>
          <MenuItem value="Fullstack">Fullstack</MenuItem>
          <MenuItem value="App Developer">App Developer</MenuItem>
          <MenuItem value="Chatbots">Chatbots</MenuItem>
          <MenuItem value="Project Lead">Project Lead</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
          <MenuItem value="Legal Consulting">Legal Consulting</MenuItem>
          <MenuItem value="Financial Consulting">Financial Consulting</MenuItem>
          <MenuItem value="Analytics">Analytics</MenuItem>
          <MenuItem value="Game Developer">Game Developer</MenuItem>
                </Select>

                <TextField id="filled-basic"
                  label="Title"
                  variant="filled" placeholder="A cathing title.."
                  value={info.title}
                  required
                  onChange={(e) =>
                    setInfo({ ...info, title: e.target.value })
                  }></TextField>
                
                <TextField id="filled-basic"
                  label="Description"
                  variant="filled"    value={info.description}
                  placeholder="Describe the opportunity.."
                  autoComplete="off"
                  rows={3}
                  multiline
                  required
                  onChange={(e) =>
                    setInfo({ ...info, description: e.target.value })
                  }> </TextField>



            <TextField id="filled-basic"
                  label="Budget"
                  variant="filled"     required type="number"
                  min="0"
                  value={info.budget}
                  onChange={(e) =>
                    setInfo({ ...info, budget: e.target.value })
                  }></TextField>

<Select variant="filled" labelId="demo-simple-select-standard-label" d="demo-simple-select-standard" label="Currency"   value={info.currency}
                    required
                    onChange={(e) =>
                      setInfo({ ...info, currency: e.target.value })
                    }>
    <MenuItem value="SEK">SEK</MenuItem>
    <MenuItem value="EUR">EUR</MenuItem>
    <MenuItem value="USD">USD</MenuItem>
    <MenuItem value="NOK">NOK</MenuItem>
    <MenuItem value="GBP">GBP</MenuItem>
    <MenuItem value="DKK">DKK</MenuItem>
    <MenuItem value="CNY">CNY</MenuItem>
                    </Select>

                

                <Button variant="contained" type="submit">Submit</Button>
                </Box>
              </form>
            </ModalCard>
          </ModalWrapper>
        </SectionOverlay>
      </Section>
    </>
  );
};
export default AddForm;
