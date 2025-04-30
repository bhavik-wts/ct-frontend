"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { State, City } from "country-state-city";
import useNotification from "@/hooks/useNotification";

const InquiryForm = ({ formType }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { triggerNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const selectedState = watch("state");

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState("IN", selectedState);
      setCities(stateCities);
    }
  }, [selectedState]);

  const onSubmit = async (data) => {
    if (!data.agreement) {
      // Trigger toaster notification for unchecked agreement
      triggerNotification("You must agree to the terms to proceed.", "error");
      return; // Prevent form submission
    }
    setIsSubmitting(true);
    try {
      const endpoint =
        formType === "dealer"
          ? `/api/proxy/api/dealer-inquiries`
          : `/api/proxy/api/network-inquiries`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { ...data, type: formType, publishedAt: null },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      triggerNotification("Success!", "success");
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      triggerNotification("Error!", "error");

      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="dealer-application py-80">
      <div className="container">
        <div className="row g-5 align-items-center justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="dealer-image">
              {/* <img
                src="/images/tractor-avatar.png"
                alt="tractor"
                className="img-fluid"
              /> */}
            </div>
          </div>
          <div className="col-md-12 col-lg-7">
            <div className="section-title">
              <h3>Get in Touch!</h3>
              <h2>Submit Your Application</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3 g-md-4">
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      first name
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="form-control"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstName && (
                      <span className="text-danger">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      last name
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="form-control"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastName && (
                      <span className="text-danger">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      Mobile Number
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      className="form-control"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        validate: {
                          length: (v) =>
                            v.length == 10 ||
                            "Please enter a valid 10-digit mobile number",
                          pattern: (v) =>
                            /^\d+$/.test(v) || "must be digits only",
                        },
                      })}
                    />
                    {errors.mobileNumber && (
                      <span className="text-danger">
                        {errors.mobileNumber.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      email
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="form-control"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      State
                      <span className="text-danger"> *</span>
                    </label>
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
                    {errors.state && (
                      <span className="text-danger">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-block">
                    <label>
                      District
                      <span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      {...register("district", {
                        required: "District is required",
                      })}
                    >
                      <option value="">Select District</option>
                      {cities.map((district) => (
                        <option key={district.name} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="text-danger">
                        {errors.district.message}
                      </span>
                    )}
                  </div>
                </div>
                {formType === "dealer" ? (
                  <>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-block">
                        <label>
                          Interested For Location
                          <span className="text-danger"> *</span>
                        </label>
                        <select
                          className="form-select"
                          {...register("interestedForlocation", {
                            required: "Interested location is required",
                          })}
                        >
                          <option value="">Select</option>
                          <option value="Surat">Surat</option>
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Rajkot">Rajkot</option>
                        </select>
                        {errors.interestedForlocation && (
                          <span className="text-danger">
                            {errors.interestedForlocation.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-block">
                        <label>
                          Interested For Dealership
                          <span className="text-danger"> *</span>
                        </label>
                        <select
                          className="form-select"
                          {...register("interestedFordealership", {
                            required: "Interested dealership is required",
                          })}
                        >
                          <option value="">Location</option>
                          <option value="Lorem">Lorem</option>
                          <option value="Ipsum">Ipsum</option>
                          <option value="Dolore">Dolore</option>
                        </select>
                        {errors.interestedFordealership && (
                          <span className="text-danger">
                            {errors.interestedFordealership.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-block">
                        <label>
                          Current Business
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter current business"
                          className="form-control"
                          {...register("currentBusiness", {
                            required: "Current business is required",
                          })}
                        />
                        {errors.currentBusiness && (
                          <span className="text-danger">
                            {errors.currentBusiness.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-block">
                        <label>
                          Interested to Invest
                          <span className="text-danger"> *</span>
                        </label>
                        <select
                          className="form-select"
                          {...register("interestedToinvest", {
                            required: "Interested investment is required",
                          })}
                        >
                          <option value="">Location</option>
                          <option value="Lorem">Lorem</option>
                          <option value="Ipsum">Ipsum</option>
                          <option value="Dolore">Dolore</option>
                        </select>
                        {errors.interestedToinvest && (
                          <span className="text-danger">
                            {errors.interestedToinvest.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-block">
                        <label>
                          Message
                          <span className="text-danger"> *</span>
                        </label>
                        <textarea
                          placeholder="Write something here..."
                          className="form-control h-auto"
                          {...register("message", {
                            required: "Message is required",
                          })}
                        ></textarea>
                        {errors.message && (
                          <span className="text-danger">
                            {errors.message.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="col-md-12">
                  <label className="checkbox checkbox-outline-primary mb-0 mb-0">
                    <input type="checkbox" {...register("agreement")} />
                    <span>
                      I agree to receive any communication from Captain Tractors
                      in this regard.
                    </span>
                    <span className="checkmark"></span>
                  </label>
                  {errors.agreement && (
                    <span className="text-danger">
                      {errors.agreement.message}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Now"}
                  </button>
                </div>
              </div>
            </form>
            {/* {submitStatus === "success" && (
              <p className="success">Inquiry submitted successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="error">An error occurred. Please try again.</p>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
