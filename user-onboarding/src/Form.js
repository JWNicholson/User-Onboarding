import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";



const OnboardForm = ({ values, errors, touched, status }) => {
    
    // local state that holds successful form submission data
    const [users, setUsers] = useState([]);
  
    // listens for status changes to update users state
    useEffect(() => {
      console.log("status changed", status);
      
      status && setUsers(users => [...users, status]);
    }, [status]);
    return (
      <div className="user-form">
       
        <Form>
         
         <div>
          <label htmlFor="name">
            Name
          
            <Field
              id="name" 
              type="text"
              name="name"
              placeholder="name"
            />
            {touched.name && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          </label>
          </div>

          <div>
          <label htmlFor="email">
            Email
            <Field id="email" 
            type="email" 
            name="email" 
            placeholder="Email" />
            {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
              )}
          </label>
         </div>

          <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
         <label htmlFor="password">
         Password:
         <Field type="password" 
         name="password" 
         placeholder="Password" />
         </label>
       </div>

          <div>
          <label className="checkbox-container">
            Terms of Service
            <Field
              type="checkbox"
              name="tos"
              checked={values.tos}
            />
            <span className="checkmark" />
          </label>
          </div>
          
          <button type="submit">Submit!</button>
        </Form>
        
        {/*map through data and show it*/}
        {users.map(user => {
          return (
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
              <li>Password: {user.password}</li>
            </ul>
          );
        })}
      </div>
    );
  };
  
  const FormikOnboardForm = withFormik({
    // props from <OnboardForm /> in app are in props param
    mapPropsToValues(props) {
      // set initial state of form to value from parent component OR the initial value (after || )
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        tos: props.tos || false
      };
    },
  
    // Declare shape and requirement of values object (form state )
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
  
    // passed through props to Form component in Formik

    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);
          // sends a status update through props in OnboardForm with value as res.data content
          setStatus(res.data);
  
          //clears form inputs, from FormikBag
          resetForm();
        })
        .catch(err => console.log(err.response));
    }
  })(OnboardForm);
  export default FormikOnboardForm;