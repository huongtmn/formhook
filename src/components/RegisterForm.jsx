import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const [values, setValues] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = event.target.checkValidity();

    if (!isValid) {
      return;
    }

    if (userState.selectedUser) {
      dispatch({
        type: "UPDATE_USER",
        payload: values,
      });
    } else {
      dispatch({
        type: "ADD_USER",
        payload: values,
      });
    }

    resetForm();
  };

  const handleBlur = (event) => {
    let message = "";
    const { name, validity, title, minLength, maxLength, value } = event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    console.log(patternMismatch);

    if (valueMissing) {
      message = `${title} is required.`;
    }

    if (tooShort || tooLong) {
      message = `${title} have length from ${minLength} to ${maxLength} chars.`;
    }

    if (patternMismatch) {
      message = `${title} is invalid pattern`;
    }

    setErrors({
      ...errors,
      [name]: message,
    });
  };

  useEffect(() => {
    setValues(userState.selectedUser);
  }, [userState.selectedUser]);

  const resetForm = () => {
    setValues("");
    setErrors("");
    userState.selectedUser = null;
  };

  const {
    username = "",
    email = "",
    phoneNumber = "",
    password = "",
    type = "",
    fullName = "",
  } = values || {};

  return (
    <div className="w-75 mx-auto mt-5">
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold">
          REGISTER FORM
        </div>
        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    value={username}
                    title="User name"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.username}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    value={fullName}
                    title="Full name"
                    required
                    minLength={5}
                    maxLength={10}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="fullName"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.fullName}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={password}
                    title="Password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.password}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={phoneNumber}
                    title="Phone number"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.phoneNumber}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    title="Email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{errors.email}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={type}
                    title="Type"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    className="form-control"
                  >
                    <option value="">Please select...</option>
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <span className="text-danger">{errors.type}</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button
                disabled={!formRef.current?.checkValidity() || values==""}
                className="btn btn-warning mr-2"
              >
                SAVE
              </button>
              <button type="button" onClick={resetForm} className="btn btn-outline-dark">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
