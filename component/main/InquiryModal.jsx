import React, { useState } from "react";
import axios from "axios";


const InquiryModal = ({ productName, onClose, show }) => {
  const [formData, setFormData] = useState({
    product_name: productName,
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object
    const formDataObject = new FormData();
    formDataObject.append("product_name", formData.product_name);
    formDataObject.append("full_name", formData.full_name);
    formDataObject.append("email", formData.email);
    formDataObject.append("phone", formData.phone);
    formDataObject.append("message", formData.message);

    try {
      // Send FormData to the API
      await axios.post("/api/frontend/product-enquiry", formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data', // Tell the server to expect FormData
        },
      });
      setSuccess("Inquiry submitted successfully!");
      setFormData({
        product_name: productName,
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => {
        setSuccess(null);
        onClose(); // Close the modal after successful submission
      }, 2000); // Delay to allow user to see the success message
    } catch (err) {
      setError("Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null; // Don't render the modal if `show` is false

  return (
    <div className="modal" id="inquiryModal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Product Inquiry</h4>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
           
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="product_name"
                value={formData.product_name}
              />
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
