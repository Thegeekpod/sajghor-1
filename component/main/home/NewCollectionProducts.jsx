"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles for skeleton loader

const NewCollectionProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for tracking data fetching

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/frontend/product/random');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts();
  }, []);

  // Slick Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return (
      <section id="new-collection-section">
        <div className="container">
          <div className="row justify-content-center mb-3">
            <div className="col-lg-12">
              <h1>New Collection</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Slider {...settings}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="item">
                  <div className="product-box text-center">
                    <div className="product-box-img hover01">
                      <div>
                        <Skeleton height={350} width={240} />
                      </div>
                      <div className="mt-2 ">
                      <Skeleton height={20} width={240} />
                      <Skeleton height={20} width={240} />
                      <Skeleton height={30} width={240} />
                    </div>
                    </div>
                   
                  </div>
                </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="new-collection-section">
      <div className="container">
        <div className="row justify-content-center mb-3">
          <div className="col-lg-12">
            <h1>New Collection</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="item">
                  <div className="product-box text-center">
                    <div className="product-box-img hover01">
                      <div>
                        <figure>
                          <img
                            src={product.image}
                            className="mr-3"
                            alt={product.name}
                          />
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
                      <p className="pro-price">₹ {product.price}</p>
                      <Link href={`/${product.category.slug}/${product.slug}`} className="cart-btn">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <style jsx>
        {`.product-box {
  padding: 10px;
}

.product-box-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
}

.product-box-img img {
  width: 100%;
  height: 350px;
  object-fit: cover; /* Ensures the image covers the container without distortion */
  display: block;
}

.slick-slide {
  padding: 0 5px; /* Half of the gap on each side to make a 10px total gap */
}

.slick-list {
  margin: 0 -5px; /* Negate the padding on the left and right edges */
}

.slick-track {
  display: flex;
`}
      </style>
    </section>
  );
};

export default NewCollectionProducts;
