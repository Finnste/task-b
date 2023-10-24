import React, { useState } from "react";
import "../styles/Field.css";

const Field = (props) => {
  const [inputError, setInputError] = useState(false);
  const [inputType, setinputType] = useState("");

  const checkInput = (e) => {
    let hasNumber = /\d/;
    let hasLetter = /[a-zA-Z]/;
    const i = e.target.value;

    // check if name is valid
    if (props.title === "Name") {
      if (hasNumber.test(i)) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
    // check if email address is valid
    else if (props.title === "Email Address") {
      if (e.target.validity.valid) {
        setInputError(false);
      } else {
        setInputError(true);
      }
    } else if (props.title === "Phone Number") {
      if (hasLetter.test(i)) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
  };

  return (
    <div className="fieldContainer">
      <form>
        <label className="fieldTitle">{props.title}</label>
        <input
          onChange={checkInput}
          className={inputError ? "input error" : "input"}
          type={props.inputType}
          placeholder={props.title}
          required
        />
      </form>
      <label className={inputError ? "alertHidden alert" : "alertHidden"}>
        Please enter a valid {props.title}
      </label>
    </div>
  );
};

export default Field;
