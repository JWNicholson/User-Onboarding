import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import styled from 'styled-components';
import * as Yup from "yup";
import axios from "axios";


const UserForm = styled.div`
    background:papayawhip;
    display:flex;
    justify-content:center;
    color:darkslategray;
    width:25%;
    text-align:left;
    border-radius: 4px;
    margin-bottom:36px;
`;

const InputWrapper = styled.div`
        width:100%;
        height:auto;
        display:flex;
        flex-direction:column;
      justify-content: space-between;
      margin:10px auto;
`;

const InputLabel = styled.label`
    margin-left:0 12px;
`;

const SubmitButton = styled.button`
        color:white;
        margin:12px;
        border:none;
        background:orange;
        font-weight:bold;
        height:38px;
`;


const OnboardForm = ({ values, errors, touched, status }) => {
    
    // local state that holds successful form submission data
    const [users, setUsers] = useState([]);
  
    // listens for status changes to update users state
    useEffect(() => {
      console.log("status changed", status);
      
      status && setUsers(users => [...users, status]);
    }, [status]);
    return (
      <UserForm>
       
        <Form>
         <InputWrapper>
          <InputLabel>
            Name: 
            </InputLabel>
          
            <Field
              id="name" 
              type="text"
              name="name"
              placeholder="name"
            />
           
            {touched.name && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          
          </InputWrapper>

          <InputWrapper>
          <InputLabel>
            Email
            </InputLabel>
            <Field id="email" 
            type="email" 
            name="email" 
            placeholder="Email" />
            {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
              )}
         
         </InputWrapper>

          <InputWrapper>
        {touched.password && errors.password && <p>{errors.password}</p>}
         <InputLabel>
         Password 
         </InputLabel>
         <Field type="password" 
         name="password" 
         placeholder="Password" />
         
       </InputWrapper>

          <InputWrapper>
          <InputLabel>
            Terms of Service
            </InputLabel>
            <Field
              type="checkbox"
              name="tos"
              checked={values.tos}
            />
            <span className="checkmark" />
          
          </InputWrapper>

          <SubmitButton type="submit">Submit!</SubmitButton>

          
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
        
      </UserForm>
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

    handleSubmit(values, { setStatus,setError, resetForm  }) {
      //console.log("submitting", values);

      if (values.email === "boo@hoho.com") {
        setError({ email: "That email is already taken" });
      } else {
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
    }
  })(OnboardForm);
  export default FormikOnboardForm;