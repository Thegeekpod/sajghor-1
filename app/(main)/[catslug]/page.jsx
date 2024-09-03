'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { catslug } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/api/frontend/product-category/${catslug}`);
        setCategory(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          router.push("/404");
        } else {
          setError("Failed to load category data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (catslug) {
      fetchCategoryData();
    }
  }, [catslug]);

  if (loading) {
    return (
      <>
        <section id="innerPG-banner">
          <div className="container-fluid">
            <div className="row">
              <div className="banner-item col-lg-12">
                <img src="/images/inn-banner.jpg" className="img-fluid" alt="Banner" />
              </div>
            </div>
          </div>
        </section>
        <section id="inn-pro-section">
          <div className="container">
            <div className="row mb-4 justify-content-center">
              <div className="col-lg-10 text-center">
                <Skeleton height={40} width={300} />
                <Skeleton count={3} height={30} />
              </div>
            </div>
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="col-lg-3 mb-4">
                  <div className="product-box text-center">
                    <div className="product-box-img hover01">
                      <div>
                        <figure>
                          <Skeleton height={200} />
                        </figure>
                      </div>
                    </div>
                    <div className="product-box-ctn">
                      <Skeleton height={20} width={150} />
                      <Skeleton count={1} height={15} />
                      <ul className="pro-cart-list" style={{ display: 'grid' }}>
                        <li>
                          <Skeleton height={20} width={100} />
                        </li>
                        <li>
                          <Skeleton height={30} width={100} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <section id="innerPG-banner">
          <div className="container-fluid">
            <div className="row">
              <div className="banner-item col-lg-12">
                <img src="/images/inn-banner.jpg" className="img-fluid" alt="Banner" />
              </div>
            </div>
          </div>
        </section>
        <section id="error-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center">
                <h2>Error</h2>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!category) {
    router.push("/404");
    return null;
  }

  return (
    <>
      <section id="innerPG-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="banner-item col-lg-12">
              <img src="/images/inn-banner.jpg" className="img-fluid" alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      <section id="inn-pro-section">
        <div className="container">
          <div className="row mb-4 justify-content-center">
            <div className="col-lg-10 text-center">
              <h2>{category.category_name}</h2>
              <p>{category.category_description}</p>
            </div>
          </div>
          {category.products.length === 0 ? (
            <div className="row mb-4 justify-content-center">
              <div className="col-lg-10 text-center">
                <p>No products available in this category.</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {category.products.map((product) => (
                <div className="col-lg-3 mb-4" key={product.id}>
                  <div className="product-box text-center">
                    <div className="product-box-img hover01">
                      <div>
                        <figure>
                          <img src={product.image} className="mr-3" alt={product.name} />
                        </figure>
                      </div>
                    </div>
                    <div className="product-box-ctn">
                      <h4>{product.name}</h4>
                      <p className="star">
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                      </p>
                      <ul className="pro-cart-list" style={{ display: 'grid' }}>
                        <li>
                          <p className="pro-price">₹ {product.price}</p>
                        </li>
                        <li>
                          <Link href={`/${category.slug}/${product.slug}`} className="cart-btn">
                            Buy Now
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
