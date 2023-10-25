import "../styles/Form.css";
import { useForm, useController } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  name: string().min(3, { message: "Name is required" }),
  email: string().email(),
});

const Form = () => {
  const { register, control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { errors } = formState;

  const [success, setSuccess] = useState(false);

  const handleSave = (formValues) => {
    console.log(formValues);

    fetch("https://d21af321-6b82-426d-99e7-fbb4ac7aed40.mock.pstmn.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Finn",
        email: "hello@finn-steffens.de",
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        if (responseData.Success === "true") {
          setSuccess(true);
        }
      });
  };

  return (
    <div>
      <h1>Please Register Now</h1>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="fieldContainer">
          <p>Name</p>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className={errors.name ? "input inputError" : "input"}
          />
          <div className="alert">{errors.name?.message}</div>
        </div>

        <div className="fieldContainer">
          <p>Email Adress</p>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={errors.email ? "input inputError" : "input"}
          />
          <div className="alert">{errors.email?.message}</div>
        </div>

        <button
          className={errors ? "submitButton buttonError" : "submitButton"}
          type="submit"
        >
          Submit!
        </button>
      </form>
      <div className={success ? "modal hideModal" : "modal"}>
        The user has been successfully created!
      </div>
    </div>
  );
};

export default Form;
