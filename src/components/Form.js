import Field from "./Field";
import "../styles/Form.css"

const Form = () => {
    return ( 
        <div className="formContainer">
            <h1>Please Register Now</h1>
            <Field title="Name" inputType="text"/>
            <Field title="Email Address" inputType="email"/>
            <Field title="Phone Number" inputType="tel"/>
            <Field title="Address" inputType="text"/>
            <Field title="Date of Birth" inputType="date"/>
            <button className="submitButton">Submit!</button>
        </div>
     );
}
 
export default Form;