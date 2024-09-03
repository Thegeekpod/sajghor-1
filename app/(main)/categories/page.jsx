'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles
import Link from 'next/link';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/frontend/product-category');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section id="innerPG-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="banner-item col-lg-12">
              <img src={"/images/inn-banner.jpg"} className="img-fluid" alt="Banner" />
            </div>
          </div>
        </div>
      </section>
      <section id="category-list" className='mt-4'>
        <div className="container">
          <div className="row">
            {loading ? (
              // Skeleton loader while data is loading
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <Skeleton height={200} />
                      <Skeleton count={1} />
                    </div>
                  </div>
                </div>
              ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.slug} className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <Link href={`/${category.slug}`}>
                      
                        <img
                          src={category.image}
                          alt={category.category_name}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{category.category_name}</h5>
                        </div>
                     
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No categories found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
