"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = ({ type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/proxy/api/product-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...data, type, publishedAt: null } }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="inquiry py-80">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-5">
            <div className="section-title">
              <h3>Inquiry Now!</h3>
              <h2>Let&apos;s Connect!</h2>
              <p>
                To get more information of our products and services, enter your
                details below. Therefore, we can approach you.
              </p>
            </div>
          </div>
          <div className="col-md-12 col-lg-7">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-4">
                <div className="col-md-12 col-lg-6">
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
                      <span className="error text-danger">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
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
                      <span className="error text-danger">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
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
                      <span className="error text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-block">
                    <label>
                      mobile number
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      className="form-control"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message:
                            "Please enter a valid 10-digit Indian mobile number",
                        },
                      })}
                    />
                    {errors.mobileNumber && (
                      <span className="error text-danger">
                        {errors.mobileNumber.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-block">
                    <label>
                      message
                      <span className="text-danger"> *</span>
                    </label>
                    <textarea
                      placeholder="Write something here..."
                      className="form-control"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    ></textarea>
                    {errors.message && (
                      <span className="error text-danger">
                        {errors.message.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-5">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Request a Quote"}
                  </button>
                </div>
              </div>
            </form>
            {submitStatus === "success" && (
              <p className="success mt-3">
                Your inquiry has been submitted successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="error mt-3">An error occurred. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
