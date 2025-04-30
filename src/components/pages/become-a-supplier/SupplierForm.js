// SupplierForm.js
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { useMutation } from "@apollo/client";
import { SUBMIT_SUPPLIER_INQUIRY } from "@/graphql/mutations/supplier-inquiry"; // Adjust import path as necessary
import client from "@/lib/apollo-client";

const SupplierForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [responseMessage, setResponseMessage] = useState(""); // Add state for response message
  const [isError, setIsError] = useState(false); // Add state for error indication

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Initialize mutation
  const [submitInquiry] = useMutation(SUBMIT_SUPPLIER_INQUIRY, {
    client,
    onCompleted: (data) => {
      // console.log("Response:", data);
      setResponseMessage("Form submitted successfully!"); // Set success message
      setIsError(false);
      reset();
    },
    onError: (error) => {
      console.error("Submission error:", error);
      setResponseMessage("Failed to submit form. Please try again."); // Set error message
      setIsError(true);
    },
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  const onSubmit = (data) => {
    // Prepare input for mutation
    const inputData = {
      companyName: data.companyName,
      profileDescription: data.profileDescription,
      email: data.email,
      mobileNumber: data.mobileNumber,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      salesContact: data.salesContact,
      website: data.website,
      productsYouProvide: data.productsYouProvide,
      remarks: data.remarks,
    };

    submitInquiry({ variables: { input: inputData }, publishedAt: null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      {responseMessage && ( // Conditionally render response message
        <div
          className={`alert ${isError ? "alert-danger" : "alert-success"}`}
          role="alert"
        >
          {responseMessage}
        </div>
      )}
      <div className="col-md-6">
        <label className="form-label">Company Name*</label>
        <input
          type="text"
          className="form-control"
          {...register("companyName", { required: "Company Name is required" })}
        />
        {errors.companyName && (
          <p className="text-danger">{errors.companyName.message}</p>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Profile Description</label>
        <input
          type="text"
          className="form-control"
          {...register("profileDescription")}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email*</label>
        <input
          type="email"
          className="form-control"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          className="form-control"
          {...register("mobileNumber")}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Address Line 1</label>
        <input
          type="text"
          className="form-control"
          {...register("addressLine1")}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Address Line 2</label>
        <input
          type="text"
          className="form-control"
          {...register("addressLine2")}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Country*</label>
        <select
          className="form-select"
          {...register("country", { required: "Country is required" })}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-danger">{errors.country.message}</p>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">State*</label>
        <select
          className="form-select"
          {...register("state", { required: "State is required" })}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && <p className="text-danger">{errors.state.message}</p>}
      </div>

      <div className="col-md-4">
        <label className="form-label">City*</label>
        <select
          className="form-select"
          {...register("city", { required: "City is required" })}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-danger">{errors.city.message}</p>}
      </div>

      <div className="col-md-4">
        <label className="form-label">Zip Code</label>
        <input type="text" className="form-control" {...register("zipcode")} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Sales Contact</label>
        <input
          type="text"
          className="form-control"
          {...register("salesContact")}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Website</label>
        <input type="text" className="form-control" {...register("website")} />
      </div>

      <div className="col-md-12">
        <label className="form-label">Products You Provide</label>
        <input
          type="text"
          className="form-control"
          {...register("productsYouProvide")}
        />
      </div>

      <div className="col-md-12">
        <label className="form-label">Remarks</label>
        <textarea className="form-control" {...register("remarks")}></textarea>
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SupplierForm;
