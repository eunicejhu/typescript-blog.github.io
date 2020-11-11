import React, { useState } from "react";
import PropTypes from "prop-types";

// MiniFormik is used centralize form state (values, errors, validations etc.) and handlers(handleChange, handleSubmit, handleBlur)
const MiniFormik = ({ initialValues, children, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };
  const handleSubmit = (e) => {
    let errorsMessages = {};
    e.preventDefault();
    // validate
    Object.entries(validate).forEach(([field, rules]) => {
      Object.entries(rules).forEach(([metric, details]) => {
        switch (metric) {
          case "required":
            if (details[0] === true && !values[field]) {
              errorsMessages = { ...errorsMessages, [field]: details[1] };
            }
            break;

          default:
            break;
        }
      });
    });
    setErrors(errorsMessages);
  };
  return (
    <>
      {children({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      })}
    </>
  );
};

export const FormFC = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstname">firstname</label>
        <input
          name="firstname"
          type="text"
          placeholder="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small>{errors?.firstname}</small>
      </div>
      <div>
        <label htmlFor="lastname">lastname</label>
        <input
          name="lastname"
          type="text"
          placeholder="lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small>{errors?.lastname}</small>
      </div>
      <div>
        <input type="submit" aria-label="submit" value="submit" />
      </div>
    </form>
  );
};

// implement Hoc with render props.
export const withMiniFormik = (Component) => (
  <MiniFormik
    validate={{ lastname: { required: [true, "Required lastname"] } }}
  >
    {(propsFromMiniFormik) => <Component {...propsFromMiniFormik} />}
  </MiniFormik>
);

FormFC.propTypes = {
  values: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  errors: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
};

FormFC.defaultProps = {
  values: { firstname: "", lastname: "" },
  errors: {
    firstname: "",
    lastname: "",
  },
  handleChange: () => {},
  handleBlur: () => {},
  handleSubmit: () => {},
};

MiniFormik.propTypes = {
  initialValues: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  validate: PropTypes.shape({
    require: PropTypes.arrayOf(),
  }),
  children: PropTypes.func,
};

MiniFormik.defaultProps = {
  initialValues: { firstname: "", lastname: "" },
  validate: {},
  children: () => {},
};

export default () => withMiniFormik(FormFC);
