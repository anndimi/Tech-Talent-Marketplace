import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import add from "../reducers/add";
import { API_URL } from "../utils/constants";
import { StyledButton } from "./Buttons/StyledButtons";
import styled from "styled-components";
import closeIcon from "../assets/close.png";

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

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AddModal = styled.div`
  &.modal-active {
    padding: 0 0 10px 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 50px;
    align-items: center;
    position: absolute;
    top: 20%;
    background: #212427;
    color: #ffffff;
    width: 50%;
    height: 90%;
    border-radius: 15px;
    overflow-y: scroll;
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

const CloseButton = styled.button`
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
    border: none;
    border-radius: 5px;
  }
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const AddForm = () => {
  const [isModalActive, setModalActive] = useState(false);
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

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...info,
        typeOf,
      }),
    };
    console.log(info, "info");
    fetch(API_URL("adds"), options)
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
          dispatch(add.actions.setCategory(data.response.category));
          dispatch(add.actions.setError(null));
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(add.actions.setError(error.response));
      });
  };

  return (
    <Section>
      <SectionOverlay>
        <StyledButton onClick={toggleModal}>Create add</StyledButton>
        <ModalWrapper>
          <AddModal
            className={isModalActive ? "modal-active" : "modal-inactive"}
          >
            <CloseButton onClick={toggleModal}>
              <img src={closeIcon} alt="close window" />
            </CloseButton>

            <form onSubmit={onFormSubmit}>
              <RadioButtonsContainer>
                <label htmlFor="Looking for">Looking for </label>
                <input
                  id="Looking for"
                  type="radio"
                  value="Looking for"
                  checked={typeOf === "Looking for"}
                  onChange={(e) => setTypeOf(e.target.value)}
                />

                <label htmlFor="Join">Join as</label>
                <input
                  id="Join as"
                  type="radio"
                  value="Join as"
                  checked={typeOf === "Join as"}
                  onChange={(e) => setTypeOf(e.target.value)}
                />
              </RadioButtonsContainer>
              <LabelInput>
                <label htmlFor="category">Category </label>
                <select
                  value={info.category}
                  onChange={(e) =>
                    setInfo({ ...info, category: e.target.value })
                  }
                >
                  <option hidden>Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Graphics and Design">
                    Graphics and Design
                  </option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="App Developer">App Developer</option>
                  <option value="Chatbots">Chatbots</option>
                  <option value="Project Lead">Project Lead</option>
                  <option value="QA">QA</option>
                  <option value="Legal Consulting">Legal Consulting</option>
                  <option value="Financial Consulting">
                    Financial Consulting
                  </option>
                  <option value="Analytics">Analytics</option>
                  <option value="Game Developer">Game Developer</option>
                </select>
              </LabelInput>
              <LabelInput>
                <label htmlFor="title">Title </label>
                <input
                  id="title"
                  type="text"
                  placeholder="A cathing title.."
                  value={info.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                ></input>
              </LabelInput>

              <LabelInput>
                <label htmlFor="description">Description </label>
                <textarea
                  id="title"
                  type="text"
                  value={info.description}
                  placeholder="Describe the opportunity.."
                  autoComplete="off"
                  onChange={(e) =>
                    setInfo({ ...info, description: e.target.value })
                  }
                />
              </LabelInput>

              <LabelInput>
                <label htmlFor="password">Budget </label>
                <input
                  id="budget"
                  type="number"
                  min="0"
                  value={info.budget}
                  onChange={(e) => setInfo({ ...info, budget: e.target.value })}
                ></input>
              </LabelInput>

              <LabelInput>
                <label htmlFor="currency">Currency</label>
                <select
                  value={info.currency}
                  onChange={(e) =>
                    setInfo({ ...info, currency: e.target.value })
                  }
                >
                  <option hidden>Choose</option>
                  <option value="SEK">SEK</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="NOK">NOK</option>
                  <option value="GBP">GBP</option>
                  <option value="DKK">DKK</option>
                  <option value="CNY">CNY</option>
                </select>
              </LabelInput>

              <StyledButton type="submit">Submit</StyledButton>
            </form>
          </AddModal>
        </ModalWrapper>
      </SectionOverlay>
    </Section>
  );
};
export default AddForm;
