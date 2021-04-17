import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import FormikField from "../FormikField";
import FormikSelect, { FormikSelectItem } from "../FormikSelect";

import "./App.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  position: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  position: ""
};

const positionItems: FormikSelectItem[] = [
  {
    label: "Front End",
    value: "front_end"
  },
  {
    label: "Back End",
    value: "back_end"
  },
  {
    label: "Dev Ops",
    value: "dev_ops"
  },
  {
    label: "QA",
    value: "qa"
  }
];

const emailAddresses = [
  'test@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com'
]

const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required!"),
  email: Yup.string()
    .lowercase() //convet all the text to lowercase befor sending
    .email("Must be a valid email")
    .notOneOf(emailAddresses , 'Email already taken!')
    .required("Required!"),
  password: Yup.string()
    .matches(lowercaseRegEx , 'one lowercase required') 
    .matches(uppercaseRegEx , 'one uppercase required') 
    .matches(numericRegEx , 'one number required') 
    .min(8, "Minimum 8 characters required!")
    .required("Required!"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'password must be the same')
    .required("Required!"),
  position: Yup.string().required("Required")
});

const App: React.FC = () => {
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <FormikField name="name" label="Name" required />
              <FormikField name="email" label="Email" required />
              <FormikField name="password" label="Password" required type="Password" />
              <FormikField name="passwordConfirm" label="Confirm password" required type="Password" />
              <FormikSelect
                name="position"
                items={positionItems}
                label="Position"
                required
              />

              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Primary
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
