"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/backend/product-category');
                const data = await response.json();
                setCategories(data);
                setLoading(false); // Data loaded
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setLoading(false); // Data loaded with error
            }
        };

        fetchCategories();
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
                const response = await fetch(`/api/backend/product-category/action/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Remove the deleted category from the state
                    setCategories(categories.filter(category => category.id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Category has been deleted.',
                        'success'
                    );
                } else {
                    console.error('Failed to delete category:', await response.text());
                    Swal.fire(
                        'Error!',
                        'Failed to delete category.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Failed to delete category:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete category.',
                    'error'
                );
            }
        }
    };

    // Filtered and paginated categories
    const filteredCategories = categories.filter(category =>
        category.category_name.toLowerCase().includes(filter.toLowerCase()) ||
        category.slug.toLowerCase().includes(filter.toLowerCase())
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">All Categories</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="Search Categories..."
                                className="form-control w-100"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link href="/admin/dashboard/category/create" className="btn btn-primary me-2">
                                Add Category
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-4">
                                <thead className="bg-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Category Name</th>
                                        <th>Slug</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(itemsPerPage)].map((_, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="skeleton" style={{ width: '50px', height: '20px' }}></div>
                                            </td>
                                            <td>
                                                <div className="skeleton" style={{ width: '50px', height: '50px' }}></div>
                                            </td>
                                            <td>
                                                <div className="skeleton" style={{ width: '150px', height: '20px' }}></div>
                                            </td>
                                            <td>
                                                <div className="skeleton" style={{ width: '100px', height: '20px' }}></div>
                                            </td>
                                            <td>
                                                <div className="skeleton" style={{ width: '100px', height: '20px' }}></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <table className="table table-striped table-hover mb-4">
                            <thead className="bg-light">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Category Name</th>
                                    <th>Slug</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCategories.map((category, index) => (
                                    <tr key={category.id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>
                                            <img
                                                src={category.image}
                                                alt={category.category_name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td>{category.category_name}</td>
                                        <td>{category.slug}</td>
                                        <td>
                                            <Link
                                                className="btn btn-outline-primary btn-sm me-2 m-1"
                                                href={`/admin/dashboard/category/edit/${category.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(category.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
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

export default CategoryTable;
