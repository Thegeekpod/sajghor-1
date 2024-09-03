"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles for skeleton loader
import { useRouter } from 'next/navigation';

const PopulerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for tracking data fetching
  const router = useRouter();
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/frontend/product-category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="popular-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Most Popular Categories</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 mt-2">
            <div className="row">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="cat-box hover14 column">
                        <div className="bbBox box-one hover14 column">
                          <Skeleton height={100} />
                          <Skeleton height={20} width={150} style={{ marginTop: '10px' }} />
                        </div>
                      </div>
                    </div>
                  ))
                : categories.slice(0, 6).map((category, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="cat-box hover14 column"  onClick={()=>{router.push(`/${category.slug}`)}}>
                        <div className="bbBox box-one hover14 column">
                          <div>
                            <div>
                              <img src={category.image} className="img-fluid" alt={category.slug} />
                            </div>
                            <h5>
                              <Link href={`/${category.slug}`}>{category.category_name}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="col-lg-4">
            
              {/* Display the middle image with the first category image */}
              {loading
                ? <Skeleton height={500} />
                : 
                <div className="bbBox2 mid-box hover15 column" onClick={()=>{router.push('/categories')}}>
                  <div>
                  <div>
                   <img src="images/cat-img.jpg" className="img-fluid" alt="..." />
                  </div>
                </div>
                </div>
                 }
       
          </div>
          <div className="col-lg-4 mt-2">
            <div className="row">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="cat-box hover14 column">
                        <div className="bbBox box-one hover14 column">
                          <Skeleton height={100} />
                          <Skeleton height={20} width={150} style={{ marginTop: '10px' }} />
                        </div>
                      </div>
                    </div>
                  ))
                : categories.slice(6, 12).map((category, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="cat-box hover14 column" onClick={()=>{router.push(`/${category.slug}`)}}>
                        <div className="bbBox box-one hover14 column">
                          <div>
                            <div>
                              <img src={category.image} className="img-fluid" alt={category.slug} />
                            </div>
                            <h5>
                              <Link href={`/${category.slug}`}>{category.category_name}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopulerCategories;
