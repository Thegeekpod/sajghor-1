"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCategory = () => {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        category_name: '',
        category_description: '',
        image: null // To store image file
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to handle file uploads
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('category_name', formData.category_name);
        formDataToSubmit.append('category_description', formData.category_description);
        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        // Submit form data to the API
        try {
            const response = await fetch('/api/backend/product-category/add-product', {
                method: 'POST',
                body: formDataToSubmit
            });
            if (response.ok) {
                // Show success message
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Category added successfully!'
                    }, {
                        type: 'success',
                        delay: 2000,
                        z_index: 9999
                    });
                }

                // Redirect after a short delay to ensure notification is visible
                setTimeout(() => {
                    router.push('/admin/dashboard/category');
                }, 2000);
            } else {
                console.error('Failed to submit category');
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Failed to add category'
                    }, {
                        type: 'danger',
                        delay: 2000,
                        z_index: 9999
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (window.$.notify) {
                window.$.notify({
                    message: 'Failed to add category'
                }, {
                    type: 'danger',
                    delay: 2000,
                    z_index: 9999
                });
            }
        }
    };

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="card-title mb-0">Add New Category</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="category_name" className="form-label">Category Name</label>
                            <input
                                type="text"
                                id="category_name"
                                name="category_name"
                                className="form-control"
                                value={formData.category_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_description" className="form-label">Description</label>
                            <textarea
                                id="category_description"
                                name="category_description"
                                className="form-control"
                                value={formData.category_description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
