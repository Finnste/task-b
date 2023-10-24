import React, { useState } from "react";
import "../styles/Field.css";

const Field = (props) => {
  const [inputError, setInputError] = useState(false);

  const checkInput = (e) => {
    let hasNumber = /\d/;
    if (hasNumber.test(e.target.value)) {
      console.log("Number!");
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  return (
    <div className="fieldContainer">
      <form>
        <label className="fieldTitle">{props.title}</label>
        <input
          onChange={checkInput}
          className={inputError ? "input error" : "input"}
          type="text"
          placeholder={props.title}
        />
        <label className={inputError ? "alertHidden alert" : "alertHidden"}>
          Wrong Format
        </label>
      </form>
    </div>
  );
};

export default Field;
