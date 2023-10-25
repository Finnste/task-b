import "../styles/Form.css";
import { useForm, useController } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

const schema = z.object({
  name: string().min(3, { message: "A name is required" }),
  email: string().email({ message: "Add a valid email address" }),
  address: string().min(5, { message: "Add a valid address" }),
  phone: string(),
  dob: z.coerce.date()
});

const Form = () => {
  const { register, control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { errors } = formState;

  // variable to control if the submission and server response is successfull
  const [success, setSuccess] = useState(false);
    // variable to control success message modal 
  const [modalText, setModalText] = useState("");

  // POST data to postman mock server
  const handleSave = (formValues) => {
    console.log(formValues);
    fetch("https://d21af321-6b82-426d-99e7-fbb4ac7aed40.mock.pstmn.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        address: formValues.address,
        phone: formValues.phone,
        dob: formValues.dob,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        if (responseData.Success === "true") {
          setSuccess(true);
          setModalText("The user has been successfully added!");
          reset();
        } else {
          setSuccess(true);
          setModalText("The user was not added!");
        }
      });
  };

  return (
    <div className="wrapper">
      <h1>Please Register Now</h1>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="fieldContainer">
          <p>Name</p>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
          />
          <div className="alert">{errors.name?.message}</div>
        </div>

        <div className="fieldContainer">
          <p>Email Address</p>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          <div className="alert">{errors.email?.message}</div>
        </div>

        <div className="fieldContainer">
          <p>Address</p>
          <input
            type="text"
            {...register("address")}
            placeholder="Address"
          />
          <div className="alert">{errors.address?.message}</div>
        </div>

        <div className="fieldContainer">
          <p>Phone Number</p>
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone Number"
          />
          <div className="alert">{errors.phone?.message}</div>
        </div>

        <div className="fieldContainer">
          <p>Date of Birth</p>
          <input
            type="date"
            {...register("dob")}
            required
          />
          <div className="alert">{errors.dob?.message}</div>
        </div>

        <button className="submitButton" type="submit">
          Submit!
        </button>
      </form>
      <div
        className={!success ? "modal hideModal" : "modal"}
        onClick={() => setSuccess(false)}
      >
        {modalText}
      </div>
    </div>
  );
};

export default Form;
