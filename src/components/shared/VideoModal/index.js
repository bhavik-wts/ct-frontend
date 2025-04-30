"use client";
import React from "react"; // Added useEffect import
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { Modal } from "react-bootstrap"; // Import Bootstrap Modal

const index = ({ videoUrl, handleCloseModal, isModalOpen }) => {
  return (
    <>
      <Modal
        show={isModalOpen}
        onHide={handleCloseModal}
        centered
        className="modal-xl"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <video controls style={{ width: "100%" }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default index;
