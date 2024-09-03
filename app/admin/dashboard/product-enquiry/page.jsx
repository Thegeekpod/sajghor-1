"use client";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Basic styles for skeleton loaders
const skeletonStyle = {
  width: '100%',
  height: '20px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  marginBottom: '8px',
};

const ProductEnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch enquiries from the API
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('/api/backend/product-enquiry/');
        const data = await response.json();
        setEnquiries(data);
      } catch (error) {
        console.error('Failed to fetch enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/backend/product-enquiry/action/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
          Swal.fire(
            'Deleted!',
            'Enquiry has been deleted.',
            'success'
          );
        } else {
          console.error('Failed to delete enquiry:', await response.text());
          Swal.fire(
            'Error!',
            'Failed to delete enquiry.',
            'error'
          );
        }
      } catch (error) {
        console.error('Failed to delete enquiry:', error);
        Swal.fire(
          'Error!',
          'Failed to delete enquiry.',
          'error'
        );
      }
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry =>
    enquiry.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  return (
    <div className="container-fluid my-4">
      <div className="card shadow-sm">
        <div className="card-header text-white">
          <h4 className="card-title mb-0">Product Enquiries</h4>
        </div>
        <div className="card-body p-0">
          <div className="p-3">
            <input
              type="text"
              placeholder="Search enquiries..."
              className="form-control mb-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table table-striped table-hover mb-4">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(itemsPerPage)].map((_, index) => (
                  <tr key={index}>
                    <td><div style={skeletonStyle}></div></td>
                    <td><div style={skeletonStyle}></div></td>
                    <td><div style={skeletonStyle}></div></td>
                    <td><div style={skeletonStyle}></div></td>
                    <td><div style={skeletonStyle}></div></td>
                    <td><div style={skeletonStyle}></div></td>
                  </tr>
                ))
              ) : (
                paginatedEnquiries.map((enquiry, index) => (
                  <tr key={enquiry.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{enquiry.productName}</td>
                    <td>{enquiry.fullName}</td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.phone}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2 m-2"
                        onClick={() => handleViewDetails(enquiry)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm m-2"
                        onClick={() => handleDelete(enquiry.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <nav>
            <ul className="pagination justify-content-center mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="custom-modal-close" onClick={handleCloseModal}>&times;</button>
            {selectedEnquiry ? (
              <div>
                <h5>Enquiry Details</h5>
                <p><strong>Product Name:</strong> {selectedEnquiry.productName}</p>
                <p><strong>Full Name:</strong> {selectedEnquiry.fullName}</p>
                <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                <p><strong>Message:</strong> {selectedEnquiry.message}</p>
              </div>
            ) : (
              <p>No details available.</p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .custom-modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          position: relative;
          max-width: 500px;
          width: 100%;
        }

        .custom-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProductEnquiryTable;
