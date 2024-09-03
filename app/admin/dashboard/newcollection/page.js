"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const NewCollectionTable = () => {
    const [collections, setCollections] = useState([]);
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState(''); // Add type filter state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch collections from the API
        const fetchCollections = async () => {
            try {
                const response = await fetch('/api/backend/newcollection/');
                const data = await response.json();
                setCollections(data);
            } catch (error) {
                console.error('Failed to fetch collections:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchCollections();
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
                const response = await fetch(`/api/backend/newcollection/action/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Remove the deleted collection from the state
                    setCollections(collections.filter(collection => collection.id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Collection has been deleted.',
                        'success'
                    );
                } else {
                    console.error('Failed to delete collection:', await response.text());
                    Swal.fire(
                        'Error!',
                        'Failed to delete collection.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Failed to delete collection:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete collection.',
                    'error'
                );
            }
        }
    };

    // Filtered and paginated collections
    const filteredCollections = collections.filter(collection => {
        const matchesType = typeFilter === '' || (typeFilter === 'youtube' && collection.youtube_link) || (typeFilter === 'facebook' && collection.facebook_link);
        const matchesFilter = (collection.youtube_link && collection.youtube_link.toLowerCase().includes(filter.toLowerCase())) ||
                              (collection.facebook_link && collection.facebook_link.toLowerCase().includes(filter.toLowerCase()));
        return matchesType && matchesFilter;
    });

    const paginatedCollections = filteredCollections.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">All New Collections</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="Search Collections..."
                                className="form-control w-100"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                className="form-control"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="youtube">YouTube</option>
                                <option value="facebook">Facebook</option>
                            </select>
                        </div>
                        <div>
                            <Link href="/admin/dashboard/newcollection/create" className="btn btn-primary me-2">
                                Add New Collection
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <table className="table table-striped table-hover mb-4">
                            <thead className="bg-light">
                                <tr>
                                    <th>#</th>
                                    <th>Video Link</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(itemsPerPage)].map((_, index) => (
                                    <tr key={index}>
                                        <td><div className="skeleton w-50 h-20"></div></td>
                                        <td><div className="skeleton w-150 h-50"></div></td>
                                        <td><div className="skeleton w-100 h-20"></div></td>
                                        <td><div className="skeleton w-100 h-20"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-striped table-hover mb-4">
                            <thead className="bg-light">
                                <tr>
                                    <th>#</th>
                                    <th>Video Link</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCollections.map((collection, index) => {
                                    const videoLink = collection.youtube_link || collection.facebook_link;
                                    const type = collection.youtube_link ? 'YouTube' : 'Facebook';

                                    return (
                                        <tr key={collection.id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>
                                                <iframe
                                                    width="200"
                                                    height="200"
                                                    src={type === 'YouTube' ? `${new URL(videoLink)}` : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoLink)}`}
                                                    title={`${type} video player`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </td>
                                            <td>
                                                <a href={videoLink} target="_blank" rel="noopener noreferrer">
                                                    View {type}
                                                </a>
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-primary btn-sm me-2 m-1"
                                                    href={`/admin/dashboard/newcollection/edit/${collection.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(collection.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
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

export default NewCollectionTable;
