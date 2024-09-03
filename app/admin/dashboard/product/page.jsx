"use client";
import Link from 'next/link';
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

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/backend/product/');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/backend/product/action/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Remove the deleted product from the state
                    setProducts(products.filter(product => product.id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    );
                } else {
                    console.error('Failed to delete product:', await response.text());
                    Swal.fire(
                        'Error!',
                        'Failed to delete product.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Failed to delete product:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete product.',
                    'error'
                );
            }
        }
    };

    // Filtered and paginated products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.category_name.toLowerCase().includes(filter.toLowerCase())
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">All Products</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="Search Products..."
                                className="form-control w-100"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link href="/admin/dashboard/product/create" className="btn btn-primary me-2">
                                Add Product
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-4">
                        <thead className="bg-light">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                // Skeleton loader while loading
                                [...Array(itemsPerPage)].map((_, index) => (
                                    <tr key={index}>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                        <td><div style={skeletonStyle}></div></td>
                                    </tr>
                                ))
                            ) : (
                                paginatedProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>₹ {product.price}</td>
                                        <td>{product.category.category_name}</td>
                                        <td>{product.status}</td>
                                        <td>
                                            <Link
                                                className="btn btn-outline-primary btn-sm me-2 m-1"
                                                href={`/${product.category.slug}/${product.slug}`}
                                            >
                                                View
                                            </Link>
                                            <Link
                                                className="btn btn-outline-primary btn-sm me-2 m-1"
                                                href={`/admin/dashboard/product/edit/${product.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(product.id)}
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
        </div>
    );
};

export default ProductTable;
