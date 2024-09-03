"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const EditCategory = () => {
    const { id } = useParams();  // Get the category ID from the URL params
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        category_name: '',
        category_description: '',
        image: null, // To store image file
        viewimage: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch the existing category data
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`/api/backend/product-category/action/${id}`);
                if (!response.ok) throw new Error('Failed to fetch category');
                const data = await response.json();
                setFormData({
                    category_name: data.category_name || '',
                    category_description: data.category_description || '',
                    viewimage: data.image || '' // Handle existing image URL if needed
                });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch category:', error);
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

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

        // Create FormData and append only the fields that have been provided
        const formDataToSubmit = new FormData();
        if (formData.category_name) {
            formDataToSubmit.append('category_name', formData.category_name);
        }
        if (formData.category_description) {
            formDataToSubmit.append('category_description', formData.category_description);
        }
        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        // Update the category
        try {
            const response = await fetch(`/api/backend/product-category/action/${id}`, {
                method: 'PUT',
                body: formDataToSubmit
            });
            if (response.ok) {
                // Show success message
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Category updated successfully!'
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
                console.error('Failed to update category');
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Failed to update category'
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
                    message: 'Failed to update category'
                }, {
                    type: 'danger',
                    delay: 2000,
                    z_index: 9999
                });
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="card-title mb-0">Edit Category</h4>
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
                            <label htmlFor="category_description" className="form-label">Category Description</label>
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
                            {formData.viewimage && typeof formData.viewimage === 'string' && (
                                <img
                                    src={formData.viewimage}
                                    alt="Current Category"
                                    style={{ width: '100px', marginTop: '10px' }}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">Update Category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
