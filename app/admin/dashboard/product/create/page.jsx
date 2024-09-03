"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
    const router = useRouter();

    // State for form data and category list
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        description: '',
        offer: '',
        status: 'ACTIVE',
        images: [], // Updated to handle multiple images
        price: '',
    });
    const [categories, setCategories] = useState([]);

    // Fetch category list on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/backend/product-category/');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data); // Assuming data is an array of category objects
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input changes for multiple files
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files) // Convert FileList to array
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to handle file uploads
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('category_id', formData.category_id);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('offer', formData.offer);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('status', formData.status);

        // Append each image file
        formData.images.forEach((image, index) => {
            formDataToSubmit.append('images', image);
        });

        // Submit form data to the API
        try {
            const response = await fetch('/api/backend/product/add-product', {
                method: 'POST',
                body: formDataToSubmit
            });
            if (response.ok) {
                // Show success message
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Product added successfully!'
                    }, {
                        type: 'success',
                        delay: 2000,
                        z_index: 9999
                    });
                }

                // Redirect after a short delay to ensure notification is visible
                setTimeout(() => {
                    router.push('/admin/dashboard/product');
                }, 2000);
            } else {
                console.error('Failed to submit product');
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Failed to add product'
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
                    message: 'Failed to add product'
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
                    <h4 className="card-title mb-0">Add New Product</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Product Price</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="form-control"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_id" className="form-label">Category</label>
                            <select
                                id="category_id"
                                name="category_id"
                                className="form-control"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="offer" className="form-label">Offer</label>
                            <select
                                id="offer"
                                name="offer"
                                className="form-control"
                                value={formData.offer}
                                onChange={handleChange}
                            >
                                <option value="">Select an offer</option>
                                <option value="no_offer">No Offer</option>
                                <option value="30_off">30% Off</option>
                                <option value="50_off">50% Off</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="form-control"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="DEACTIVE">Inactive</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Images</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                className="form-control"
                                accept="image/*"
                                multiple // Allow multiple files
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
