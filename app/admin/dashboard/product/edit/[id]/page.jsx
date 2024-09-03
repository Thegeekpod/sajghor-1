"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const router = useRouter();
    const { id } = useParams(); // Get the product ID from the route parameters

    // State for form data, category list, and loading state
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        description: '',
        offer: '',
        price: '',
        status: 'ACTIVE',
        images: [],
        viewimage: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch category list and product details on component mount
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

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/backend/product/action/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.name,
                        category_id: data.category_id,
                        description: data.description,
                        offer: data.offer,
                        price: data.price,
                        status: data.status,
                        images: data.images || [], // Assuming data.images is an array of image objects
                        viewimage: data.image
                    });
                } else {
                    console.error('Failed to fetch product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchProductDetails();
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
        const newImages = Array.from(e.target.files).map((file) => ({
            id: Date.now(), // Generate a temporary ID for preview purposes
            url: URL.createObjectURL(file),
            file: file
        }));
        setFormData({
            ...formData,
            images: [...formData.images, ...newImages]
        });
    };

    // Handle delete image
    const handleDeleteImage = async (imageId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(`/api/backend/product/delete-productimg/${imageId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setFormData((prevData) => ({
                        ...prevData,
                        images: prevData.images.filter((img) => img.id !== imageId)
                    }));
                    Swal.fire(
                        'Deleted!',
                        'Your image has been deleted.',
                        'success'
                    );
                } else {
                    console.error('Failed to delete image');
                    Swal.fire(
                        'Failed!',
                        'Failed to delete image.',
                        'error'
                    );
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Failed!',
                'Failed to delete image.',
                'error'
            );
        }
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
        formData.images.forEach((image) => {
            if (image.file) {
                formDataToSubmit.append('images', image.file);
            }
        });

        // Submit form data to the API
        try {
            const response = await fetch(`/api/backend/product/action/${id}`, {
                method: 'PUT',
                body: formDataToSubmit
            });
            if (response.ok) {
                // Show success message
                if (window.$.notify) {
                    window.$.notify({
                        message: 'Product update successfully!'
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
                        message: 'Failed to update product'
                    }, {
                        type: 'danger',
                        delay: 2000,
                        z_index: 9999
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Failed!',
                'Failed to update product.',
                'error'
            );
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator while data is being fetched
    }

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="card-title mb-0">Edit Product</h4>
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
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        {formData.images.length > 0 && (
                            <div className="mb-3">
                                <h6>All Images:</h6>
                                <div className="row">
                                    {formData.images.map((image) => (
                                        <div key={image.id} className="col-3 mb-2 text-center">
                                            <img
                                                src={image.url || image.image_path}
                                                alt="Preview"
                                                className="img-fluid"
                                                style={{ maxHeight: '100px', objectFit: 'cover' }}
                                            />
                                            <br/>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm mt-2"
                                                onClick={() => handleDeleteImage(image.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
