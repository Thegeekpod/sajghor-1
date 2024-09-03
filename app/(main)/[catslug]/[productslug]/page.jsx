'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles
import { useParams, useRouter } from "next/navigation";
import Loader from "@/component/main/Loader"; // Assuming you have a custom Loader component
import InquiryModal from "@/component/main/InquiryModal";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const { productslug } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/frontend/product/${productslug}`);
        setProduct(response.data);
        setCurrentImage(response.data?.image);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          router.push("/404");
        } else {
          setError("Failed to load product data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (productslug) {
      fetchProductData();
    }
  }, [productslug, router]);

  const changeImg = (imagePath) => {
    setCurrentImage(imagePath);
  };

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
            <div className="row">
              <div className="col-lg-4">
                <div className="imageholder s-pro-pic-box">
                  <Skeleton height={400} />
                </div>
                <div className="vertical_menu">
                  <ul>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <li key={index}>
                        <Skeleton height={80} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="sing-pro-ctnArea">
                  <Skeleton height={30} width={300} />
                  <Skeleton height={20} width={150} />
                  <Skeleton height={60} count={3} />
                  <Skeleton height={30} width={100} />
                </div>
              </div>
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

  if (!product) {
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
          <div className="row">
            <div className="col-lg-4">
              <div className="imageholder s-pro-pic-box">
                <img id="imageHolder" src={currentImage || "/images/bs-pro1.jpg"} className="img-fluid" alt="Product" />
              </div>
              <div className="vertical_menu">
                <ul>
                  {product?.images.map((image, index) => (
                    <li key={index}>
                      <a href="#" onClick={(e) => { e.preventDefault(); changeImg(image.image_path); }}>
                        <img src={image.image_path} className="img-fluid" alt={`Product thumbnail ${image.alt_text}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="sing-pro-ctnArea">
                <h2>{product?.name || "Product Name"}</h2>
                <p className="mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`fa fa-star ${i < product?.rating ? "checked" : ""}`} />
                  ))}
                </p>
                <p className="pro_desc">{product?.description || "Product description goes here."}</p>
                <p className="pro-pg-price mb-4">₹ {product?.price || "0.00"}</p>
                <button  className="rm-btn"  onClick={handleShowModal}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && <InquiryModal
         productName={product.name}
        show={showModal}
        onClose={handleCloseModal}
      />}
      {/* <InquiryModal/> */}
      
    </>
  );
};

export default ProductPage;
