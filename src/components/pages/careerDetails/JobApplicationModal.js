"use client";
import React, { useState } from "react"; // Remove useState import
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button
const JobApplicationModal = ({ show, handleClose }) => {
  // Accept props
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const formSubmit = async (submitData) => {
    try {
      const formData = new FormData();
      formData.append("files", selectedFile, selectedFile.name);

      const resumeUpload = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      async function streamToString(stream) {
        const chunks = [];

        for await (const chunk of stream) {
          chunks.push(Buffer.from(chunk));
        }

        return Buffer.concat(chunks).toString("utf-8");
      }

      const resumeResponse = JSON.parse(
        await streamToString(resumeUpload.body)
      );
      const fileId = resumeResponse[0].id;

      const { fullName, email, mobileNumber } = submitData;

      const data = {
        fullName,
        email,
        mobileNumber,
        uploadResume: fileId,
        publishedAt: null,
      };

      const response = await fetch(`/api/proxy/api/jobs`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      setSubmitStatus("success");
      reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static" // Ensure backdrop is set correctly
        keyboard={false} // Prevent closing with keyboard
        id="exampleModal"
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body className="job-modal">
          <img
            src="/images/close.svg"
            onClick={handleClose}
            alt="Description of the image"
            className="modal-close"
          />
          <h6>Apply now!</h6>
          <p className="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group">
              <label>
                full name
                <span className="text-danger">*</span>
              </label>
              <input
                {...register("fullName", {
                  required: "Full Name is required",
                  validate: {
                    minLength: (v) =>
                      v.length >= 6 || "must be atleast 6 characters long",
                    maxLength: (v) =>
                      v.length <= 50 || "must be atmost 50 characters long",
                  },
                })}
                type="text"
                placeholder="Enter full name"
                className="form-control"
              />
              {errors.fullName && (
                <p className="text-danger">{errors.fullName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                email
                <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    pattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                })}
                placeholder="Enter email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                mobile number
                <span className="text-danger">*</span>
              </label>
              <input
                type="phone"
                {...register("mobileNumber", {
                  required: "Mobile Number is required",
                  validate: {
                    length: (v) =>
                      v.length == 10 || "must be 10 characters long",
                    pattern: (v) => /^\d+$/.test(v) || "must be digits only",
                  },
                })}
                placeholder="Enter mobile number"
                className="form-control"
              />
              {errors.mobileNumber && (
                <p className="text-danger">{errors.mobileNumber.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                upload resume
                <span className="text-danger">*</span>
              </label>
              <div className="upload-input">
                <input
                  type="file"
                  {...register("resume", {
                    required: "Resume is required",
                    validate: {
                      fileType: (value) =>
                        (value &&
                          [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          ].includes(value[0]?.type)) ||
                        "Only .doc, .docx, or .pdf files are allowed",
                    },
                  })}
                  onChange={handleFileChange}
                  placeholder="Select"
                  className="form-control"
                />
                <span>
                  <img src="/images/upload-icon.svg" alt="upload" />
                </span>
              </div>
              <p style={{ fontSize: 14, marginTop: 3 }} className="text-muted">
                Allowed file types: .doc, .docx, .pdf
              </p>
              {errors.resume && (
                <p className="text-danger">{errors.resume.message}</p>
              )}
            </div>
            <div className="text-center">
              <button type="submit">apply now!</button>
            </div>
            <p>{submitStatus ? submitStatus : ""}</p>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobApplicationModal;
