import Field from "./Field";
import "../styles/Form.css"

const Form = () => {
    return ( 
        <div className="formContainer">
            <h1>Please Register Now</h1>
            <Field title="Name"/>
            <Field title="Email Address"/>
            <Field title="Phone Number"/>
            <Field title="Address"/>
            <Field title="Date of Birth"/>
        </div>
     );
}
 
export default Form;