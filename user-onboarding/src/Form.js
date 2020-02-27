import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched }) {
  return (
    <Form>
        <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <button>Submit!</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({name, email, password, tos}) {
    return {
      name: name || "", 
      email: email || "",
      password: password || "",
      tos: tos || false,
     
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
    .min(3, "Name must be at least 3 letters")
    .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "eatthis@hoho.com") {
      setErrors({ email: "That email is not available" });
    } else {
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log(res); // Data was created successfully 
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data 
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;