"use client";
import React, { useEffect, useState } from "react";
import { AwesomeCaptcha, captcha } from "react-awesome-captcha";
import { useForm } from "react-hook-form";

import { Country, State, City } from "country-state-city";

import "./inquiry.css";
import { fetchData } from "@/lib/graphql-operations";
import { GET_TRACTOR_LISTING_PAGE } from "@/graphql/queries/get-tractor-lising-page";
import { useSearchParams } from "next/navigation";

import useNotification from "@/hooks/useNotification";

const InquiryForm = () => {
  const [activeTab, setActiveTab] = useState("Domestic");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [userInteractedWithCaptcha, setUserInteractedWithCaptcha] =
    useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [tractors, setTractors] = useState([]);

  const { triggerNotification } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  console.log(tab);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab); // Update active tab based on query parameter
    }
  }, [tab]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
    setStates(State.getStatesOfCountry("IN"));
  }, []);

  useEffect(() => {
    fetchData(GET_TRACTOR_LISTING_PAGE).then((data) => {
      const tractorCategories = data.tractorCategorywiseData.data;
      let allTractors = [];

      for (let category of tractorCategories) {
        let tractors = category.attributes.tractors.data;

        for (let tractor of tractors) {
          allTractors.push(tractor.attributes.name);
        }
      }
      setTractors(allTractors);
    });
  }, []);

  const handleProductSelection = (e) => {
    e.target.classList.toggle("selected");
  };

  const handleCaptchaValidation = (isValid) => {
    console.log("captcha", isValid);
    setIsCaptchaValid(isValid);
    setUserInteractedWithCaptcha(true);
  };

  const handleTabChange = (tab) => {
    reset();
    setSubmitStatus("");
    setActiveTab(tab);
  };

  const handleInquirySubmit = async (data) => {
    const selectedProductOptions = document.getElementsByClassName("selected");
    let selectedProductsString = "";

    for (let option of selectedProductOptions) {
      selectedProductsString += option.innerHTML + ", ";
    }

    selectedProductsString = selectedProductsString.slice(0, -2);

    data.type = activeTab;
    data.selectProducts = selectedProductsString;

    if (!userInteractedWithCaptcha) {
      triggerNotification("Please enter the Captcha!", "error");
      return;
    }

    if (!isCaptchaValid) {
      triggerNotification("Captcha is not valid!", "error");
      return;
    }

    try {
      const response = await fetch(`/api/proxy/api/inquiries`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`Network Response was not ok: ${response.status}`);
      }

      const productOptions = document.getElementsByTagName("span");
      for (let option of productOptions) {
        option.classList.remove("selected");
      }

      triggerNotification("Success!", "success");
      setSubmitStatus("success");
      reset();
      setCaptchaKey((prevKey) => prevKey + 1);
      setIsCaptchaValid(false); // Reset captcha validation status
    } catch (error) {
      console.error("Submission Error:", error);
      triggerNotification("Error!", "error");
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <section className="inquiry-form py-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h3>Fill the Form</h3>
                <h2>Fill up The Below Mentioned Details for Inquiry</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "Domestic" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("Domestic")}
                    id="home-tab"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected={activeTab === "Domestic"}
                  >
                    Domestic Inquiry
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "International" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("International")}
                    id="profile-tab"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected={activeTab === "International"}
                  >
                    International Inquiry
                  </button>
                </li>
              </ul>
              <hr />
              <div className="tab-content" id="myTabContent">
                <form onSubmit={handleSubmit(handleInquirySubmit)}>
                  <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                      <div className="form-block">
                        <label>
                          First Name
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="text-danger">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-block">
                        <label>
                          Last Name
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          {...register("lastName", {
                            required: "Last Name is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <p className="text-danger">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-block">
                        <label>
                          Business Name
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          {...register("businessName", {
                            required: "Business Name is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter business name"
                        />
                        {errors.businessName && (
                          <p className="text-danger">
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="form-block">
                        <label>
                          Email
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            validate: {
                              pattern: (v) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                  v
                                ) || "Email address must be a valid address",
                            },
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="form-block">
                        <label>
                          Mobile Number
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          {...register("mobileNumber", {
                            required: "Mobile Number is required",
                            validate: {
                              length: (v) =>
                                v.length == 10 ||
                                "Please enter a valid 10-digit mobile number",
                              pattern: (v) =>
                                /^\d+$/.test(v) || "must be digits only",
                            },
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter mobile number"
                        />
                        {errors.mobileNumber && (
                          <p className="text-danger">
                            {errors.mobileNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {activeTab == "International" ? (
                      <>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>
                              Address Line 1
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              {...register("addressLine1", {
                                required: "Address Line 1 is required",
                              })}
                              type="text"
                              className="form-control"
                              placeholder="Enter address line 1"
                            />
                            {errors.addressLine1 && (
                              <p className="text-danger">
                                {errors.addressLine1.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>
                              Address Line 2
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              {...register("addressLine2", {
                                required: "Address Line 2 is required",
                              })}
                              type="text"
                              className="form-control"
                              placeholder="Enter address line 2"
                            />
                            {errors.addressLine2 && (
                              <p className="text-danger">
                                {errors.addressLine2.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>
                              Zip Code
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              {...register("zipCode", {
                                required: "Zip Code is required",
                              })}
                              type="text"
                              className="form-control"
                              placeholder="Enter Zip Code"
                            />
                            {errors.zipCode && (
                              <p className="text-danger">
                                {errors.zipCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>
                              Country
                              <span className="text-danger"> *</span>
                            </label>
                            <select
                              {...register("country", {
                                required: "Country is required",
                              })}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected value={""}>
                                Select Country
                              </option>
                              {countries.map((country, index) => (
                                <option key={index} value={country.isoCode}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            {errors.country && (
                              <p className="text-danger">
                                {errors.country.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>State</label>
                            <select
                              {...register("state")}
                              className="form-select"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setDistricts(
                                  City.getCitiesOfState("IN", e.target.value)
                                );
                              }}
                            >
                              <option selected value={""}>
                                Select State
                              </option>
                              {states.map((state, index) => (
                                <option key={index} value={state.isoCode}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="form-block">
                            <label>District</label>
                            <select
                              {...register("district")}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected value={""}>
                                Select District
                              </option>
                              {districts.map((district, index) => (
                                <option key={index} value={district.name}>
                                  {district.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-md-12">
                      <div className="form-block">
                        <label>Select Products</label>
                        <div className="product-wrapper">
                          {tractors.map((tractor, index) => (
                            <span key={index} onClick={handleProductSelection}>
                              {tractor}
                            </span>
                          ))}
                          <span onClick={handleProductSelection}>
                            Implements
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-block">
                        <label>Message</label>
                        <textarea
                          {...register("message")}
                          placeholder="Write something here..."
                          className="form-control h-auto"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-8 col-lg-4">
                      <div className="form-block">
                        <AwesomeCaptcha
                          key={captchaKey}
                          onValidate={handleCaptchaValidation}
                          className="captcha-block"
                        />
                      </div>
                    </div>
                    <hr className="mb-0" />
                    <div className="col-md-12">
                      <div className="text-center">
                        <button type="submit">send now</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquiryForm;
